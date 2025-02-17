import { useContext, useMemo } from "react"
import Outline from "../../../../Components/Outline/Outline"
import SubSection from "../../../../Components/Outline/SubSection/SubSection"

import "./CheckListOutline.css"
import Icon from "../../../../Components/Icon"
import { ModalContext } from "../../../../Contexts/Modal/ModalContext"
import EditCategoryModal from "../../Modals/EditCategoryModal/EditCategoryModal"
import Cross from "../../../../assets/cross.svg";
import ConfirmDeleteModal from "../../Modals/ConfirmDeleteModal/ConfirmDeleteModal"
import CreateCategoryModal from "../../Modals/CreateCategoryModal/CreateCategoryModal"
import AddCollaboratorModal from "../../Modals/AddCollaboratorModal/AddCollaboratorModal"
import { CategoryApiContext, CollaboratorApiContext, CollectionContext } from "../../Collection"
import CreateNewPatchModal from "../../Modals/CreateNewPatchModal/CreateNewPatchModal"

const CheckListOutline: React.FC<{}> = () => {
    const modalContext = useContext(ModalContext);
    const collectionContext = useContext(CollectionContext);
    const categoryApi = useContext(CategoryApiContext);
    const collaboratorApi = useContext(CollaboratorApiContext);

    const categoryOutline = useMemo(() => {
        return collectionContext.categories.map((category) => {
            let numItemsCompleted = 0;
            let totalItems = 0;

            collectionContext.items.forEach((item) => {
                if (item.category == category._id) {
                    numItemsCompleted += item.checked ? 1 : 0;
                    totalItems++;
                }
            })
            return {
                _id: category._id,
                name: category.name,
                details: `${numItemsCompleted}/${totalItems}`
            }
        })
    }, [collectionContext.categories, collectionContext.items])

    const openCreateCategoryModal = () => {
        modalContext.setModal(
            <CreateCategoryModal onSubmit={(name, format) => {
                return categoryApi.addCategory(name, format);
            }}></CreateCategoryModal>
        )
    }

    const openEditCategoryModal = (id: string) => {
        return () => {
            const category = collectionContext.categories.find((category) => category._id == id);
    
            if (!category) {
                return;
            }
    
            modalContext.setModal(
                <EditCategoryModal category={category} onSubmit={function (): Promise<any> {
                    throw new Error("Function not implemented.")
                } }/>
            )
        }
    }

    const openConfirmDeleteModal = (id: string) => {
        return () => {
            const category = collectionContext.categories.find((category) => category._id ==id);

            if (!category) {
                return
            }

            modalContext.setModal(
                <ConfirmDeleteModal onConfirm={() => {
                    return categoryApi.deleteCategory(id);
                }}/>
            )
        }
    }

    const openAddCollaboratorModal = () => {
        modalContext.setModal(
            <AddCollaboratorModal onSubmit={(alias, email) => {
                return collaboratorApi.addCollaborator(alias, email);
            }} />
        )
    }

    const openNewPatchModal = () => {
        modalContext.setModal(
            <CreateNewPatchModal version={collectionContext.version}/>
        )
    }

    const removeCollaborator = (alias: string) => () => {
        collaboratorApi.removeCollaborator(alias);
    }
    
    return (
        <Outline>
            <SubSection name="Collaborators" expanded={false} onPlusClick={openAddCollaboratorModal}>
                {
                    collectionContext.collaborators.length == 0
                    ? (
                        <p className="cl-outline__empty">Empty</p>
                    ) : (
                        collectionContext.collaborators.map((collaborator) => (
                            <div key={(collaborator.email)} className="cl-outline">
                                <div className="cl-outline__left">
                                    {collaborator.alias}
                                </div>
                                <div className="cl-outline__controls">
                                    <img src={Cross} alt="" className="cl-outline__delete" onClick={removeCollaborator(collaborator.alias)}/>   
                                </div>
                            </div>
                        ))
                    )
                }
            </SubSection>
            <SubSection name="Patches" expanded={false} onPlusClick={openNewPatchModal}>
                {
                    collectionContext.patches.reverse().map((patch) => (
                        <div>
                            {patch.version}
                        </div>
                    ))
                }
            </SubSection>
            <SubSection name={"Categories"} expanded={true} onPlusClick={openCreateCategoryModal}>
                {
                    categoryOutline.map((item) => (
                        <div key={item._id} className="cl-outline">
                            <div className="cl-outline__left">
                                <h4 className="cl-outline__name">{item.name}</h4>
                                <small className="cl-outline__detail">{item.details}</small>
                            </div>
                            <div className="cl-outline__controls">
                                <Icon.Edit onClick={openEditCategoryModal(item._id)} className="cl-outline__edit"/>
                                <img src={Cross} alt="" className="cl-outline__delete" onClick={openConfirmDeleteModal(item._id)}/>
                            </div>
                        </div>
                    ))
                }
            </SubSection>
        </Outline>
    )
}

export default CheckListOutline