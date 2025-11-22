type Attribute = {
	_id: string;
	name: string;
	shared: boolean;
	type: "enum" | "range";
};

type EnumAttribute = Attribute & {
	validValues: string[];
};

export type { Attribute, EnumAttribute };
