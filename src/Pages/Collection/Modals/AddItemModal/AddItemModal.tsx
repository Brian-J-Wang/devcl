import { Container } from "../../../../Components/Container/Container"
import Input from "../../../../Components/Input"
import DropDown from "../../../../Components/Input/DropDown/DropDown"

import "./AddItemModal.css"
import { CLCategories } from "../../interfaces"

interface AddItemModalProps {
    categories: CLCategories[]
}

const AddItemModal: React.FC<AddItemModalProps> = (props) => {

    return (
        <Container title="Add New Item" className="add-item">
            <Input.Text type="text" name="blurb" initialValue=""/>
            <DropDown title="Category" placeholder="Select a category...">
                <DropDown.Option value="None">
                    None
                </DropDown.Option>
                {
                    props.categories.map((category) => {
                        return (
                            <DropDown.Option value={category.name}>
                                {category.name}
                            </DropDown.Option>
                        )
                    })
                }
            </DropDown>
        </Container>
    )
}

export default AddItemModal

