export interface AttributeNode {
    prev: AttributeNode | null,
    next: AttributeNode | null,
    hidden: boolean,
    name: string
}