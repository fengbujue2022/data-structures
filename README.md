# data-structures
functional data-structures

### Test
`npm run test` or `press F5 in corresponding test file wtih vscode`

### red-black-tree
##### example
```typescript
    const tree = createRedBlackTree<number>()
    tree.insert(1)
    tree.insert(2)
    tree.insert(3)
    tree.insert(4)
    tree.insert(5)

    const expectedResultsStack = [2, 1, 4, 3, 5].reverse()
    for (const v of tree) { // pre-order
        console.log(v===expectedResultsStack.pop())// true
    }
```

##### resources reference
* [definition](https://www.cs.auckland.ac.nz/software/AlgAnim/red_black.html)
* [visulization](https://www.cs.usfca.edu/~galles/visualization/RedBlack.html)

