export type PatchNugget<T, U extends keyof T = keyof T> = {
	propertyName: keyof T;
	value: T[U];
	updateType: "add" | "remove" | "update";
};
