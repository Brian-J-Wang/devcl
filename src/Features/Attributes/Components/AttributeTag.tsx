import TaskAttributeAPIContext from "@context/taskAttributeAPIContext";
import styles from "./AttributeTag.module.css";
import { requireContext } from "@utils/helpers";
import { AttributeValue } from "../attribute.types";

type AttributeTagProps = {
	id: string;
	value: string;
	onDeleteClick?: (attributeId: string) => void;
	simpleTag: boolean;
};

const AttributeTag: React.FC<AttributeTagProps> = ({ id, value, simpleTag = false }) => {
	const taskAttributeAPI = requireContext(TaskAttributeAPIContext);

	if (taskAttributeAPI.isLoading) {
		return (
			<div className={styles.attributeTag} id={id}>
				...
			</div>
		);
	}

	const attribute = taskAttributeAPI.getAttribute(id);
	const attributeValue: AttributeValue = simpleTag
		? {
				id: "000",
				name: value
		  }
		: attribute.getValue(value);

	return (
		<div className={styles.attributeTag} id={id}>
			<span>{attributeValue.name}</span>
		</div>
	);
};

export default AttributeTag;
