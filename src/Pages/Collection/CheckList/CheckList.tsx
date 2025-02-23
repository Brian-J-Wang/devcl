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
                <RichInput className="check-list__add-item" placeholder="Type to add. Use '/' to add attributes">
                    <RichInput.Group name="category" element={
                        <CheckListGroupElement name={"Category"} description={"The type of task that this belongs to"}/>
                    }>  
                        {
                            collectionContext.categories.map((category) => {
                                return <RichInput.Item >{category.name}</RichInput.Item>
                            })
                        }
                        
                    </RichInput.Group>
                    <RichInput.Group name="importance" element={
                        <CheckListGroupElement name={"Importance"} description={"How much attention to give this task"}/>
                    }>
                        <RichInput.Item>Importance</RichInput.Item>
                    </RichInput.Group>
                    <RichInput.Group name="assign" element={
                        <CheckListGroupElement name={"Assign"} description={"Who is responsible for this task"}/>
                    }>
                        <RichInput.Item>Assign</RichInput.Item>
                    </RichInput.Group>
                </RichInput>
            </Container>
        </>
    );
}



const CheckListGroupElement: React.FC<{
    name: string,
    description: string,
    className?: string,
}> = (props) => {
    return (
        <div className="check-list__group-element">
            <span className="check-list__group-element-name">
                / {props.name}
            </span>
            <span className="check-list__group-element-desc">
                {props.description}
            </span>
        </div>
    )
}

export default CheckList;