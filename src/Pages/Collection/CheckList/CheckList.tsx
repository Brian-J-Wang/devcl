import { Container } from "../../../Components/Container/Container";

import "./CheckList.css"
import { CLItem } from "../../../Pages/Collection/interfaces";
import CLItemElement, { CLItemTag } from "../CLItem/CLItem";
import { useContext } from "react";
import { CollectionContext } from "../Collection";
import ItemEditorContext from "../ItemEditor/itemEditorContext";

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
                <div className="check-list__add-more">
                    <input type="text" className="check-list__input" placeholder="Add Item"/>
                </div>
            </Container>
        </>
    );
}

export default CheckList;