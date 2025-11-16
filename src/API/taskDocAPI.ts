import { TaskDoc } from "@app-types/taskDoc";

class TaskDocAPI {
	endpoint: string;
	token: string;

	constructor(endpoint: string, token: string) {
		this.endpoint = endpoint;
		this.token = token;
	}

	getTaskDoc(id: string): Promise<TaskDoc> {
		return fetch(`${this.endpoint}/${id}`, {
			method: "GET",
			headers: {
				authorization: this.token
			}
		}).then((res) => {
			return res.ok ? res.json() : Promise.reject();
		});
	}
}

export default TaskDocAPI;
