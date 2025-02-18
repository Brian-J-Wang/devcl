import { Container } from "../../../Components/Container/Container";
import Category from "../CLCategory/Category";

import "./CheckList.css"
import { CLItem } from "../../../Pages/Collection/interfaces";
import CLItemElement from "../CLItem/CLItem";
import { useContext } from "react";
import { CategoryApiContext, CollectionContext } from "../Collection";
import Input from "../../../Components/Input";
import { ModalContext } from "../../../Contexts/Modal/ModalContext";
import CreateCategoryModal from "../Modals/CreateCategoryModal/CreateCategoryModal";

const CheckList: React.FC<{}> = () => {
    const collectionContext = useContext(CollectionContext);
    const categoryApi = useContext(CategoryApiContext);
    const modalContext = useContext(ModalContext);

    const openAddCategoryModal = () => {
        modalContext.setModal(<CreateCategoryModal onSubmit={(name, format) => {
            return categoryApi.addCategory(name, format);
        }}/>)
    }

    return (
        <>
            <Container className="check-list__toolbar">
                <Input.Button onClick={openAddCategoryModal}>Add Category</Input.Button>
            </Container>
            <Container className="check-list">       
                {
                    collectionContext.categories.map((category) => {
                        return (
                            <Category key={category._id} name={category.name} id={category._id}> 
                                {
                                    collectionContext.items.filter((item) => {
                                        return item.category == category._id
                                    }).map((item) => {
                                        return <CLItemElement clItem={item as CLItem} key={item._id}></CLItemElement>
                                    })
                                }
                            </Category>
                        )
                    })
                }
                <div className='check-list__footer'>Version {collectionContext.version}</div>
            </Container>
        </>
    );
}

export default CheckList;