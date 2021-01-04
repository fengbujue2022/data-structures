type Compare<T> = (a: T, b: T) => number

function defaultCompare<T>(a: T, b: T) {
    if (a === b) {
        return 0
    } else if (a > b) {
        return 1
    } else {
        return -1
    }
}

export enum Color {
    red = 1,
    black = 2,
}

export enum TraversalOrder {
    preOrder = 1,
    inOrder = 2,
    postOrder = 3,
}

interface ITree<T> {
    root: ITreeNode<T>
    count: number
}

export interface ITreeNode<T> {
    parent: ITreeNode<T>
    right: ITreeNode<T>
    left: ITreeNode<T>
    color?: Color
    value: T
}

export interface IRedBlackTree<T> extends Iterable<T> {
    insert(value: T): void
    remove(value: T): void
    search(value: T): ITreeNode<T>
    count: number
}

const NULL_NODE: ITreeNode<any> = {
    parent: undefined as any,
    right: undefined as any,
    left: undefined as any,
    color: Color.black,
    value: undefined,
}

NULL_NODE.parent = NULL_NODE
NULL_NODE.left = NULL_NODE
NULL_NODE.right = NULL_NODE

function findNode<T>(tree: ITree<T>, value: T, compare: Compare<T>) {
    const stack = [tree.root]
    let ret = NULL_NODE
    while (stack.length !== 0) {
        const node = stack.pop()
        if (node) {
            if (node === NULL_NODE) {
                continue
            }
            const compareResult = compare(node.value, value)
            if (compareResult === 0) {
                ret = node
                break
            } else if (compareResult > 0 && node.left !== NULL_NODE) {
                stack.push(node.left)
            } else if (node.right !== NULL_NODE) {
                stack.push(node.right)
            }
        }
    }
    return ret
}

function onLeft<T>(node: ITreeNode<T>) {
    return node === node.parent.left
}

function onRight<T>(node: ITreeNode<T>) {
    return node === node.parent.right
}

function rotateLeft<T>(tree: ITree<T>, x: ITreeNode<T>) {
    if (x.right === NULL_NODE) return
    const y = x.right
    x.right = y.left
    if (y.left !== NULL_NODE) y.left.parent = x
    y.parent = x.parent

    if (x.parent === NULL_NODE) tree.root = y
    else {
        if (onLeft(x)) x.parent.left = y
        else x.parent.right = y
    }

    y.left = x
    x.parent = y
}

function rotateRight<T>(tree: ITree<T>, x: ITreeNode<T>) {
    if (x.left === NULL_NODE) return
    const y = x.left
    x.left = y.right
    if (y.right !== NULL_NODE) y.right.parent = x
    y.parent = x.parent

    if (x.parent === NULL_NODE) tree.root = y
    else {
        if (onRight(x)) x.parent.right = y
        else x.parent.left = y
    }

    y.right = x
    x.parent = y
}

function fixInsert<T>(tree: ITree<T>, z: ITreeNode<T>) {
    let y: ITreeNode<T>
    while (z.parent.color === Color.red) {
        if (onLeft(z.parent)) {
            y = z.parent.parent.right
            if (y.color === Color.red) {
                // filp color
                z.parent.color = Color.black
                y.color = Color.black
                z.parent.parent.color = Color.red
                z = z.parent.parent
            } else {
                if (onRight(z)) {
                    z = z.parent
                    rotateLeft(tree, z)
                }

                z.parent.color = Color.black
                z.parent.parent.color = Color.red
                rotateRight(tree, z.parent.parent)
            }
        } else {
            y = z.parent.parent.left

            if (y.color === Color.red) {
                z.parent.color = Color.black
                y.color = Color.black
                z.parent.parent.color = Color.black
                z = z.parent.parent
            } else {
                if (onLeft(z)) {
                    z = z.parent
                    rotateRight(tree, z)
                }

                z.parent.color = Color.black
                z.parent.parent.color = Color.red
                rotateLeft(tree, z.parent.parent)
            }
        }
    }
    tree.root.color = Color.black
}

function minimumTree<T>(x: ITreeNode<T>) {
    while (x.left !== NULL_NODE) x = x.left
    return x
}

function replaceNode<T>(tree: ITree<T>, x: ITreeNode<T>, y: ITreeNode<T>) {
    if (x.parent === NULL_NODE) tree.root = x
    else if (onLeft(x)) {
        x.parent.left = y
    } else {
        x.parent.right = y
    }
    y.parent = x.parent
}

