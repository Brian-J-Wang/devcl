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