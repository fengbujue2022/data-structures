import { Color, createRedBlackTree } from '../src/red-black-tree';

test('insert', () => {
    const tree = createRedBlackTree<number>();
    tree.insert(1)
    tree.insert(2)
    tree.insert(3)
    tree.insert(4)

    const node = tree.search(4);
    expect(node.color).toBe(Color.red) 
});
