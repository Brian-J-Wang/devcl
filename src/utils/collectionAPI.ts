import { CLCollection, CLItem, CLItemPatch } from "../Pages/Collection/interfaces"
import { sanitize } from "./helpers";

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

    addNewItem(parentCategory: string, blurb: string) {
        return fetch(`${this.endpoint}/${this.collection}/items`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                category: parentCategory,
                blurb: blurb
            })
        }).then((res) => {
            return res.ok ? res.json() : Promise.reject();
        }).then((res) => {
            return sanitize(res) as CLItem;
        })
    }

    updateItem(itemId: string, update: CLItemPatch) {
        return fetch(`${this.endpoint}/${this.collection}/items/${itemId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(update)
        }).then((res) => {
            return res.ok ? res.json() : Promise.reject();
        }).then((res) => {
            return sanitize(res) as CLItem;
        })
    }

    deleteItem(itemId: string) {
        return fetch(`${this.endpoint}/${this.collection}/items/${itemId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        }).then((res) => {
            return res.ok ? Promise.resolve() : Promise.reject();
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
}

export default CollectionAPI;