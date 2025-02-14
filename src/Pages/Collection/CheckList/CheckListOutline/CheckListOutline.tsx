import { useContext, useMemo } from "react"
import Outline from "../../../../Components/Outline/Outline"
import SubSection from "../../../../Components/Outline/SubSection/SubSection"
import { CLCategories, CLItem, CLPatch, Collaborators } from "../../interfaces"

import "./CheckListOutline.css"
import Icon from "../../../../Components/Icon"
import { ModalContext } from "../../../../Contexts/Modal/ModalContext"
import EditCategoryModal from "../../Modals/EditCategoryModal/EditCategoryModal"
import Cross from "../../../../assets/cross.svg";
import ConfirmDeleteModal from "../../Modals/ConfirmDeleteModal/ConfirmDeleteModal"
import CreateCategoryModal from "../../Modals/CreateCategoryModal/CreateCategoryModal"
import AddCollaboratorModal from "../../Modals/AddCollaboratorModal/AddCollaboratorModal"

interface CheckListOutlineProps {
    createCategory: (name: string, format: string) => Promise<any>
    deleteCategory: (id: string) => Promise<any>;
    addCollaborator: (alias: string, email: string) => Promise<any>;
    items: CLItem[];
    categories: CLCategories[],
    patch: CLPatch[],
    collaborators: Collaborators[]
}

const CheckListOutline: React.FC<CheckListOutlineProps> = (props) => {
    const modalContext = useContext(ModalContext);
    const buildCategoryOutline = (): {
        _id: string,
        name: string,
        details: string
    }[]  => {
        return props.categories.map((category) => {
            let numItemsCompleted = 0;
            let totalItems = 0;

            props.items.forEach((item) => {
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
    }
    const categoryOutline = useMemo(buildCategoryOutline, [props.categories, props.items])

    const openCreateCategoryModal = () => {
        modalContext.setModal(
            <CreateCategoryModal onSubmit={(name, format) => {
                return props.createCategory(name, format);
            }}></CreateCategoryModal>
        )
    }

    const openEditCategoryModal = (id: string) => {
        return () => {
            const category = props.categories.find((category) => category._id == id);
    
            if (!category) {
                return;
            }
    
            modalContext.setModal(
                <EditCategoryModal category={category}/>
            )
        }
    }

    const openConfirmDeleteModal = (id: string) => {
        return () => {
            const category = props.categories.find((category) => category._id ==id);

            if (!category) {
                return
            }

            modalContext.setModal(
                <ConfirmDeleteModal onConfirm={() => {
                    return props.deleteCategory(id);
                }}/>
            )
        }
    }

    const openAddCollaboratorModal = () => {
        modalContext.setModal(
            <AddCollaboratorModal onSubmit={(alias, email) => {
                return props.addCollaborator(alias, email);
            }} />
        )
    }
    
    return (
        <Outline>
            <SubSection name="Collaborators" expanded={false} onPlusClick={openAddCollaboratorModal}>
                {
                    props.collaborators.length == 0
                    ? (
                        <p className="cl-outline__empty">Empty</p>
                    ) : (
                        <></>
                    )
                }
            </SubSection>
            {/* <SubSection name="Patches" expanded={false}>
                <></>
            </SubSection> */}
            <SubSection name={"Categories"} expanded={true} onPlusClick={openCreateCategoryModal}>
                {
                    categoryOutline.map((item) => (
                        <div key={item._id} className="cl-outline">
                            <div className="cl-outline__left">
                                <h4 className="cl-outline__name">{item.name}</h4>
                                <small className="cl-outline__detail">{item.details}</small>
                            </div>
                            <div className="cl-outline__controls">
                                <img src={Cross} alt="" className="cl-outline__delete" onClick={openConfirmDeleteModal(item._id)}/>
                                <Icon.Edit onClick={openEditCategoryModal(item._id)} className="cl-outline__edit"/>
                            </div>
                        </div>
                    ))
                }
            </SubSection>
        </Outline>
    )
}

export default CheckListOutline