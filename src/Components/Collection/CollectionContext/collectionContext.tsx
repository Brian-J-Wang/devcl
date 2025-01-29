import React, { createContext, useEffect, useState } from "react"
import { CLCollection, CLItem, CLItemPatch, CLItemPost, emptyCollection, id } from "../DBCollection";
import { PatchType } from "../Collection/Collection";

//@ts-ignore
export const DBContext = createContext<DBContextValues>();

type DBFunctions = {
    postPatch: (patch: PatchType) => Promise<any>
    postItem: (item: CLItemPost) => Promise<any>
    patchItem: (id: id, item: CLItemPatch) => Promise<any>,
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
            return fetch(`${baseURL}/${collectionId}/category/item?categoryId=${item.category}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(item)
            }).then((res) => {
                return res.ok ? res.json() : Promise.reject();
            }).then((clItem: CLItem) => {
                const copy = { ...collection };

                copy.categories?.find((category) => category._id == item.category)?.items.push(clItem);

                setCollection(copy);

                return copy.categories?.find((category) => category._id == item.category);
            });
        },
        patchItem: function (id: id, item: CLItemPatch): Promise<any> {
            return fetch(`${baseURL}/${collectionId}/category/item?categoryId=${id.category}&itemId=${id.item}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(item)
            }).then((res) => {
                return res.ok ? res.json() : Promise.reject();
            }).then((item: CLItem) => {
                const copy = { ...collection };

                const categoryIndex = copy.categories?.findIndex(category => category._id == id.category);

                const itemIndex = copy.categories[categoryIndex].items.findIndex(item => item._id == id.item);

                if (categoryIndex != -1 && itemIndex != -1) {
                    copy.categories[categoryIndex].items[itemIndex] = item;
                }

                setCollection(copy);

                return item;
            });
        },
        deleteItem: function (item: CLItem): Promise<any> {
            return fetch(`${baseURL}/${collectionId}/category/item?categoryId=${item.section}&itemId=${item._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((res) => {
                return res.ok ? Promise.resolve() : Promise.reject();
            }).then(() => {
                const copy = { ...collection };

                const categoryIndex = copy.categories?.findIndex(category => category._id == item.section);

                if (categoryIndex == -1) {
                    throw new Error('Category not found');
                } else {
                    //@ts-ignore
                    copy.categories[categoryIndex].items = copy.categories[categoryIndex].items.filter(i => i._id != item._id);
                }

                //@ts-ignore
                setCollection(copy);
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