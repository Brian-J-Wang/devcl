import { CLCollection, CLItem, CLItemPatch } from "../../Components/Collection/DBCollection";

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
            return this.sanitize(res) as CLCollection;
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
            return this.sanitize(res) as CLItem;
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
            return this.sanitize(res) as CLItem;
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
        })
    }

    sanitize(data: { [key: string]: any}) {
        const stack = [];
        stack.push(data);
        
        while (stack.length != 0) {
            const current = stack.shift();

            for (let key in current) {
                if (key === "_id") { 
                    if (current[key].$oid) {
                        current[key] = current[key].$oid;
                    }
                }
                if (current[key] instanceof Object) {
                    stack.push(current[key]);
                }
            }
        }

        return data;
    }
}

export default CollectionAPI;