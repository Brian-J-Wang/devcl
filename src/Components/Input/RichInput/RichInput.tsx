import { createContext, ReactNode, SetStateAction, useState } from "react";
import { Attribute, AttributeNode } from "./interface";

interface RichInputContextProps {
    attributes: AttributeNode[],
    cursor: AttributeNode | null,
    input: string,
    setInput: React.Dispatch<SetStateAction<string>>,
    addAttribute: (content: Attribute) => void,
    removeAttribute: (name: string) => void,
    moveCursor: (direction: "prev" | "next") => void
}

export const RichInputContext = createContext<RichInputContextProps>({
    attributes: [],
    cursor: null,
    input: "",
    setInput: () => {},
    addAttribute: () => {},
    removeAttribute: () => {},
    moveCursor: () => {}
});

interface RichInputProps {
    className: string
    children: ReactNode
}

const RichInput: React.FC<RichInputProps> = (props) => {
    const [ attributes, setAttributes ] = useState<AttributeNode[]>([]);
    const [ cursor, setCursor ] = useState<AttributeNode | null>(null);
    const [ input, setInput ] = useState<string>("");

    const addAttribute = (content: Attribute) => {
        if (attributes.some((value) => value.attribute.name == content.name)) {
            throw new Error("Cannot add an attribute which already exists");
        }

        const attribute: AttributeNode = {
            prev: attributes[attributes.length - 1],
            next: null,
            hidden: false,
            attribute: content
        }


        setAttributes([ ...attributes, attribute ]);
    }

    //removes the attribute in question and rejoins it
    const removeAttribute = (name: string) => {
        const attribute = attributes.find((value) => value.attribute.name == name);

        if (!attribute) {
            throw new Error("Attribute name does not exist");
        }

        const prev = attribute.prev;
        const next = attribute.next;

        if (prev) {
            prev.next = next;
        }

        if (next) {
            next.prev = prev;
        }
    }

    //moves the cursor to the next valid attribute
    const moveCursor = (direction: "prev" | "next") => {
        if (!cursor) return;

        let newCursor = cursor;

        while (newCursor[direction] != null) {
            newCursor = newCursor[direction];

            if (newCursor.hidden != true) {
                setCursor(newCursor);
                break;
            }
        }
    }

    return (
        <RichInputContext.Provider value={{
            attributes, cursor, addAttribute, removeAttribute, moveCursor, input, setInput
        }}>
            <div className={props.className}>
                {props.children}
            </div>
        </RichInputContext.Provider>
    )
}

export default RichInput;