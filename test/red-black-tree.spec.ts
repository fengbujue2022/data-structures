import {
    Color,
    createRedBlackTree,
    extendedCreateRedBlackTree,
    ITreeNode,
    TraversalOrder,
    NULL_NODE,
} from '../src'

const treeConstructArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const traversalOrderMaps = new Map([
    [TraversalOrder.preOrder, [4, 2, 1, 3, 6, 5, 8, 7, 9]],
    [TraversalOrder.inOrder, [1, 2, 3, 4, 5, 6, 7, 8, 9]],
    [TraversalOrder.postOrder, [1, 3, 2, 5, 7, 9, 8, 6, 4]],
])

function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function validateRBTDefinition<T>(root: ITreeNode<T>) {
    const leafNodes = []
    let node = root
    const stack: ITreeNode<T>[] = [node]
    while (stack.length > 0) {
        if (node !== NULL_NODE) {
            if (node.right === NULL_NODE && node.left === NULL_NODE) {
                leafNodes.push(node)
            } else {
                if (node.right !== NULL_NODE) {
                    stack.push(node.right)
                }
                if (node.left !== NULL_NODE) {
                    stack.push(node.left)
                }
            }
        }
        node = stack.pop()!
    }

    let blackNodeNumber: number
    leafNodes.forEach((leafNode) => {
        let n = 0
        while (leafNode !== NULL_NODE) {
            if (leafNode.color === Color.black) {
                n++
            }
            leafNode = leafNode.parent
        }
        if (!blackNodeNumber) {
            blackNodeNumber = n
        } else {
            expect(blackNodeNumber).toEqual(n) // number of black nodes in all paths should be same
        }
    })
}

test('insert', () => {
    const tree = extendedCreateRedBlackTree<number>({
        traversalOrder: TraversalOrder.preOrder,
    })
    const preparedArray = Array(50)
        .fill(0)
        .map((x) => randomIntFromInterval(1, 100))
    tree.insertFromArray(preparedArray)
    expect(tree.count).toEqual(preparedArray.length)
    expect(tree.toArray().length).toEqual(preparedArray.length)
    validateRBTDefinition(tree.first()!)
})

test('remove', () => {
    const tree = extendedCreateRedBlackTree<number>({
        traversalOrder: TraversalOrder.preOrder,
    })
    const preparedArray = Array(50)
        .fill(0)
        .map((x) => randomIntFromInterval(1, 100))
    tree.insertFromArray(preparedArray)
    Array(10)
        .fill(0)
        .map((x) => preparedArray.pop()!)
        .forEach((x) => {
            tree.remove(x)
        })
    expect(tree.count).toEqual(50 - 10)
    validateRBTDefinition(tree.first()!)
})

test('iterate-preOrder', () => {
    const tree = extendedCreateRedBlackTree<number>({
        traversalOrder: TraversalOrder.preOrder,
    })
    tree.insertFromArray(treeConstructArray)

    const expectedResults = traversalOrderMaps
        .get(TraversalOrder.preOrder)!
        .reverse()
    for (const node of tree) {
        expect(node.value).toEqual(expectedResults.pop())
    }
})

test('iterate-inOrder', () => {
    const tree = extendedCreateRedBlackTree<number>({
        traversalOrder: TraversalOrder.inOrder,
    })
    tree.insertFromArray(treeConstructArray)

    const expectedResults = traversalOrderMaps
        .get(TraversalOrder.inOrder)!
        .reverse()
    for (const node of tree) {
        expect(node.value).toEqual(expectedResults.pop())
    }
})

test('iterate-postOrder', () => {
    const tree = extendedCreateRedBlackTree<number>({
        traversalOrder: TraversalOrder.postOrder,
    })
    tree.insertFromArray(treeConstructArray)

    const expectedResults = traversalOrderMaps
        .get(TraversalOrder.postOrder)!
        .reverse()
    for (const node of tree) {
        expect(node.value).toEqual(expectedResults.pop())
    }
})
