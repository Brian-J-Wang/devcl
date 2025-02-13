import { useContext, useState } from "react";
import { TextButton } from "../../../../Components/Button/Button";
import { Container } from "../../../../Components/Container/Container"
import Input from "../../../../Components/Input";

import "./CreateCategoryModal.css"
import { ModalContext } from "../../../../Contexts/Modal/ModalContext";

interface CreateCategoryModalProps {
    onSubmit: (name: string, format: string) => Promise<any>
}

const CreateCategoryModal: React.FC<CreateCategoryModalProps> = (props) => {
    const [ name, setName ] = useState<string>("");
    const [ format, setFormat ] = useState<string>("");
    const modalContext = useContext(ModalContext);

    const AddCategory = (name: string, format: string) => () => {
        props.onSubmit(name, format).then(() => {
            modalContext.setModal(null);
        })
    }

    return (
        <Container className="create-category">
            <h2>Create Category</h2>
            <Input.Text type="text" name={"Name"} stateHandler={setName}/>
            <div>
                <Input.Text type="text" name={"Format"} stateHandler={setFormat}/>
                <small>Format is used when generating commit messages</small>
                <br/>
                <small className="edit-category__format-small">{format}: Did this unit of work</small>
                <br/>
                <small className="edit-category__format-small">{format}: Did that unit of work</small>
            </div>
            <TextButton size="m" radiusStyle="m" style="primary" onClick={AddCategory(name, format)}>Create</TextButton>
        </Container>
    )
}

export default CreateCategoryModal;