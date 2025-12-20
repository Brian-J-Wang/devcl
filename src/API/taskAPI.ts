import { PatchNugget } from "@app-types/patchNuggets";
import { PostTask, Task } from "../types/task";

class TaskAPI {
	private endpoint: string;
	private jwt: string;

	constructor(endpoint: string, taskDocId: string, jwt: string) {
		this.endpoint = `${endpoint}/collections/${taskDocId}/tasks`;
		this.jwt = jwt;
	}

	getTasks(): Promise<Task[]> {
		return fetch(this.endpoint, {
			method: "GET",
			headers: {
				authorization: `Bearer ${this.jwt}`
			}
		}).then((res) => {
			return res.ok ? res.json() : Promise.reject();
		});
	}

	addTask(task: PostTask): Promise<Task> {
		return fetch(this.endpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${this.jwt}`
			},
			body: JSON.stringify(task)
		}).then((res) => {
			return res.ok ? res.json() : Promise.reject();
		});
	}

	replaceTask(taskId: string, task: Task) {
		return fetch(`${this.endpoint}/${taskId}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${this.jwt}`
			},
			body: JSON.stringify(task)
		}).then((res) => {
			return res.ok ? res.json() : Promise.reject();
		});
	}

	patchTask(taskId: string, nuggets: PatchNugget<Task>[]) {
		return fetch(`${this.endpoint}/${taskId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${this.jwt}`
			},
			body: JSON.stringify(nuggets)
		}).then((res) => {
			return res.ok ? res.json() : Promise.reject();
		});
	}

	deleteTask(id: string) {
		return fetch(`${this.endpoint}/${id}`, {
			method: "DELETE",
			headers: {
				authorization: `Bearer ${this.jwt}`
			}
		}).then((res) => {
			return res.ok ? Promise.resolve(id) : Promise.reject();
		});
	}
}

export default TaskAPI;
