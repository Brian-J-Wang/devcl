import { Attribute, EnumAttribute } from "./attribute.class";

export type AttributeConfig = {
	coloringMode?: "primary" | "secondary" | "both";
	/** shows the name of the attribute  */
	showAttributeName?: boolean;
};

export type AttributeDTO = {
	id: string;
	name: string;
	type: "enum" | "range";
	/** user defined attributes can be deleted */
	isUserDefined: boolean;
	/** Attribute color should be in the form of #aaa or #aaaaaa. It will not be used if coloring mode is set to "per-value". */
	primaryColor: string;
	config?: AttributeConfig;
};

export type AttributeValue = {
	/** value id */
	id: string;
	/** the name of the value */
	name: string;
	/** Attribute color should be in the form of #aaa or #aaaaaa. */
	secondaryColor?: string;
};

export type EnumAttributeDTO = AttributeDTO & {
	validValues: AttributeValue[];
};

export type AttributeClass = typeof Attribute;
export type EnumAttributeClass = typeof EnumAttribute;
