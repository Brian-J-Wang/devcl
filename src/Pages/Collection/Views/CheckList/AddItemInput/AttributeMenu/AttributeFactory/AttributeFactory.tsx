import { Attribute, EnumAttribute } from "@features/Attributes/attribute.class";
import EnumAttributeMenu from "./EnumAttributeMenu/EnumAttributeMenu";

const AttributeFactory = (attribute: Attribute, onValueSelect: (value: unknown) => void) => {
	switch (true) {
		case attribute instanceof EnumAttribute:
			console.log("here");
			return <EnumAttributeMenu attribute={attribute} onValueSelect={onValueSelect}></EnumAttributeMenu>;
	}
};

export default AttributeFactory;
