import attributeStyles from "../Attributes.module.css";
import { EnumAttribute } from "@features/Attributes/attribute.class";

type EnumAttributeType = {
	attribute: EnumAttribute;
	onValueSelect: (value: string) => void;
};

const EnumAttributeMenu: React.FC<EnumAttributeType> = ({ attribute, onValueSelect }) => {
	const handleClick = (value: string) => () => {
		onValueSelect(value);
	};

	console.log(attribute);

	return (
		<>
			{attribute.validValues.map((value) => {
				return (
					<div key={value.id} className={attributeStyles.attributeListItem} onClick={handleClick(value.id)}>
						{value.name}
					</div>
				);
			})}
		</>
	);
};

export default EnumAttributeMenu;
