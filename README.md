# data-structures
functional data-structures

# Test
`npm run test` or `press F5 in corresponding test file wtih vscode`

# red-black-tree
### example
```typescript
import { createRedBlackTree, extendedCreateRedBlackTree } from 'data-structures'
// create
const x = createRedBlackTree<number>()

// insert
const tree = extendedCreateRedBlackTree<number>()
tree.insertFromArray([1,2,3,4,5])

const expectedResults = [2, 1, 4, 3, 5].reverse()
for (const node of tree) { // pre-order
    console.log(node.value === expectedResults.pop())// true
}
```

### resources reference
* [definition](https://www.cs.auckland.ac.nz/software/AlgAnim/red_black.html)
* [visulization](https://www.cs.usfca.edu/~galles/visualization/RedBlack.html)

