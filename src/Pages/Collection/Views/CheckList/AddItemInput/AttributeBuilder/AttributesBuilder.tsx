import { Attribute, EnumAttribute } from "@app-types/attributes";
import EnumAttributeMenu from "./Attributes/EnumAttributeMenu";

type AttributeBuilderType = {
	attribute: Attribute;
};

const AttributeBuilder: React.FC<AttributeBuilderType> = ({ attribute }) => {
	if (attribute.type == "enum") {
		return <EnumAttributeMenu attribute={attribute as EnumAttribute}></EnumAttributeMenu>;
	} else if (attribute.type == "range") {
		return <div></div>;
	}
};

export default AttributeBuilder;
