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
    count: number;
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
    remove(value: T): void;
    search(value: T): ITreeNode<T>;
    count: number;
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

function findNode<T>(tree: ITree<T>, value: T, compare: Compare<T>) {
    const stack = [tree.root];
    let ret = NULL_NODE;
    while (stack.length !== 0) {
        const node = stack.pop();
        if (node === NULL_NODE) {
            continue;
        }
        const compareResult = compare(node.value, value);
        if (compareResult === 0) {
            ret = node;
            break;
        } else if (compareResult > 0 && node.left !== NULL_NODE) {
            stack.push(node.left);
        } else if (node.right !== NULL_NODE) {
            stack.push(node.right);
        }
    }
    return ret;
}

function onLeft<T>(node: ITreeNode<T>) {
    return (node = node.parent.left);
}

function onRight<T>(node: ITreeNode<T>) {
    return (node = node.parent.right);
}

function rotateLeft<T>(tree: ITree<T>, x: ITreeNode<T>) {
    if (x.right === NULL_NODE) return;
    const y = x.right;
    x.right = y.left;
    if (y.left !== NULL_NODE) y.left.parent = x;
    y.parent = x.parent;

    if (x.parent === NULL_NODE) tree.root = y;
    else {
        if (onLeft(x)) x.parent.left = y;
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
        if (onRight(x)) x.parent.right = y;
        else x.parent.left = y;
    }

    y.right = x;
    x.parent = y;
}

function minimumTree<T>(x: ITreeNode<T>) {
    while (x.left !== NULL_NODE) x = x.left;
    return x;
}

function fixInsert<T>(tree: ITree<T>, z: ITreeNode<T>) {
    let y: ITreeNode<T>;
    while (y.parent.color === Color.red) {
        if (onLeft(z.parent)) {
            y = z.parent.parent.right;
            if (y.color === Color.red) {
                // filp color
                z.parent.color = Color.black;
                y.color = Color.black;
                z.parent.parent.color = Color.red;
                z = z.parent.parent;
            } else {
                if (onRight(z)) {
                    z = z.parent;
                    rotateLeft(tree, z);
                }

                z.parent.color = Color.black;
                z.parent.parent.color = Color.red;
                rotateRight(tree, z.parent.parent);
            }
        } else {
            y = z.parent.parent.left;

            if (y.color === Color.red) {
                z.parent.color = Color.black;
                y.color = Color.black;
                z.parent.parent.color = Color.black;
                z = z.parent.parent;
            } else {
                if (onLeft(z)) {
                    z = z.parent;
                    rotateRight(tree, z);
                }

                z.parent.color = Color.black;
                z.parent.parent.color = Color.red;
                rotateLeft(tree, z.parent.parent);
            }
        }
    }
    tree.root.color = Color.black;
}

function fixRomove<T>(tree: ITree<T>, z: ITreeNode<T>) {
    //
}

// [definition](https://www.cs.auckland.ac.nz/software/AlgAnim/red_black.html)
// [visulization](https://www.cs.usfca.edu/~galles/visualization/RedBlack.html)

export function createRedBlackTree<T>(
    compare: Compare<T> = defaultCompare
): IRedBlackTree<T> {
    const tree: ITree<T> = {
        root: NULL_NODE,
        count: 0,
    };

    return {
        search(value: T) {
            return findNode(tree, value, compare);
        },
        insert: (value: T) => {
            let x = tree.root;
            let y = NULL_NODE;
            const z: ITreeNode<T> = {
                parent: NULL_NODE,
                right: NULL_NODE,
                left: NULL_NODE,
                color: Color.red, // red node only need to fix red-red case
                value,
            };

            while (x !== NULL_NODE) {
                y = x;
                if (compare(x.value, z.value) > 0) {
                    x = x.left;
                } else {
                    x = x.right;
                }
            }

            if (y === NULL_NODE) {
                y = z;
            } else {
                if (compare(y.value, z.value) > 0) {
                    y.left = z;
                } else {
                    y.right = z;
                }
            }

            fixInsert(tree, z);
            tree.count++;
        },
        remove(value: T) {
            const z = findNode(tree, value, compare);
            let y = z;
            let originalYColor = y.color;
            let x: ITreeNode<T>;
            if (z.left === NULL_NODE) {
                // TODO
            } else if (z.right === NULL_NODE) {
                // TODO
            } else {
                // TODO
                y = minimumTree(z.right);
                originalYColor = y.color;
            }

            if (originalYColor === Color.black) {
                fixRomove(tree, z);
            }
            tree.count--;
        },
        get count() {
            return tree.count;
        },
    };
}
