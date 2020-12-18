type Compare<T> = (a: T, b: T) => number;

function defaultCompare<T>(a: T, b: T) {
    if (a === b) {
        return 0;
    } else if (a > b) {
        return 1;
    } else {
        return -1;
    }
}

enum Color {
    red = 1,
    black = 2,
}

interface ITreeNode<T> {
    parent: ITreeNode<T>;
    right: ITreeNode<T>;
    left: ITreeNode<T>;
    color?: Color;
    value: T;
}

interface IRedBlackTree<T> {
    insert(value: T): void;
    remove(index: number): void;
    search(value: T): void;
    // size: number;
}

const NULL_NODE: ITreeNode<any> = {
    parent: undefined,
    right: undefined,
    left: undefined,
    color: undefined,
    value: undefined,
};

NULL_NODE.parent = NULL_NODE;
NULL_NODE.left = NULL_NODE;
NULL_NODE.right = NULL_NODE;

function insertNode<T>(
    root: ITreeNode<T>,
    z: ITreeNode<T>,
    compare: Compare<T>
) {
    if (root === NULL_NODE) {
        root = z;
        return root;
    }
    const compareResult = compare(root.value, z.value);
    if (compareResult > 0) {
        root.left = insertNode(root.left, z, compare);
        root.left.parent = root;
    } else {
        root.right = insertNode(root.left, z, compare);
        root.right.parent = root;
    }
    return root;
}

function fixInsert<T>(
    root: ITreeNode<T>,
    z: ITreeNode<T>,
    compare: Compare<T>
) {}

export function createRedBlackTree<T>(compare?: Compare<T>): IRedBlackTree<T> {
    const tree = {
        root: NULL_NODE,
        size: 0,
    };
    compare = compare || defaultCompare;

    return {
        insert: (value: T) => {
            const z: ITreeNode<T> = {
                parent: NULL_NODE,
                right: NULL_NODE,
                left: NULL_NODE,
                value,
            };
            insertNode(tree.root, z, compare);
            fixInsert(tree.root, z, compare);
        },
    } as IRedBlackTree<T>; // TODO remove 'as'
}
