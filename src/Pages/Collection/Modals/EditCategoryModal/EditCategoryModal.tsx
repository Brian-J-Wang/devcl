import { useState } from "react";
import { Container } from "../../../../Components/Container/Container"
import Input from "../../../../Components/Input";
import { CLCategories } from "../../interfaces";

import "./EditCategoryModal.css"
import { TextButton } from "../../../../Components/Button/Button";

interface EditCategoryModalProps {
    category: CLCategories,
    onSubmit: () => Promise<any>
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = (props) => {
    const[name, setName] = useState<string>(props.category.name);
    const[format, setFormat] = useState<string>(props.category.format);
    return (
        <Container className="edit-category">
            <h2>Edit Category</h2>
            <Input.Text type="text" name={"Name"} initialValue={name} stateHandler={setName}/>
            <div>
                <Input.Text type="text" name={"Format"} initialValue={format} stateHandler={setFormat}/>
                <small>Format is used when generating commit messages</small>
                <br/>
                <small className="edit-category__format-small">{format}: Did this unit of work</small>
                <br/>
                <small className="edit-category__format-small">{format}: Did that unit of work</small>
            </div>
            <TextButton size="s" radiusStyle="s" style="primary">Update</TextButton>
        </Container>
    )
}

export default EditCategoryModal;
