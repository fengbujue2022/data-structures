import {
    Color,
    createRedBlackTree,
    extendedCreateRedBlackTree,
} from '../src/red-black-tree'

test('insertion', () => {
    // 暂时的测试 捞得不谈（测 就硬测），应该用 遍历二叉树找到连接的节点里黑色节点的数量 比较是否一样（还应该检查是否符合基本二叉树的定义）
    const tree = extendedCreateRedBlackTree<number>()
    tree.insertFromArray([1, 2, 3, 4, 5])

    const node = tree.search(2)

    expect(node.parent.value).toEqual(undefined) // it is expected to be root node
    expect(node.color).toEqual(Color.black)
    expect(node.left.value).toEqual(1)
    expect(node.right.value).toEqual(4)
    expect(node.right.left.value).toEqual(3)
    expect(node.right.left.color).toEqual(Color.red)
    expect(node.right.right.value).toEqual(5)
    expect(node.right.right.color).toEqual(Color.red)
})

test('iteration', () => {
    const tree = extendedCreateRedBlackTree<number>()
    tree.insertFromArray([1, 2, 3, 4, 5])

    const expectedResults = [2, 1, 4, 3, 5].reverse()
    for (const value of tree) {
        expect(value).toEqual(expectedResults.pop())
    }
})
