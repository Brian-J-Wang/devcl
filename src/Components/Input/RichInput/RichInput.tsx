import { Children, cloneElement, ReactElement, ReactNode, useEffect, useState, createContext, useContext } from "react";
import { Container } from "../../Container/Container";

import "./RichInput.css";
import { requireContext } from "../../../utils/helpers";

export interface KeyProps {
    name: string,
    render: ReactElement<RichInputInternalKeyProps>,
    children: PairProps[];
}

export interface PairProps {
    value: string,
    render: ReactElement
}

interface RichInputContextProps { 
    addKeyValuePair: (evt: KeyProps) => void
}

const RichInputContext = createContext<RichInputContextProps>({
    addKeyValuePair: () => {}
});

interface RichInputProps {
    className?: string
    placeholder?: string,
    children: ReactElement<RichInputKeyProps> | Array<ReactElement<RichInputKeyProps>>,
    onSubmit: (values: {
        input: string,
        attributes: {
            name: string,
            value: string,
        }[]
    }) => void,
    style: {
        onKeySelect: string,
        onPairSelect: string
    }
}

function RichInput(props: RichInputProps) {
    const [ keyValues, setKeyValues ] = useState<KeyProps[]>([]);
    const [ state, setState ] = useState<"none" | "key" | "value">("none");
    const [ cursor, setCursor ] = useState<{
        key: number,
        value: number
    }>({
        key: 0,
        value: 0
    });
    const [hidden, setHidden] = useState<number[]>([]);
    const [ attributes, setAttributes ] = useState<{
        name: string,
        value: string
    }[]>([]);
    const [ input, setInput ] = useState<string>("");

    const addKeyValuePair = (kvp: KeyProps) => {
        //key values are added only if there does not already exists a key for it.
        setKeyValues(prev => {
            if (prev.find((key) => key.name == kvp.name)) {
                return [ ...prev];
            } else {
                return [ ...prev, kvp];
            }
        });
    }

    
    const moveCursor = (direction: 'ArrowUp' | 'ArrowDown', state: 'key' | 'value' | 'none') => {
        if (state == "none") {
            return;
        }

        for (let i = getCursor(); satisfies(i); direction == "ArrowUp" ? i-- : i++) {
            if (!hidden.includes(i)) {
                
                setCursor({
                    key: state == "key" ? i : cursor.key,
                    value: state == "value" ? i : cursor.value
                });

                return;
            }
        }

        function getCursor() {
            if (state == "key") {
                return direction == "ArrowUp"
                    ? cursor.key - 1
                    : cursor.key + 1;
            } else {
                return direction == "ArrowUp"
                    ? cursor.value - 1
                    : cursor.value + 1;
            }
        }

        function satisfies(i: number) {
            if (state == "key") {
                return direction == "ArrowUp"
                    ? i >= 0
                    : i < keyValues.length
            } else {
                console.log("children length: ", keyValues[cursor.key].children?.length!);
                return direction == "ArrowUp"
                    ? i >= 0
                    : i < keyValues[cursor.key].children?.length!
            }
        }
    }
    
    const handleKeyDown = (evt: React.KeyboardEvent) => {
        if (evt.key == "ArrowUp" || evt.key == "ArrowDown") {
            evt.preventDefault();
            moveCursor(evt.key, state);
        }

        setInput((evt.target as HTMLInputElement).value);
    }


    const handleKeyUp = (evt: React.KeyboardEvent) => {
        const target = (evt.target as HTMLInputElement);
        if (evt.key == "Backspace" && target.value == "") {
            setState("none");
        }

        if (evt.key == "/") {
            setState("key");
        }

        if (target.value.charAt(0) == "/" && state == "key") {
            const test = target.value.slice(1, target.value.length);

            const newHidden: number[] = [];
            
            keyValues.forEach((kvp, index) => {
                if (kvp.name.slice(0, test.length) != test) {
                    newHidden.push(index);
                }
            })
            setHidden(newHidden);
        }

        if (evt.key == "Enter") {
            if (state == "key") {
                target.value = "/" + keyValues[cursor.key].name + ":"
                setState("value");
            } else if (state == "value") {
                target.value == "";
                setAttributes([ ...attributes, {
                    name: keyValues[cursor.key].name,
                    value: keyValues[cursor.key].children[cursor.value].value
                }]);
                setState("none");
            }
        }

        console.log(evt.key);
    }

    useEffect(() => {
        if (state == "key") {
            if (hidden.includes(cursor.key)) {
                for (let i = 0; i < keyValues.length; i++) {
                    if (!hidden.includes(i)) {
                        setCursor({
                            key: i,
                            value: 0
                        });

                        return;
                    }
                }
            }
        }
        
    }, [hidden]);

    useEffect(() => {
        setHidden([]);
    }, [state])

    return (
        <div className={`rich-input ${props.className}`}>
            <RichInputContext.Provider value={{ addKeyValuePair }}>
                { props.children }
            </RichInputContext.Provider>
                
            <Container className="rich-input__menu" hidden={state == "none"}>
                {
                    state == "key" && keyValues.map((kvp, index) => {
                        if (hidden.includes(index)) {
                            return <></>
                        } else {
                            const isSelected = index == cursor.key;

                            return cloneElement(kvp.render, { isSelected: isSelected, classStyle: {onSelect: props.style.onKeySelect}}, kvp.render.props.children);
                        }
                    })
                }
                {
                    state == "value" && keyValues.find((_, index) => index == cursor.key )?.children?.map((child, index) => {
                        const isSelected = index == cursor.value;

                        return cloneElement(child.render, { isSelected: isSelected, onSelectStyle: props.style.onPairSelect }, child.render.props.children);
                    })
                }
            </Container>
            <div className="rich-input__input-container">
                <span hidden={state == "none"}>{keyValues[cursor.key]?.name ?? ""}</span>
                <input className="rich-input__input" placeholder={props.placeholder} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} value={input}/>
            </div>
            
        </div>
    )
}

