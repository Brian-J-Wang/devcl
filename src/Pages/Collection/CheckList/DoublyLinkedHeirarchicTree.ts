class Node<T> {
    prev: Node<T> | null = null;
    next: Node<T> | null = null;
    parent: Node<T> | null = null;
    children: Node<T>[] = [];

    constructor(public content: T) {

    }
}

export class DoublyLinkedHeirarchicTree<T> {
    nodes: Node<T>[] = [];

    constructor() {}
    
    appendContent(content: T) {
        const node = new Node(content);
        
        const lastIndex = this.nodes.length - 1;
        if (lastIndex >= 0) {
            node.prev = this.nodes[lastIndex];
            this.nodes[lastIndex].next = node;
        };

        this.nodes.push(node);
    }

    removeAtIndex(index: number) {
        
    }
}