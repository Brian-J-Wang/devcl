import React, { createContext, useEffect, useState } from "react"
import { CLCollection, CLItem, CLItemPatch, CLItemPost, emptyCollection, id } from "../DBCollection";
import { PatchType } from "../Collection/Collection";

//@ts-ignore
export const DBContext = createContext<DBContextValues>();

type DBFunctions = {
    postPatch: (patch: PatchType) => Promise<any>
    postItem: (item: CLItemPost) => Promise<any>
    patchItem: (id: string, item: CLItemPatch) => Promise<any>,
    deleteItem: (item: CLItem) => Promise<any>
    getItemsInCategory: (id: string) => CLItem[]
}

interface DBContextValues {
    collection: CLCollection,
    shared: DBFunctions
}

interface CheckList {
    [key: string]: Category
}

interface Category {
    name: string,
    items: CheckListItem[]
}

interface CheckListItem {
    _id: string,
    blurb: string,
    checked: boolean,
    category: string
}

const baseURL = "http://localhost:5081/collections";
const collectionId = '67201b8d79cef1f65b14da4a';

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

    return result;
}

const DatabaseContext: React.FC<React.PropsWithChildren> = (props) => {
    const shared: DBFunctions = {
        postPatch: function (patchType: PatchType): Promise<any> {
            return fetch(`${baseURL}/${collectionId}/version`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    patchType: patchType
                })
            }).then((res) => {
                return res.ok ? res.json() : Promise.reject();
            }).then((patch) => {
                const copy = { ...collection };

                copy.patches?.push(patch);

                setCollection(copy);

                return Promise.resolve();
            })
        },
        postItem: function (item: CLItemPost): Promise<any> {
            return fetch(`${baseURL}/${collectionId}/items`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(item)
            }).then((res) => {
                return res.ok ? res.json() : Promise.reject();
            }).then((clItem: CLItem) => {
                const copy = { ...checkList };

                copy[clItem.category].items.push(clItem);

                setCheckList(copy);

                return clItem;
            });
        },
        patchItem: function (id: string, patch: CLItemPatch): Promise<any> {
            return fetch(`${baseURL}/${collectionId}/items/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(patch)
            }).then((res) => {
                return res.ok ? res.json() : Promise.reject();
            }).then((res: CLItem) => {
                const copy = { ...checkList };

                copy[res.category].items = copy[res.category].items.map((item) => {
                    if (item._id == id) {
                        item.checked = patch.checked ?? item.checked;
                    } 

                    return item
                })

                setCheckList(copy);

                return res;
            });
        },
        deleteItem: function (deletionItem: CLItem): Promise<any> {
            return fetch(`${baseURL}/${collectionId}/items/${deletionItem._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((res) => {
                return res.ok ? Promise.resolve() : Promise.reject();
            }).then(() => {
                const copy = { ...checkList };

                copy[deletionItem.category].items = copy[deletionItem.category].items.filter(item => item._id != deletionItem._id);

                setCheckList(copy);
                
            }).catch((err: Error) => {
                console.log(err.message);
            });
        },
        getItemsInCategory: function (id: string) {
            if (checkList[id]) {
                return checkList[id].items;
            } else {
                return [];
            }
        }
    }

    const buildCheckList = (res: CLCollection) => {
        const checklist: CheckList = {};

        res.categories.forEach((category) => {
            checklist[category._id] = {
                name: category.name,
                items: []
            }
        })

        res.items.forEach((item) => {
            if (checklist[item.category] != undefined) {
                checklist[item.category].items.push(item);
            } else {
                console.error("item belongs to a category that does not exist");
            }
        });

        setCheckList(checklist);
    }

    const [collection, setCollection] = useState<CLCollection>(emptyCollection);
    const [checkList, setCheckList] = useState<CheckList>({});
    //gets the collection data and formats it.
    useEffect(() => {
        fetch(`${baseURL}/${collectionId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            return res.ok ? res.json() : Promise.reject();
        }).then((res: CLCollection) => {
            processResult(res);
            setCollection(res);
            buildCheckList(res);
            return res;
        }).catch(() => {
            console.error("Collection could not be found by the server");
            return undefined;
        })
    }, [])

    return (
        <DBContext.Provider value={{collection, shared}}>
            {props.children}
        </DBContext.Provider>
    )
}

export default DatabaseContext;