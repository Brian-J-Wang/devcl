import { Container } from "../../../Components/Container/Container";

import "./CheckList.css"
import { CLItem } from "../../../Pages/Collection/interfaces";
import CLItemElement, { CLItemTag } from "../CLItem/CLItem";
import { useContext } from "react";
import { CollectionContext } from "../Collection";
import ItemEditorContext from "../ItemEditor/itemEditorContext";
import RichInput from "../../../Components/Input/RichInput/RichInput";
import CheckListInputAttribute from "./Components/CheckListInputAttribute";


const CheckList: React.FC<{}> = () => {
    const itemEditorContext = useContext(ItemEditorContext);
    const collectionContext = useContext(CollectionContext);

    const openEditor = (item: CLItem) => () => {
        itemEditorContext.setActiveItem(item);
    }

    const handleSubmit = () => {}

    return (
        <>
            <Container className="check-list">
                <div className="check-list__content">
                    {
                        collectionContext.items.map((item) => {
                            const tag = collectionContext.categories.find((category) => category._id == item.category);

                            return <CLItemElement 
                                key={item._id} 
                                clItem={item as CLItem} 
                                onClick={openEditor(item)} 
                                tags={ tag && (
                                    <CLItemTag>
                                        {tag?.format}
                                    </CLItemTag>
                                )}
                            />
                        })
                    }
                </div>
                <RichInput className="" placeholder="Type to add. Use '/' to add attributes" onSubmit={handleSubmit} 
                    style={{
                        defaultTagColor: "mistyrose",
                        onKeySelect: "check-list__rich-input-key_selected",
                        onPairSelect: "check-list__rich-input-key_selected",
                        inputBar: "check-list__rich-input-bar",
                        inputBarTag: "check-list__rich-input-bar-tag"
                    }}
                    attributeComponent={ <CheckListInputAttribute name={""} value={""} onDeleteClick={() => {}}/>}
                    >
                    <RichInput.Key name="category" element={ <CheckListKeyComponent name="Category" desc=""/>}
                    color={"wheat"}
                    >
                        {
                            collectionContext.categories.map((category) => {
                                return (
                                    <RichInput.Value value={category._id}>
                                        {category.format}
                                    </RichInput.Value>
                                )
                            })
                        }
                    </RichInput.Key>
                    <RichInput.Key name="importance" element={ <CheckListKeyComponent name="Importance" desc=""/>}
                    color={"red"}
                    >
                        <RichInput.Value value="something">
                            hi
                        </RichInput.Value>
                    </RichInput.Key>
                    <RichInput.Key name="assign" element={ <CheckListKeyComponent name="Assign" desc=""/>}
                    color={"orange"}
                    >
                        <RichInput.Value value="something">
                            hi
                        </RichInput.Value>
                    </RichInput.Key>
                </RichInput>
            </Container>
        </>
    );
}

interface CheckListKeyComponentProps {
    name: string,
    desc: string
}

const CheckListKeyComponent: React.FC<CheckListKeyComponentProps> = (props) => {
    return (
        <div>
            {props.name}
        </div>
    )
}

export default CheckList