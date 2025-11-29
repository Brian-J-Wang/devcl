export type PatchNugget<T> = {
	propertyName: keyof T;
	value: unknown;
	updateType: "add" | "remove" | "update";
};
