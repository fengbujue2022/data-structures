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
    nil = 3,
}

interface ITree<T> {
    root: ITreeNode<T>;
    size: number;
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
    color: Color.nil,
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

function fixInsert<T>(tree: ITree<T>, z: ITreeNode<T>, compare: Compare<T>) {
    let y: ITreeNode<T>;
    while (y.parent.color === Color.red) {
        // TODO
    }
    tree.root.color = Color.black;
}

function rotateLeft<T>(tree: ITree<T>, x: ITreeNode<T>) {
    if (x.right === NULL_NODE) return;
    const y = x.right;
    x.right = y.left;
    if (y.left !== NULL_NODE) y.left.parent = x;
    y.parent = x.parent;

    if (x.parent === NULL_NODE) tree.root = y;
    else {
        if (x === x.parent.left) x.parent.left = y;
        else x.parent.right = y;
    }

    y.left = x;
    x.parent = y;
}

function rotateRight<T>(tree: ITree<T>, x: ITreeNode<T>) {
    if (x.left === NULL_NODE) return;
    const y = x.left;
    x.left = y.right;
    if (y.right !== NULL_NODE) y.right.parent = x;
    y.parent = x.parent;

    if (x.parent === NULL_NODE) tree.root = y;
    else {
        if (x === x.parent.right) x.parent.right = y;
        else x.parent.left = y;
    }

    y.right = x;
    x.parent = y;
}

/*
性质1：每个节点要么是黑色，要么是红色。
性质2：根节点是黑色。
性质3：每个叶子节点（NIL）是黑色。
性质4：每个红色结点的两个子结点一定都是黑色。
性质5：任意一结点到每个叶子结点的路径都包含数量相同的黑结点。(如果一个结点存在黑子结点，那么该结点肯定有两个子结点)
*/

export function createRedBlackTree<T>(
    compare: Compare<T> = defaultCompare
): IRedBlackTree<T> {
    const tree: ITree<T> = {
        root: NULL_NODE,
        size: 0,
    };

    return {
        insert: (value: T) => {
            const z: ITreeNode<T> = {
                parent: NULL_NODE,
                right: NULL_NODE,
                left: NULL_NODE,
                color: Color.red, // 因为性质5 避免增加黑色节点，红色节点只需要fix red-red的情况
                value,
            };
            insertNode(tree.root, z, compare);
            fixInsert(tree, z, compare);
        },
    } as IRedBlackTree<T>; // TODO remove 'as'
}
