import { Attribute } from "@app-types/attributes";

type EnumAttributeType = {
	attribute: Attribute & {
		validValues: string[];
	};
};

const EnumAttributeMenu: React.FC<EnumAttributeType> = ({ attribute }) => {
	return <div>{JSON.stringify(attribute)}</div>;
};

export default EnumAttributeMenu;
