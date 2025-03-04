class Node<T> {
    prev: Node<T> | null = null;
    next: Node<T> | null = null;
    children: Node<T>[] = [];

    constructor(public content: T) {

    }
}

class LinkedNodes<T> extends Array<T> {
    constructor() {
        super();
    }

    Forwards(start: number, fn: (item: T, index: number, array: Array<T>) => boolean) {

    }
}

const test = new LinkedNodes<number>();