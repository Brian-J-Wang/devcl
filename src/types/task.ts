import { PatchNugget } from "./patchNuggets";

export type Task = {
	_id: string;
	blurb: string;
	status: "incomplete" | "inprogress" | "complete";
	attributes: Attribute[];
	subTasks: SubTask[];
};

export type SubTask = {
	state: "complete" | "incomplete";
	blurb: string;
};

export type Attribute = {
	id: string;
	value: unknown;
};

export type PostTask = Omit<Task, "_id" | "status">;
export type PatchTask = Partial<Omit<Task, "_id">> & { _id: string };
export type PatchTaskNuggets = {
	_id: string;
	nuggets: PatchNugget<Task>[];
};
