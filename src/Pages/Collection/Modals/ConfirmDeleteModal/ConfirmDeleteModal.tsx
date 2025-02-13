import { useContext } from "react";
import { TextButton } from "../../../../Components/Button/Button";
import { Container } from "../../../../Components/Container/Container";

import "./ConfirmDeleteModal.css";
import { ModalContext } from "../../../../Contexts/Modal/ModalContext";

interface ConfirmDeleteModalProps {
    onConfirm: () => Promise<any>;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = (props) => {
    const modalContext = useContext(ModalContext); 
    
    const onConfirm = () => {
        props.onConfirm().then(() => {
            modalContext.setModal(null);
        })
    }

    return (
        <Container className="category-delete">
            <h2 className="">Delete Category</h2>
            <small>
                Deleting this category is permanent and irreversible due to my lack of skill in implementing
                a history controller. Are you sure you want to continue?
            </small>
            <TextButton size="s" radiusStyle="s" style="negative" onClick={onConfirm}>Confirm</TextButton>
        </Container>
    )
}

export default ConfirmDeleteModal;