function fixRomove<T>(tree: ITree<T>, x: ITreeNode<T>) {
    let w
    while (x !== NULL_NODE && x.color === Color.black) {
        if (x === x.parent.left) {
            w = x.parent.right

            if (w.color === Color.red) {
                w.color = Color.black
                x.parent.color = Color.red
                rotateLeft(tree, x.parent)
                w = x.parent.right
            }

            if (w.left.color === Color.black && w.right.color === Color.black) {
                w.color = Color.red
                x = x.parent
            } else {
                if (w.right.color === Color.black) {
                    w.left.color = Color.black
                    w.color = Color.red
                    rotateRight(tree, w)
                    w = x.parent.right
                }

                w.color = x.parent.color
                x.parent.color = Color.black
                w.right.color = Color.black
                rotateLeft(tree, x.parent)
                x = tree.root
            }
        } else {
            w = x.parent.left

            if (w.color === Color.red) {
                w.color = Color.black
                x.parent.color = Color.red
                rotateRight(tree, x.parent)
                w = x.parent.left
            }

            if (w.right.color === Color.black && w.left.color === Color.black) {
                w.color = Color.red
                x = x.parent
            } else {
                if (w.left.color === Color.black) {
                    w.right.color = Color.black
                    w.color = Color.red
                    rotateLeft(tree, w)
                    w = x.parent.left
                }

                w.color = x.parent.color
                x.parent.color = Color.black
                w.left.color = Color.black
                rotateRight(tree, x.parent)
                x = tree.root
            }
        }
    }

    x.color = Color.black
}

// Iterator

function getBinaryTreeIterator<T>(
    tree: ITree<T>,
    traversalOrder: TraversalOrder
): Iterator<T> {
    const stack = [tree.root]
    let nextNode: (current: ITreeNode<T>) => ITreeNode<T> // TODO
    switch (traversalOrder) {
        case TraversalOrder.preOrder:
            nextNode = (current) => {
                return current.left
            }
            break
        case TraversalOrder.inOrder:
            nextNode = (current) => {
                return current.left
            }
            break
        case TraversalOrder.postOrder:
            nextNode = (current) => {
                return current.left
            }
            break
        default:
            nextNode = (current) => {
                return current.left
            }
            break
    }

    return {
        next() {
            const current = stack.pop()
            if (current) {
                // pre-order
                if (current.right !== NULL_NODE) {
                    stack.push(current.right)
                }
                if (current.left !== NULL_NODE) {
                    stack.push(current.left)
                }
            }
            if (stack.length === 0) {
                return {
                    value: current?.value,
                    done: true,
                }
            } else {
                return {
                    value: current!.value,
                    done: false,
                }
            }
        },
    }
}

// Options

type RBTOptions<T> = {
    compare: Compare<T>
    traversalOrder: TraversalOrder
}

function getDefaultOptions<T>(options?: Partial<RBTOptions<T>>): RBTOptions<T> {
    return Object.assign(
        {
            compare: defaultCompare,
            traversalOrder: TraversalOrder.preOrder,
        },
        options
    )
}

// [definition](https://www.cs.auckland.ac.nz/software/AlgAnim/red_black.html)
// [visulization](https://www.cs.usfca.edu/~galles/visualization/RedBlack.html)

export function createRedBlackTree<T>(
    options?: Partial<RBTOptions<T>>
): IRedBlackTree<T> {
    const tree: ITree<T> = {
        root: NULL_NODE,
        count: 0,
    }

    const { compare, traversalOrder } = getDefaultOptions(options)

    return {
        search(value: T) {
            return findNode(tree, value, compare)
        },
        insert(value: T) {
            let x = tree.root
            let y = NULL_NODE

            while (x !== NULL_NODE) {
                y = x
                if (compare(x.value, value) > 0) {
                    x = x.left
                } else {
                    x = x.right
                }
            }

            const z: ITreeNode<T> = {
                parent: y,
                right: NULL_NODE,
                left: NULL_NODE,
                color: Color.red, // red node only need to fix red-red case
                value,
            }

            if (y === NULL_NODE) {
                tree.root = z
            } else {
                if (compare(y.value, z.value) > 0) {
                    y.left = z
                } else {
                    y.right = z
                }
            }

            fixInsert(tree, z)
            tree.count++
        },
        remove(value: T) {
            const z = findNode(tree, value, compare)
            let y = z
            let originalYColor = y.color
            let x: ITreeNode<T>

            if (z.left === NULL_NODE) {
                // supplement node even if right node is NULL_NODE
                x = z.right
                replaceNode(tree, z, z.right)
            } else if (z.right === NULL_NODE) {
                x = z.left
                replaceNode(tree, z, z.left)
            } else {
                y = minimumTree(z.right)
                originalYColor = y.color
                x = y.right

                if (y.parent === z) {
                    x.parent = y
                } else {
                    replaceNode(tree, y, y.right)
                    y.right = z.right
                    y.right.parent = y
                }

                replaceNode(tree, z, y)
                y.left = z.left
                y.left.parent = y
                y.color = z.color
            }

            if (originalYColor === Color.black) {
                fixRomove(tree, x)
            }
            tree.count--
        },
        get count() {
            return tree.count
        },
        [Symbol.iterator]() {
            return getBinaryTreeIterator(tree, traversalOrder)
        },
    }
}
