import { Task } from "../../utils/collectionAPI"

export interface CLCollection {
    _id: string,
    name: string,
    owner: string,
    version: string,
    categories: CLCategories[]
    patches: CLPatch[],
    items: Task[]
    collaborators: Collaborators[]
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

export interface CLPatch {
    _id: string,
    version: string,
    content: string[]
}

export interface Collaborators {
    alias: string,
    email: string
}
