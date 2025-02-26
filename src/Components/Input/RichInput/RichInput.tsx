import { Children, cloneElement, ReactElement, ReactNode, useEffect, useState, createContext, useContext } from "react";
import { Container } from "../../Container/Container";

import "./RichInput.css";
import { requireContext } from "../../../utils/helpers";

export interface KeyProps {
    name: string,
    render: ReactElement<RichInputInternalKeyProps>,
    children?: PairProps[];
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
    const [ state, setState ] = useState<"none" | "key" | "pair">("none");
    const [ keyValuePair, setKeyValuePair ] = useState<{
        key: number,
        pair: number
    }>({
        key: 0,
        pair: 0
    });
    const [hidden, setHidden] = useState<number[]>([]);

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

    const handleKeyDown = (evt: React.KeyboardEvent) => {
        if (state == "key") {
            if (evt.key == "ArrowUp") {
                evt.preventDefault();

                for (let i = keyValuePair.key - 1; i >= 0; i--) {
                    if (!hidden.includes(i)) {
                        setKeyValuePair({
                            key: i,
                            pair: 0
                        })
                    
                        return;
                    }
                }
            }
    
            if (evt.key == "ArrowDown") {
                evt.preventDefault();

                for (let i = keyValuePair.key + 1; i < keyValues.length; i++) {
                    if (!hidden.includes(i)) {
                        setKeyValuePair({
                            key: i,
                            pair: 0
                        })

                        return;
                    }
                }
            }
        }
        
    }

    const handleKeyUp = (evt: React.KeyboardEvent) => {
        const target = (evt.target as HTMLInputElement);
        if (evt.key == "Backspace" && target.value == "") {
            setState("none");
        }

        if (evt.key == "/" && target.value.length == 1) {
            setState("key");
        }

        if (target.value.charAt(0) == "/") {
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
                target.value = "/" + keyValues[keyValuePair.key].name + ":"
                setState("pair");
            }
        }

        console.log(evt.key);
    }

    useEffect(() => {
        if (state == "key") {
            if (hidden.includes(keyValuePair.key)) {
                for (let i = 0; i < keyValues.length; i++) {
                    if (!hidden.includes(i)) {
                        setKeyValuePair({
                            key: i,
                            pair: 0
                        });

                        return;
                    }
                }
            }
        }
        
    }, [hidden]);

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
                            const isSelected = index == keyValuePair.key;

                            return cloneElement(kvp.render, { isSelected: isSelected, classStyle: {onSelect: props.style.onKeySelect}}, kvp.render.props.children);
                        }
                    })
                }
                {
                    state == "pair" && keyValues.find((_, index) => index == keyValuePair.key )?.children?.map((child) => {
                        return child.render;
                    })
                }
            </Container>
            <input className="rich-input__input" placeholder={props.placeholder} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}/>
        </div>
    )
}

interface RichInputKeyProps {
    name: string
    children: ReactElement<RichInputValueProps>,
    element: ReactNode,

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
                    render: child
                }
            })
        }

        console.log(kvp);

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

interface RichInputInternalPairProps {
    children: ReactElement<RichInputValueProps>,
    isSelected: boolean,
    onSelectStyle: string
}

const RichInputValue: React.FC<RichInputValueProps> = (props) => {
    return (
        <>
            {props.children}
        </>
    )
}

const RichInputInternalPair: React.FC<RichInputInternalPairProps> = (props) => {
    return (
        <div className={`${props.isSelected && props.onSelectStyle}`}>
            {props.children}
        </div>
    )
}

RichInput.Key = RichInputKey;
RichInput.Value = RichInputValue;

export default RichInput;