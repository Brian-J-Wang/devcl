import { Container } from "../../../../Components/Container/Container"
import Input from "../../../../Components/Input";

import "./EditCategoryModal.css"

interface EditCategoryModalProps {
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = (props) => {
    return (
        <Container className="edit-category">
            <h2>Edit Category</h2>
            <Input.Text type="text" name={"Name"}/>
            <Input.Text type="text" name={"Format"}/>
            
        </Container>
    )
}

export default EditCategoryModal;
