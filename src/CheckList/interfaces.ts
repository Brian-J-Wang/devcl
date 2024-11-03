export interface checkListData {
   url : string
}

export interface CLItem {
    title: string,
    checked: boolean,
    _id: string
}

//Item transfer object
export interface CLItemTO {
    id?: string
    section?: string,
    title?: string,
    checked?: boolean
}

export interface valueChangedData {
    sectionId: string,
    itemID: string,
    value: boolean | string
}

export interface patchNotes {
    _id: string,
    version: string,
    content: string[]
}

export interface checkListSection {
    name: string,
    items: CLItem[],
    format: string,
    _id: string
}

export interface checkListCollection {
    _id: string,
    owner: string,
    checklistName: string,
    version: string,
    dummy: boolean,
    patchNotes: patchNotes[],
    checkList: checkListSection[]
}

export const dummyCheckList : checkListCollection = {
    _id: "",
    owner: "",
    checklistName: "",
    version: "",
    dummy: true,
    patchNotes: [],
    checkList: []
}

export interface DBUpdateObject {
    name?: string
    section?: {
        _id: string,
        name?: string,
        item?: {
            _id: string,
            title?: string,
            checked?: boolean
        }
    }[]
}