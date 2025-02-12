import { useContext, useMemo } from "react"
import Outline from "../../../../Components/Outline/Outline"
import SubSection from "../../../../Components/Outline/SubSection/SubSection"
import { CLCategories, CLItem, CLPatch } from "../../interfaces"

import "./CheckListOutline.css"
import Icon from "../../../../Components/Icon"
import { ModalContext } from "../../../../Contexts/Modal/ModalContext"
import EditCategoryModal from "../../Modals/EditCategoryModal/EditCategoryModal"

interface CheckListOutlineProps {
    items: CLItem[];
    categories: CLCategories[],
    patch: CLPatch[]
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

    const openEditCategoryModal = () => {
        modalContext.setModal(
            <EditCategoryModal/>
        )
    }
    
    return (
        <Outline>
            <SubSection name="Collaborators" expanded={false}>
                <></>
            </SubSection>
            <SubSection name="Patches" expanded={false}>
                <></>
            </SubSection>
            <SubSection name={"Categories"} expanded={true}>
                {
                    categoryOutline.map((item) => (
                        <div key={item._id} className="cl-outline">
                            <h4>{item.name}</h4>
                            <div className="cl-outline-right">
                                <Icon.Edit onClick={openEditCategoryModal}/>
                                <small>{item.details}</small>
                            </div>
                        </div>
                    ))
                }
            </SubSection>
        </Outline>
    )
}

export default CheckListOutline