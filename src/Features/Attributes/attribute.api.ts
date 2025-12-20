import { AttributeDTO } from "src/Features/Attributes/attribute.types";

class AttributeAPI {
	endpoint: string;
	docuId: string;
	token: string;
	constructor(endpoint: string, docuId: string, token: string) {
		this.endpoint = endpoint;
		this.docuId = docuId;
		this.token = `Bearer ${token}`;
	}

	getAttribute(): Promise<AttributeDTO[]> {
		return fetch(`${this.endpoint}/${this.docuId}/attributes`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				authorization: this.token
			}
		}).then((res) => {
			return res.ok ? res.json() : Promise.reject();
		});
	}
}

export default AttributeAPI;
