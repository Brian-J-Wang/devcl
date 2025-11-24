import { Attribute } from "@app-types/attributes";
import { createContext } from "react";

type AttributeContextProps = {
	getAttributeData: (id: string) => Attribute;
};

const AttributeContext = createContext<AttributeContextProps>({});

export default AttributeContext;
