import { Attribute } from "src/Features/Attributes/attribute.types";
import { createContext } from "react";

type AttributeContextProps = {
	getAttributeData: (id: string) => Attribute;
};

const AttributeContext = createContext<AttributeContextProps>({});

export default AttributeContext;
