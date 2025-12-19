import {
	AttributeDTO,
	AttributeConfig,
	AttributeValue,
	EnumAttributeDTO
} from "src/Features/Attributes/attribute.types";

export abstract class Attribute {
	id: string;
	name: string;
	isUserDefined: boolean;
	primaryColor: string;
	config?: AttributeConfig;

	constructor(taskAttribute: AttributeDTO) {
		this.id = taskAttribute.id;
		this.name = taskAttribute.name;
		this.isUserDefined = taskAttribute.isUserDefined;
		this.primaryColor = taskAttribute.primaryColor;
		this.config = taskAttribute.config;
	}

	abstract getValue(value: string): AttributeValue;
}

export class EnumAttribute extends Attribute {
	validValues: AttributeValue[];
	constructor(taskAttribute: EnumAttributeDTO) {
		super(taskAttribute);
		this.validValues = taskAttribute.validValues;
	}

	getValue(id: string): AttributeValue {
		const value = this.validValues.find((value) => value.id == id);
		if (!value) {
			return {
				id: "000",
				name: "000"
			};
		}

		return value;
	}
}
