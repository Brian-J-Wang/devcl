import { useContext } from "react";
import styles from "./AttributeTag.module.css";
import TaskAttributeAPIContext from "@context/taskAttributeAPIContext";

type AttributeTagProps = {
	id: string;
	value: string;
	onDeleteClick: (attributeId: string) => void;
};

const AttributeTag: React.FC<AttributeTagProps> = ({ onDeleteClick, id, value }) => {
	const { getAttributeById } = useContext(TaskAttributeAPIContext);
	const handleDeleteClick = () => {
		onDeleteClick(id);
	};

	return (
		<div className={styles.attributeTag}>
			<span className={styles.removeAttribute} onClick={handleDeleteClick}>
				X
			</span>
			<span style={{ fontWeight: 700 }}>{getAttributeById(id).name}</span> :: {value}
		</div>
	);
};

export default AttributeTag;
