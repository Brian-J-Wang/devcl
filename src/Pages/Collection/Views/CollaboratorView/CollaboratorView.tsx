import { useContext } from "react";
import { Container } from "../../../../Components/Container/Container";
import Input from "../../../../Components/Input";

import "./CollaboratorView.css";
import { ModalContext } from "../../../../Contexts/Modal/ModalContext";
import AddCollaboratorModal from "../../Modals/AddCollaboratorModal/AddCollaboratorModal";

const CollaboratorView: React.FC = () => {
	const modalContext = useContext(ModalContext);
	return (
		<Container className="collab-view">
			<div className="collab-view__header">
				<Input.Button
					className="collab-view__button"
					onClick={() => {
						modalContext.setModal(<AddCollaboratorModal onSubmit={() => Promise.resolve()}></AddCollaboratorModal>);
					}}>
					+ Collaborator
				</Input.Button>
			</div>
		</Container>
	);
};

export default CollaboratorView;
