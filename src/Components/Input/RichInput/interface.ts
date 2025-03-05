//attribute menu uses this to let cursor move more cleanly

import { ReactNode } from "react"

export interface AttributeNode {
    prev: AttributeNode | null,
    next: AttributeNode | null,
    hidden: boolean,
    attribute: Attribute
}

export interface Attribute {
    name: string,
    menuDisplay: ReactNode,     //the attribute as it shows up when picking attributes
    content: ReactNode          //the attribute menu for picking the attribute items
}