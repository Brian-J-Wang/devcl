import userProjectContext from "@context/userProjectContext";
import { useContext } from "react";

type CollectionProfileType = {
	name: string;
};

const CollectionProfile: React.FC<CollectionProfileType> = (props) => {
	const { taskDocs } = useContext(userProjectContext);

	return (
		<div className="cl-sidebar__profile">
			<div className="cl-sidebar__profile-left">{generateImagePlaceHolder(props.name)}</div>
			<h1>{props.name}</h1>
		</div>
	);
};

const generateImagePlaceHolder = (name: string) => {
	const names = name.split(" ").map((word) => {
		return word.charAt(0);
	});

	return `${names[0] ?? ""}${names[1] ?? ""}`;
};

export default CollectionProfile;
