export type Task = {
	_id: string;
	blurb: string;
	status: "incomplete" | "inprogress" | "complete";
};

export type PostTask = Omit<Task, "_id" | "status">;
export type PatchTask = Partial<Omit<Task, "_id">> & { _id: string };