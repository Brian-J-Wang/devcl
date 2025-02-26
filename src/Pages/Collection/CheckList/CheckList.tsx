import { Container } from "../../../Components/Container/Container";

import "./CheckList.css"
import { CLItem } from "../../../Pages/Collection/interfaces";
import CLItemElement, { CLItemTag } from "../CLItem/CLItem";
import { useContext } from "react";
import { CollectionContext } from "../Collection";
import ItemEditorContext from "../ItemEditor/itemEditorContext";
import RichInput from "../../../Components/Input/RichInput/RichInput";

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
                <RichInput className="check-list__add-item" placeholder="Type to add. Use '/' to add attributes" onSubmit={handleSubmit}>
                    <RichInput.Key name="category" element={ <CheckListKeyComponent name="Category" desc=""/>} style={{base: "check-list__rich-input-key", onSelect: "check-list__rich-input-key_selected"}}>
                        <RichInput.Value value="something">
                            Hi
                        </RichInput.Value>
                        <RichInput.Value value="else">
                            Sigh
                        </RichInput.Value>
                        <RichInput.Value value="poggers">
                            My
                        </RichInput.Value>
                    </RichInput.Key>
                    <RichInput.Key name="importance" element={ <CheckListKeyComponent name="Importance" desc=""/>} style={{base: "check-list__rich-input-key", onSelect: "check-list__rich-input-key_selected"}}>
                        <RichInput.Value value="something">
                            hi
                        </RichInput.Value>
                    </RichInput.Key>
                    <RichInput.Key name="assign" element={ <CheckListKeyComponent name="Assign" desc=""/>} style={{base: "check-list__rich-input-key", onSelect: "check-list__rich-input-key_selected"}}>
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