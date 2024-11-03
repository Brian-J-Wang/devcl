import { checkListCollection, CLItem, CLItemTO, DBUpdateObject } from "../CheckList/interfaces";
import { PatchType } from "../Components/Collection/Collection";

export function getUserCollection(collectionId: string) {
    return fetch(`http://localhost:5081/collections/${collectionId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        };
    }).then((res) => {
        res._id = res._id.$oid;
        res.patchNotes.forEach((patchNote : any) => {
            patchNote._id = patchNote._id.$oid;
        });
        res.checkList.forEach((section : any) => {
            section._id = section._id.$oid;
            section.items.forEach((item : any) => {
                item._id = item._id.$oid;
            })
        });

        return res as unknown as checkListCollection;
    })
}

//res will return a a patch notes version as well as any changes.
export function updateVersion(collectionId: string, patchType: PatchType) {
    return fetch(`http://localhost:5081/collections/${collectionId}/version`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            patchType: patchType
        })
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }
    }).then((res) => {
        console.log(res);

        return res;
    })
}

export function addNewTaskDB(collectionId: string, item: CLItemTO) {
    return fetch(`http://localhost:5081/collections/${collectionId}/items`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            section: item.section,
            title: item.title
        })
    }).then((res)=> {
        if (res.ok) {
            return res.json();
        }
    }).then((res) => {
        console.log(res);
        const item : CLItem = {
            title: res.title,
            checked: res.isChecked,
            _id: res.id
        }

        return item;
    })
}

export function updateTaskDB(collectionId: string, item: CLItemTO) {
    return fetch(`http://localhost:5081/collections/${collectionId}/items`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: item.id,
            section: item.section,
            isChecked: item.checked
        })
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }
    }).then((res) => {
        const item : CLItem = {
            checked: res.isChecked,
            _id: res.id,
            title: ""
        }

        return item;
    })
}

export function patchItem(collectionId: string, item: DBUpdateObject) {
    return fetch(`http://localhost:5081/collections/${collectionId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
    })
}

export function deleteItem(coolectionId: string, item: DBUpdateObject) {
    return Promise.resolve();
}