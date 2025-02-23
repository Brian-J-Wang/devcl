import { Children, ReactElement, ReactNode, cloneElement, createContext, useEffect, useRef, useState } from "react";
import { Container } from "../../Container/Container";

import "./RichInput.css";
import { requireContext } from "../../../utils/helpers";
import { generateMongoID } from "../../../utils/dummyGenerators";

interface RichInputContextProps {
    addGroup: (name: string, id: string, children: ReactNode) => void,
    cursor: {
        parent: string,
        child: string,
    }
    hidden: string[]
}

const RichInputContext = createContext<RichInputContextProps>({
    addGroup: () => {},
    cursor: {
        parent: "",
        child: ""
    },
    hidden: []
});

interface RichInputProps {
    children: ReactElement<RichInputGroupProps> | Array<ReactElement<RichInputGroupProps>>,
    className?: string
    placeholder?: string,
}

function RichInput(props: RichInputProps) {
    const nodeTree = useRef<{
        name: string,
        id: string,
        children: ReactNode
    }[]>([]);
    const [ state, setState ] = useState<"none" | "group" | "item">("none");
    const [ cursor, setCursor ] = useState<{
        parent: string,
        child: string
    }>({
        parent: "",
        child: ""
    }); //cursor contains the id of the last visible item;
    const [hidden, setHidden] = useState<string[]>([]);

    const addGroup = (name: string, id: string, children: ReactNode) => {
        if (!nodeTree.current.find((item) => item.id == id)) {
            nodeTree.current.push({
                name, id, children
            });
        }
    }

    //handle events before the input is registered
    const onKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        const target = evt.target as HTMLInputElement;

        if (evt.key == "/" && (evt.target as HTMLInputElement).value.length == 0) {
            setState("group");
            return;
        }

        //handle the case where it is the parent being moved
        //handle the case where it is the child being moved
        if (evt.key == "ArrowUp") {
            evt.preventDefault();
            return;
        } 

        if (evt.key == "ArrowDown") {
            evt.preventDefault();
            return;
        }
    }

    //handle events after the input is registered
    const onKeyUp = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        const target = evt.target as HTMLInputElement;

        if (evt.key == "Backspace" && target.value.length == 0) {
            resetInput();
            return;
        }

        if (evt.key == "Enter") {

        }

        const test = target.value.slice(1, target.value.length).toLowerCase();
        setHidden(
            nodeTree.current.filter((node) => {
                return test != node.name.slice(0, test.length).toLowerCase();
            }).map((node) => node.id)
        );
    }

    useEffect(() => {
        if (state == "group") {
            if (hidden.includes(cursor.parent)) {
                const newCursor = nodeTree.current.filter((tree) => {
                    if (tree.id == cursor.parent) {
                        return false;
                    } else {
                        return (!hidden.includes(tree.id));
                    }
                })

                //There are no valid ids to point the index to
                if (newCursor.length == 1) {
                    return;
                }
                
                let oldCursorIndex = -1;
                
                newCursor.forEach((item, index) => {
                    if (item.id == cursor.parent) {
                        oldCursorIndex = index;
                    }
                });

                if (oldCursorIndex == -1) {
                    return;
                }

                if (oldCursorIndex == newCursor.length - 1) {
                    setCursor({
                        parent: newCursor[oldCursorIndex - 1].id,
                        child: ""
                    });
                    return;
                } else {
                    setCursor({
                        parent: newCursor[oldCursorIndex + 1].id,
                        child: ""
                    });
                    return;
                }
            }
        }
    }, [hidden]);

    useEffect(() => {
        if (state == "group") {
            console.log(nodeTree.current[0]);
            setCursor({
                parent: nodeTree.current[0].id,
                child: ""
            })
        }
    }, [state])

    const resetInput = () => {
        setState("none");
    }

    return (
        <RichInputContext.Provider value={{ addGroup, hidden, cursor }}>
            <div className={`rich-input ${props.className}`}>
                <Container className="rich-input__menu" hidden={state == "none"}>
                    { 
                        props.children
                    }
                </Container>
                <input className="rich-input__input" placeholder={props.placeholder} onKeyDown={onKeyDown} onKeyUp={onKeyUp}onBlur={resetInput}/>
            </div>
        </RichInputContext.Provider>
    )
}

interface RichInputGroupProps {
    name: string,
    children: ReactElement<RichInputItemProps> | Array<ReactElement<RichInputItemProps>>
    element: ReactElement<{className: string}>,
    selectedStyle?: string
}

function RichInputGroup(props: RichInputGroupProps) {
    const [ id ] = useState(generateMongoID());
    const richInputContext = requireContext(RichInputContext);

    useEffect(() => {
        richInputContext.addGroup(props.name, id, props.children);
    }, []);

    return (
        <div id={id} hidden={richInputContext.hidden.includes(id)}>
            {
                  cloneElement(props.element, { className: "hi"})
            }
        </div>
    )
}

interface RichInputItemProps {
    className?: string,
    children: ReactNode
}

function RichInputItem(props: RichInputItemProps) {
    return (
        <div className={props.className}>
            {props.children}
        </div>
    )
}

RichInput.Group = RichInputGroup;
RichInput.Item = RichInputItem;

export default RichInput;