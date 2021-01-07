import {
    Color,
    createRedBlackTree,
    extendedCreateRedBlackTree,
    ITreeNode,
    TraversalOrder,
} from '../src'

const treeConstructArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const traversalOrderMaps = new Map([
    [TraversalOrder.preOrder, [4, 2, 1, 3, 6, 5, 8, 7, 9]],
    [TraversalOrder.inOrder, [1, 2, 3, 4, 5, 6, 7, 8, 9]],
    [TraversalOrder.postOrder, [1, 3, 2, 5, 7, 9, 8, 6, 4]],
])

function validateRBTDefinition<T>(root: ITreeNode<T>) {}

test('insert', () => {
    const tree = extendedCreateRedBlackTree<number>({
        traversalOrder: TraversalOrder.preOrder,
    })
    tree.insertFromArray(treeConstructArray)
    expect(tree.count).toEqual(treeConstructArray.length)
    validateRBTDefinition(tree.first()!)
})

test('remove', () => {
    const tree = extendedCreateRedBlackTree<number>({
        traversalOrder: TraversalOrder.preOrder,
    })
    tree.insertFromArray(treeConstructArray)
    tree.remove(9)
    expect(tree.count).toEqual(treeConstructArray.length - 1)
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
