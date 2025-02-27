import { Children, cloneElement, ReactElement, ReactNode, useEffect, useState, createContext, useRef, RefObject, CSSProperties } from "react";
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

export interface RichInputContextProps { 
    addKeyValuePair: (evt: KeyProps) => void
}

export interface AttributeComponentProps {
    name: string,
    value: string,
    onDeleteClick: (name: string) => void
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
        defaultTagColor: CSSProperties["color"],
        onKeySelect: string,
        onPairSelect: string
    }
    attributeComponent: ReactElement<AttributeComponentProps>
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
    const [ validInput, setValidInput ] = useState<boolean>(true);
    const dummyTag = useRef<HTMLSpanElement>() as RefObject<HTMLSpanElement>;

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

                const newCursor = {
                    key: state == "key" ? i : cursor.key,
                    value: state == "value" ? i : cursor.value
                }
                
                setCursor(newCursor);

                return newCursor;
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
        const target = (evt.target as HTMLInputElement);

        if (evt.key == "ArrowUp" || evt.key == "ArrowDown") {
            evt.preventDefault();
            const newCursor = moveCursor(evt.key, state);

            if (!newCursor) {
                return;
            }

            if (state == "key") {
                setInput(keyValues[newCursor.key].name);
            }
        }

        if (evt.key == "Backspace") {
            if (target.value == "" && state != "none") {
                setState("none");
            }
        }
    }

    const handleChange = (evt: any) => {
        const value = (evt.target as HTMLInputElement).value;
        setInput(value);

        if (state == "key") {
            const nonMatching: number[] = [];

            keyValues.forEach((key, index) => {
                if (key.name.slice(0, value.length) != value) {
                    nonMatching.push(index);
                }
            })

            setHidden(nonMatching);
        }
    }

    const handleKeyUp = (evt: React.KeyboardEvent) => {
        
        if (evt.key == "Enter") {
            if (state == "key") {
                setInput(keyValues[cursor.key].name);
                setState("value");
            } else if (state == "value") {
                setInput("");
                setAttributes([ ...attributes, {
                    name: keyValues[cursor.key].name,
                    value: keyValues[cursor.key].children[cursor.value].value
                }]);
            }
            return;
        }

    }

    useEffect(() => {
        //sets the state to 
        if (state == "none" && input.charAt(0) == "/") {
            setState("key");
            setInput(input.slice(1, input.length));
            return;
        }
    }, [input]);

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
                <div className="rich-input__input">
                    <span hidden={state == "none"} className="rich-input__dummy-tag" contentEditable ref={dummyTag} style={{backgroundColor: props.style.defaultTagColor}}>{input}</span>
                    <input className={`rich-input__input-element ${state != "none" && 'rich-input__input-element_hidden'}`} placeholder={state == "none" ? props.placeholder : ""} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} value={input} onChange={handleChange}/>
                </div>
                <div className="rich-input__attributes">
                    {
                        attributes.map((attribute) => {
                            return cloneElement(props.attributeComponent, { name: attribute.name, value: attribute.value });
                        })
                    }
                </div>
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
                                { child }
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

//internal components contains props that isn't used by the user. Wraps the RichInputValue which is a user facing component
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