import { CLCollection } from "../Pages/Collection/interfaces"
import { sanitize } from "./helpers";

export type Task = {
    _id: string,
    blurb: string,
    attributes: {
        [ key: string ]: any
    }
}

export type TaskRequest = {
    _id?: string,
    blurb?: string,
    attributes?: {
        [ key: string ]: any
    }
}

export enum PatchType {
    major,
    minor,
    patch
}
/**
 * Class contains endpoints for a specific collection instance.
 */
class CollectionAPI {
    constructor(
        private readonly endpoint: string,
        private readonly collection: string,
        private readonly token: string
    ) {}

    getCollection() {
        return fetch(`${this.endpoint}/${this.collection}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${this.token}`
            }
        }).then((res) => {
            return res.ok ? res.json() : Promise.reject();
        }).then((res) => {
            return sanitize(res) as CLCollection;
        })
    }

    postItem(request: TaskRequest) {
        if (!request.blurb) {
            return Promise.reject();
        }
        
        return fetch(`${this.endpoint}/${this.collection}/items`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        }).then((res) => {
            return res.ok ? res.json() : Promise.reject();
        }).then((res) => {
            return sanitize(res) as Task;
        })
    }

    updateItem(request: TaskRequest) {
        if (!request._id) {
            return Promise.reject("Missing item id");
        }

        if (!request.blurb && Object.keys(request.attributes ?? {}).length == 0) {
            return Promise.reject("Request is missing changes");
        }

        return fetch(`${this.endpoint}/${this.collection}/items/${request._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        }).then((res) => {
            return res.ok ? res.json() : Promise.reject();
        }).then((res) => {
            return sanitize(res) as Task;
        })
    }

    deleteItem(request: TaskRequest) {
        if (!request._id) {
            return Promise.reject("Missing item id");
        }
        
        return fetch(`${this.endpoint}/${this.collection}/items/${request._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        }).then((res) => {
            return res.ok ? Promise.resolve() : Promise.reject();
        })
    }

    addCategory(name: string, format: string) {
        return fetch(`${this.endpoint}/${this.collection}/category`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`
            },
            body: JSON.stringify({
                name: name,
                format: format
            })
        }).then((res) => {
            return res.ok ? res.json() : Promise.reject();
        }).then((res) => {
            return sanitize(res);
        })
    }

    deleteCategory(id: string) {
        return fetch(`${this.endpoint}/${this.collection}/category`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`
            },
            body: JSON.stringify({
                id: id
            })
        }).then((res) => {
            return res.ok ? res.json() : Promise.reject();
        }).then((res) => {
            return sanitize(res);
        })
    }

    pushPatch(patch: PatchType) {
        return fetch(`${this.endpoint}/${this.collection}/version`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                patchType: patch
            })
        }).then((res) => {
            return res.ok ? res.json() : Promise.reject();
        }).then((res) => {
            return sanitize(res);
        })
    }

    addCollaborator(alias: string, email: string) {
        return fetch(`${this.endpoint}/${this.collection}/collaborators`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`
            },
            body: JSON.stringify({
                alias: alias,
                email: email
            })
        }).then((res) => {
            return res.ok ? res.json() : Promise.reject();
        }).then((res) => {
            return sanitize(res);
        })
    }

    removeCollaborator(alias: string) {
        return fetch(`${this.endpoint}/${this.collection}/collaborators`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`
            },
            body: JSON.stringify({
                alias: alias
            })
        }).then((res) => {
            return res.ok ? Promise.resolve() : Promise.reject();
        })
    }
}

export default CollectionAPI;