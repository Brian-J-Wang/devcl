import { useContext, useState } from "react";
import { Container } from "../../../../Components/Container/Container"
import Input from "../../../../Components/Input";

import { ModalContext } from "../../../../Contexts/Modal/ModalContext";

import "./AddCollaboratorModal.css"

interface AddCollaborator {
    onSubmit: (alias: string, email: string) => Promise<any>
}

const AddCollaboratorModal: React.FC<AddCollaborator> = (props) => {
    const [ email, setEmail ] = useState<string>("");
    const [ alias, setAlias ] = useState<string>(""); 
    const modalContext = useContext(ModalContext);

    const AddCollaborator = (email: string) => () => {
        props.onSubmit(alias, email).then(() => {
            modalContext.setModal(null);
        })
    }

    return (
        <Container className="create-category">
            <h2>Add Collaborator</h2>
            <div className="create-category__input">
                <Input.Text type="text" name="Alias" stateHandler={setAlias}/>
                <small>Collaborators will be referenced by their aliases. Aliases must be unique.</small>
            </div>
            <div className="create-category__input">
                <Input.Text type="text" name="Email" stateHandler={setEmail}/>
                <small>Add a collaborator by adding their emails. If they exist they will be able to edit your collection.</small>
            </div>
            <Input.Button style="primary" onClick={AddCollaborator(email)}>Add</Input.Button>
        </Container>
    )
}

export default AddCollaboratorModal;