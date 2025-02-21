import { Container } from "../../../Components/Container/Container";

import "./CheckList.css"
import { CLItem } from "../../../Pages/Collection/interfaces";
import CLItemElement, { CLItemTag } from "../CLItem/CLItem";
import { useContext } from "react";
import { CollectionContext } from "../Collection";
import Input from "../../../Components/Input";
import { ModalContext } from "../../../Contexts/Modal/ModalContext";
import ItemEditorContext from "../ItemEditor/itemEditorContext";
import AddItemModal from "../Modals/AddItemModal/AddItemModal";

const CheckList: React.FC<{}> = () => {
    const itemEditorContext = useContext(ItemEditorContext);
    const collectionContext = useContext(CollectionContext);
    const modalContext = useContext(ModalContext);


    const openAddItemModal = () => {
        modalContext.setModal(<AddItemModal categories={collectionContext.categories}></AddItemModal>)
    }

    const openEditor = (item: CLItem) => () => {
        itemEditorContext.setActiveItem(item);
    }

    return (
        <>
            <Container className="check-list__toolbar">
                <Input.Button onClick={openAddItemModal}>Add Item</Input.Button>
            </Container>
            <Container className="check-list">       
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
                <div className='check-list__footer'>Version {collectionContext.version}</div>
            </Container>
        </>
    );
}

export default CheckList;