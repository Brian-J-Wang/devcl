import TaskAttributeAPIContext from "@context/taskAttributeAPIContext";
import styles from "./AttributeTag.module.css";
import { requireContext } from "@utils/helpers";
import { AttributeValue } from "../attribute.types";
import { hexToRGB } from "@utils/hexToRGB";

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

	if (attribute.name == "Priority") {
		console.log(attribute);
		console.log(attributeValue);
	}

	const textColor =
		attribute.config?.coloringMode == "secondary"
			? `rgba(${hexToRGB(attributeValue.secondaryColor!).join(",")})`
			: `rgba(${hexToRGB(attribute.primaryColor).join(",")})`;
	const borderColor =
		attribute.config?.coloringMode == "secondary"
			? `rgba(${hexToRGB(attributeValue.secondaryColor!, 0.8).join(",")})`
			: `rgba(${hexToRGB(attribute.primaryColor, 0.8).join(",")})`;
	const backgroundColor =
		attribute.config?.coloringMode == "secondary"
			? `rgba(${hexToRGB(attributeValue.secondaryColor!, 0.2).join(",")})`
			: `rgba(${hexToRGB(attribute.primaryColor, 0.2).join(",")})`;

	return (
		<div
			style={{ backgroundColor: backgroundColor, border: `1px solid ${borderColor}` }}
			className={styles.attributeTag}
			id={id}>
			<span style={{ color: textColor }}>
				{attribute.config?.showAttributeName ? attribute.name + "::" : ""}
				{attributeValue.name}
			</span>
		</div>
	);
};

export default AttributeTag;
