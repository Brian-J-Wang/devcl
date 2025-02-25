import { ReactElement, ReactNode, createContext, useEffect, useRef, useState } from "react";
import { Container } from "../../Container/Container";

import "./RichInput.css";
import { requireContext } from "../../../utils/helpers";
import { generateMongoID } from "../../../utils/dummyGenerators";

interface RichInputContextProps {
    addGroup: (name: string, id: string, children: ReactNode) => void,
    toggleCursor: (type: "parent" | "child", id: string) => void,
    cursor: {
        parent: string,
        child: string,
    }
    hidden: string[],
    
}

const RichInputContext = createContext<RichInputContextProps>({
    addGroup: () => {},
    toggleCursor: () => {},
    cursor: {
        parent: "",
        child: ""
    },
    hidden: [],
});

interface RichInputProps {
    children: ReactElement<RichInputGroupProps> | Array<ReactElement<RichInputGroupProps>>,
    className?: string
    placeholder?: string,
    onSubmit: (values: {
        input: string,
        attributes: {
            name: string,
            value: string,
        }[]
    }) => void
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
    const [ display, setDisplay ] = useState<string>();

    useEffect(() => {

    }, [cursor, hidden]);

    const addGroup = (name: string, id: string, children: ReactNode) => {
        if (!nodeTree.current.find((item) => item.id == id)) {
            nodeTree.current.push({
                name, id, children
            });
        }
    }

    //handle events before the input is registered
    const onKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        if (evt.key == "/" && (evt.target as HTMLInputElement).value.length == 0) {
            setState("group");
            console.log(nodeTree.current[0].id);
            setCursor({
                parent: nodeTree.current[0].id,
                child: ""
            });
            return;
        }

        //handle the case where it is the parent being moved
        //handle the case where it is the child being moved
        if (evt.key == "ArrowUp") {
            evt.preventDefault();
            //find index of current cursor
            const cursorIndex = nodeTree.current.findIndex((item) => item.id == cursor.parent);
            //move up, skip if index id included with hidden
            for (let i = cursorIndex; i >= 0; i--) {
                if (i == cursorIndex) {
                    continue;
                }

                if (hidden.includes(nodeTree.current[i].id)) {
                    continue;
                }

                setCursor({
                    parent: nodeTree.current[i].id,
                    child: ""
                });
                
                return;
            }
        } 

        if (evt.key == "ArrowDown") {
            evt.preventDefault();

            const cursorIndex = nodeTree.current.findIndex((item) => item.id == cursor.parent);
            //move up, skip if index id included with hidden
            for (let i = cursorIndex; i < nodeTree.current.length; i++) {
                if (i == cursorIndex) {
                    continue;
                }

                if (hidden.includes(nodeTree.current[i].id)) {
                    continue;
                }

                setCursor({
                    parent: nodeTree.current[i].id,
                    child: ""
                });
                
                return;
            }
        }
    }

    //handle events after the input is registered, recommended to 
    const onKeyUp = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        const target = evt.target as HTMLInputElement;

        if (evt.key == "Backspace" && target.value.length == 0) {
            resetInput();
            return;
        }

        if (evt.key == "Enter") {
            if (state == "group") {
                setState("item");
            } else if (state == "item") {
                setState("group");
            } else if (state == "none") {   //input  is submitted 
                props.onSubmit({
                    input: target.value,
                    attributes: []
                })
            }
        }

        const test = target.value.slice(1, target.value.length).toLowerCase();
        setHidden(
            nodeTree.current.filter((node) => {
                return test != node.name.slice(0, test.length).toLowerCase();
            }).map((node) => node.id)
        );
    }

    const toggleCursor = (type: "parent" | "child", id: string) => {
        if (type == "parent") {
            setCursor({
                parent: id,
                child: cursor.child
            });
        } else {
            setCursor({
                parent: cursor.parent,
                child: id
            });
        }
    }

    //moves the cursor the hidden
    useEffect(() => {
        if (state == "group") {
            //moves the cursor to the next valid item
            console.log(hidden.includes(cursor.parent));
            if (hidden.includes(cursor.parent)) {
                const newCursor = nodeTree.current.filter((tree) => {
                    if (tree.id == cursor.parent) {
                        return true;
                    } else {
                        return (!hidden.includes(tree.id));
                    }
                })

                //There are no valid ids to point the index to
                if (newCursor.length == 1) {
                    console.log("no valid ids to point to");
                    return;
                }

                const oldIndex = newCursor.findIndex((item) => {
                    return item.id == cursor.parent;
                })

                if (oldIndex == -1) {
                    return;
                }

                if (oldIndex == newCursor.length - 1) {
                    setCursor({
                        parent: newCursor[oldIndex - 1].id,
                        child: ""
                    });
                    return;
                } else {
                    setCursor({
                        parent: newCursor[oldIndex + 1].id,
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
        setCursor({
            parent: "",
            child: ""
        })
    }

    return (
        <RichInputContext.Provider value={{ addGroup, hidden, cursor, toggleCursor }}>
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
    element: ReactNode,
    selectedStyle?: string
}

function RichInputGroup(props: RichInputGroupProps) {
    const [ id ] = useState(generateMongoID());
    const richInputContext = requireContext(RichInputContext);
    const [ hidden, setHidden ] = useState<boolean>(false);

    useEffect(() => {
        richInputContext.addGroup(props.name, id, props.children);
    }, []);

    useEffect(() => {
        if (id == richInputContext.cursor.parent) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    }, [richInputContext.cursor])

    const toggleCursor = () => {
        richInputContext.toggleCursor("parent", id);
    }

    return (
        <div id={id} hidden={richInputContext.hidden.includes(id)} onMouseEnter={toggleCursor} className={`${hidden && "rich-input__group-selected"}`}>
            {
                props.element
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