interface RichInputKeyProps {
    name: string
    children: ReactElement<RichInputValueProps> | Array<ReactElement<RichInputValueProps>>,
    element: ReactNode
}

const RichInputKey: React.FC<RichInputKeyProps> = (props) => {
    const richInputContext = requireContext(RichInputContext);

    useEffect(() => {
        console.log(props);
        
        const kvp: KeyProps = {
            name: props.name,
            render: <RichInputInternalKey isSelected={false}>
                        {props.element}
                    </RichInputInternalKey>,
            children: Children.map(props.children, (child) => {
                return {
                    value: child.props.value,
                    render: <RichInputInternalValue isSelected={false}>
                                {child}
                            </RichInputInternalValue>
                }
            })
        }

        richInputContext.addKeyValuePair(kvp);
    }, []);

    return (<></>)
}


interface RichInputInternalKeyProps {
    children: ReactNode,
    isSelected: boolean,
    classStyle?: {
        onSelect: string,
    }
}

const RichInputInternalKey: React.FC<RichInputInternalKeyProps> = (props) => {
    return (
        <div className={` ${props.isSelected && props.classStyle?.onSelect}`}>
            { props.children }
        </div>
    )
}

interface RichInputValueProps {
    children: ReactNode
    value: string,
}

interface RichInputInternalValueProps {
    children: ReactElement<RichInputValueProps>,
    isSelected: boolean,
    onSelectStyle?: string
}

const RichInputValue: React.FC<RichInputValueProps> = (props) => {
    return (
        <>
            {props.children}
        </>
    )
}

const RichInputInternalValue: React.FC<RichInputInternalValueProps> = (props) => {
    return (
        <div className={`${props.isSelected && props.onSelectStyle}`}>
            {props.children}
        </div>
    )
}

RichInput.Key = RichInputKey;
RichInput.Value = RichInputValue;

export default RichInput;