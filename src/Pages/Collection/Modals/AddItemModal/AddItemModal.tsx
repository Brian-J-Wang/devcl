import { Container } from "../../../../Components/Container/Container"
import Input from "../../../../Components/Input"
import DropDown from "../../../../Components/Input/DropDown/DropDown"

import "./AddItemModal.css"
import { CLCategories } from "../../interfaces"
import Button from "../../../../Components/Input/Button/Button"
import Radio from "../../../../Components/Input/Radio/Radio"

interface AddItemModalProps {
    categories: CLCategories[]
}

const AddItemModal: React.FC<AddItemModalProps> = (props) => {

    return (
        <Container title="Add New Item" className="add-item">
            <Input.Text type="text" name="blurb" initialValue=""/>
            <div className="add-item__content">
                <Radio onChange={() => {}} name="importance" className="add-item__importance" selectedStyle="add-item__radio_selected">
                    <Radio.Option name="high" className="add-item__radio">
                        !!!
                    </Radio.Option>
                    <Radio.Option name="med" className="add-item__radio">
                        !!
                    </Radio.Option>
                    <Radio.Option name="low" className="add-item__radio">
                        !
                    </Radio.Option>
                </Radio>
                <DropDown title="Category" placeholder="Select a category..." className="add-item__drop-down" >
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
            </div>
            <Button>Submit</Button>
        </Container>
    )
}

export default AddItemModal

