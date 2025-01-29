import { PatchType } from "./Collection/Collection"

interface Icollection {
    baseURL: string,
    authorization: string,
    collectionId: string,
    collection: any
}

export interface CLCollection {
    _id: string,
    name: string,
    owner: string,
    version: string,
    categories: CLCategories[]
    patches: CLPatch[],
    items: CLItem[]
}

export interface CLCategories {
    _id: string,
    name: string,
    format: string
}

export interface id {
    item: string,
    category: string
}

export interface CLItem {
    _id: string,        //the databaseId
    category: string,    //the section it belongs to
    checked: boolean,   //is it checked or not
    blurb: string,      //the blurb in the checklist
}

export interface CLItemPost {
    category: string,
    blurb: string
}

//updateItems only contains the values that are changed
export interface CLItemPatch {
    category?: string,
    checked?: boolean,
    blurb?: string,
}

export interface CLPatch {
    _id: string,
    version: string,
    content: string[]
}

export const emptyCollection: CLCollection = {
    name: "",
    version: "",
    categories: [],
    patches: [],
    owner: "",
    _id: "",
    items: []
}

export default class DBCollection implements Icollection{
    baseURL: string = "http://localhost:5081/collections";
    authorization: string;
    collection = {};
    collectionId = "";

    constructor(collectionId: string, authorization: string = "") {
        this.collectionId = collectionId;
        this.authorization = authorization;
        //ping query for 
    }

    init(stateFunction: React.Dispatch<any>): Promise<CLCollection | undefined> {
        return fetch(`${this.baseURL}/${this.collectionId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            return res.ok ? res.json() : Promise.reject();
        }).then((res: CLCollection) => {
            processResult(res);
            stateFunction(res);
            return res;
        }).catch(() => {
            console.error("Collection could not be found by the server");
            return undefined;
        })
    }

    updateVersion(patchType: PatchType) {
        return fetch(`${this.baseURL}/${this.collectionId}/version`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                patchType: patchType
            })
        }).then((res) => {
            if (res.ok) {
                return res.json()
            }
        }).then((res) => {
            console.log(res);
            
            return res;
        })
    }

    patchItem(itemId: id, update: CLItemPatch, stateFunction?: React.Dispatch<any>) {
        return fetch(`${this.baseURL}/${this.collectionId}/category/item?categoryId=${itemId.category}&itemId=${itemId.item}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(update)
        }).then((res) => {
            return res.ok ? res.json() : Promise.reject();
        }).then((item : CLItem) => {
            console.log(item);

            if (stateFunction) {
                stateFunction(item);
            }
            //update the state in collection.


            //item can also be returned if there are any other operations that needs to be done.
            return item;
        })
    }

    postItem(post: CLItemPost) {
        return fetch(`${this.baseURL}/${this.collectionId}/category/item?categoryId=${post.category}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        }).then((res) => {
            return res.ok ? res.json() : Promise.reject();
        }).then((item : CLItem) => {
            return item;
        })
    }

    deleteItem(item: CLItem) {
        return fetch(`${this.baseURL}/${this.collectionId}/category/item?categoryId=${item.section}&itemId=${item._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            return res.ok ? Promise.resolve() : Promise.reject();
        })
    }
}

function processResult(result: any) {
    const stack = [];
    stack.push(result);
    
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

    console.log(result);

    return result;
}