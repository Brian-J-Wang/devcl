import { sanitize } from "./helpers";

class UserCollectionAPI {
    constructor(
        private readonly url: string = "",
        public token: string = ""
    ) {}

    AddNewCollection(title: string) {
        return fetch(`${this.url}/collections`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`
            },
            body: JSON.stringify({
                title: title
            })
        }).then((res) => {
            return res.ok ? res.json() : Promise.reject();
        }).then((res) => {
            return sanitize(res);
        })
    }

    GetUserCollections() {
        return fetch (`${this.url}/collections`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`
            }
        }).then((res) => {
            return res.ok
                ? res.json()
                : Promise.reject();
        }).then((res) => {
            return sanitize(res); 
        })
    }
}

export default UserCollectionAPI;