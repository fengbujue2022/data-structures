import {
    Color,
    createRedBlackTree,
    extendedCreateRedBlackTree,
    TraversalOrder,
} from '../src'

test('insertion', () => {
    // 暂时的测试 捞得不谈（测 就硬测），应该用 遍历二叉树找到连接的节点里黑色节点的数量 比较是否一样（还应该检查是否符合基本二叉树的定义）
    const tree = extendedCreateRedBlackTree<number>({
        traversalOrder: TraversalOrder.preOrder,
    })
    tree.insertFromArray([1, 2, 3, 4, 5])

    const root = tree.first()
    if (root) {
        expect(root.parent.value).toEqual(undefined) // it is expected to be root node
        expect(root.color).toEqual(Color.black)
        expect(root.left.value).toEqual(1)
        expect(root.right.value).toEqual(4)
        expect(root.right.left.value).toEqual(3)
        expect(root.right.left.color).toEqual(Color.red)
        expect(root.right.right.value).toEqual(5)
        expect(root.right.right.color).toEqual(Color.red)
    }
})

test('iteration', () => {
    const tree = extendedCreateRedBlackTree<number>()
    tree.insertFromArray([1, 2, 3, 4, 5])

    const expectedResults = [2, 1, 4, 3, 5].reverse()
    for (const node of tree) {
        expect(node.value).toEqual(expectedResults.pop())
    }
})
