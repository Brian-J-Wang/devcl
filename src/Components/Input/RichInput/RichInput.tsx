import { Children, cloneElement, ReactElement, ReactNode, useEffect, useState, createContext, useRef, RefObject, CSSProperties } from "react";
import { Container } from "../../Container/Container";

import "./RichInput.css";
import { requireContext } from "../../../utils/helpers";
import ResizeableInput from "../ResizeableInput/ResizeableInput";
import { DoublyLinkedHeirarchicTree } from "../../../Pages/Collection/CheckList/DoublyLinkedHeirarchicTree";

export interface KeyProps {
    name: string,
    render: ReactElement<RichInputInternalKeyProps>,
    color: CSSProperties["color"],
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
        inputBar: string,
        inputBarTag: string
    }
    attributeComponent: ReactElement<AttributeComponentProps>
}

function RichInput(props: RichInputProps) {
    const [ keyValues, setKeyValues ] = useState<KeyProps[]>([]);
    const heirarchy = useRef<DoublyLinkedHeirarchicTree<KeyProps>>(new DoublyLinkedHeirarchicTree());
    const [ state, setState ] = useState<"none" | "key" | "value">("none");
    const [ cursor, setCursor ] = useState<{
        key: number,
        value: number
    }>({
        key: 0,
        value: 0
    });
    const [ attributes, setAttributes ] = useState<{
        name: string,
        value: string
    }[]>([]);
    const [ input, setInput ] = useState<string>("");
    const attributeSelector = useRef<HTMLInputElement>(null) as RefObject<HTMLInputElement>;
    const mainInput = useRef<HTMLInputElement>(null) as RefObject<HTMLInputElement>;

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
                setState("value");
            } else if (state == "value") {
                
            }
            return;
        }
    }

    useEffect(() => {
        //sets the state to 
        if (state == "none" && input.charAt(0) == "/") {
            setState("key");

            setInput(input.slice(1, input.length));
            attributeSelector.current?.focus();
            return;
        }
    }, [input]);

    useEffect(() => {
        setHidden([]);
    }, [state]);

    //attribute selector logic
    const [hidden, setHidden] = useState<number[]>([]);
    const [attributeValue, setAttributeValue] = useState<string>("");
    const handleAttributeSelectorInput = (evt: React.FormEvent<HTMLInputElement>) => {
        const value = (evt.target as HTMLInputElement).value
        setAttributeValue(value);

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

    const handleSpecialKeys = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        if (evt.key == "ArrowUp" || evt.key == "ArrowDown") {
            evt.preventDefault();
            const newCursor = moveCursor(evt.key, state);

            if (!newCursor) {
                return;
            }

            if (state == "key") {
                setAttributeValue(keyValues[newCursor.key].name);
            }
        }

        if (evt.key == "Backspace" ) {
            if (state == "key" && attributeValue == "") {
                setState("none");
                mainInput.current?.focus();
            } else if (state == "value" && attributeValue.charAt(attributeValue.length - 1) == ":") {
                setState("key");
            }   
        }

        // ":" is used to separate between the key and the value
        if (evt.key == ":") {
            if (attributeValue.includes(":")) {
                evt.preventDefault();
            } else {
                setState("value");
            }
        }

        if (evt.key == "Enter") {
            if (state == "key") {
                setState("value");
                setAttributeValue(`${keyValues[cursor.key].name}:`);
            } else if (state == "value") {
                setState("none");
                setAttributeValue("");
                mainInput.current?.focus();
                setAttributes([ ...attributes, {
                    name: keyValues[cursor.key].name,
                    value: keyValues[cursor.key].children[cursor.value].value
                }]);
            }
        }

        console.log("contains color", attributeValue.includes(":"));
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

    return (
        <div className={`rich-input ${props.className}`}>
            <RichInputContext.Provider value={{ addKeyValuePair }}>
                { props.children }
            </RichInputContext.Provider>
                
            <Container className="rich-input__menu" hidden={state == "none"}>
                {
                    state == "key" && keyValues.map((kvp, index) => {
                        if (hidden.includes(index) || attributes.some((attribute) => attribute.name == kvp.name)) {
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
                <div className={`rich-input__input ${props.style.inputBar}`}>
                    <ResizeableInput 
                        ref={attributeSelector} className={`${props.style.inputBarTag} rich-input__attribute-selector ${state == "none" && "rich-input__attribute-selector_hidden"} `}
                        style={{ backgroundColor: props.style.defaultTagColor }} onInputChange={handleAttributeSelectorInput}
                        onKeyDown={handleSpecialKeys} value={attributeValue}/>
                    <input className={`rich-input__input-element ${state != "none" && 'rich-input__input-element_hidden'}`} placeholder={state == "none" ? props.placeholder : ""} 
                        onKeyUp={handleKeyUp} value={input} onChange={handleChange}
                        ref={mainInput}/>
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
    color: CSSProperties["color"],
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
            color: props.color,
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