import { EnumAttribute } from "./attribute.class";
import { AttributeDTO, EnumAttributeDTO } from "./attribute.types";

const AttributeFactory = (attribute: AttributeDTO) => {
	switch (attribute.type) {
		case "enum":
			return new EnumAttribute(attribute as EnumAttributeDTO);
		case "range":
			throw new Error();
	}
};

export { AttributeFactory };
