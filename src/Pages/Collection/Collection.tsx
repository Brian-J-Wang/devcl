import CheckList from "./CheckList/CheckList";
import { useContext, useEffect } from "react";
import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";

import "./Collection.css";
import SideBar from "./sidebar/sidebar";
import CollaboratorView from "./Views/CollaboratorView/CollaboratorView";
import { ItemEditor } from "./ItemEditor/ItemEditor";
import useTaskDocAPI from "./CheckList/Hooks/useTaskDocAPI";
import { Route, Routes, useParams } from "react-router-dom";
import { UserContext } from "@context/UserContext";
import useTaskAttributeAPI from "./CheckList/Hooks/useTaskAttributeAPI";

const Collection: React.FC = () => {
	const { id } = useParams();
	const { token } = useContext(UserContext);
	const { taskDoc, isLoading } = useTaskDocAPI("http://localhost:5081/taskDocs", id ?? "", token);
	const { attributes, isLoading: attributesIsLoading } = useTaskAttributeAPI(
		"http://localhost:5081/taskDocs",
		id ?? "",
		token
	);

	useEffect(() => {
		console.log(taskDoc);
	}, [isLoading, taskDoc]);

	useEffect(() => {
		console.log(attributes);
	}, [attributes, attributesIsLoading]);

	return (
		<div className="collection">
			<BreadCrumb />
			<SideBar taskDoc={taskDoc} />
			<Routes>
				<Route path="collaborators" element={<CollaboratorView />} />
				<Route path="taskDoc" element={<CheckList />} />
				<Route path="*" element={<div></div>} />
			</Routes>
			<ItemEditor />
		</div>
	);
};

export default Collection;
