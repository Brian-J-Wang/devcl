import TaskDocCard from "./CollectionCard/CollectionCard";

import add from "../../assets/add.svg";

import "./UserCollections.css";
import { useContext } from "react";
import { ModalContext } from "../../Contexts/Modal/ModalContext";
import NewCollectionModal from "./NewCollectionModal/NewCollectionModal";
import { UserContext } from "../../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";
import { Container } from "../../Components/Container/Container";
import UserProfileCard from "./UserProfileCard/UserProfileCard";
import userProjectContext from "@context/userProjectContext";

const UserCollection: React.FC = () => {
	const modalContextConsumer = useContext(ModalContext);
	const userContext = useContext(UserContext);
	const navigate = useNavigate();
	const { taskDocs, isLoading, ...api } = useContext(userProjectContext);

	const handleCardAdd = () => {
		modalContextConsumer.setModal(
			<NewCollectionModal
				onSubmit={() => {
					api.addTaskDoc();
				}}
			/>
		);
	};

	const handleUserLogOut = () => {
		userContext.logUserOut().then(() => {
			navigate("../");
		});
	};

	const deleteTaskDoc = () => {
		api.deleteTaskDoc();
	};

	return (
		<div className="user-collection">
			<BreadCrumb />
			<div className="user-collection__dashboard">
				<UserProfileCard taskDocCount={0} onLogOutClick={handleUserLogOut} />
				<Container className="user-collection__side-info"></Container>
			</div>
			<div className="user-collection__header">
				<h2 className="user-collection__header-title">Collections</h2>
				<button className="user-collection__add-collection" onClick={handleCardAdd}>
					<img src={add} alt="+" className="user-collection__add-image" />
				</button>
			</div>
			<div className="user-collection__collection-list">
				{isLoading ? (
					<></>
				) : (
					taskDocs.map((doc) => {
						return <TaskDocCard key={doc.id} taskDoc={doc} handleDelete={deleteTaskDoc} />;
					})
				)}
			</div>
		</div>
	);
};

export default UserCollection;
