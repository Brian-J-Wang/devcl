import { TaskDoc } from "../types/taskDoc";

class UserTaskDocAPI {
	endpoint: string;
	jwt: string;

	constructor(endpoint: string, jwt: string) {
		this.endpoint = endpoint;
		this.jwt = jwt;
	}

	GetUserTaskDocs(): Promise<TaskDoc[]> {
		return fetch(`${this.endpoint}/taskDocs`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${this.jwt}`
			}
		}).then((res) => {
			return res.ok ? res.json() : Promise.reject();
		});
	}

	AddNewCollection(): Promise<TaskDoc> {
		return fetch(`${this.endpoint}/taskDocs`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${this.jwt}`
			},
			body: JSON.stringify({
				title: "test"
			})
		}).then((res) => {
			return res.ok ? res.json() : Promise.reject();
		});
	}

	GetTaskDoc(id: string) {
		return fetch(`${this.endpoint}/taskDocs/${id}`, {
			method: "GET",
			headers: {
				authorization: `Bearer ${this.jwt}`
			}
		});
	}

	DeleteUserCollection(id: string) {
		return fetch(`${this.endpoint}/taskDocs/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${this.jwt}`
			}
		}).then((res) => {
			return res.ok ? res.json() : Promise.reject();
		});
	}
}

export default UserTaskDocAPI;
