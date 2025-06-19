import React, { useState, useEffect } from 'react';
import { useVisualization } from '../../contexts/VisualizationContext';
import { useTheme } from '../../contexts/ThemeContext';

interface TreeNode {
    value: number;
    left: TreeNode | null;
    right: TreeNode | null;
    isHighlighted?: boolean;
    isNew?: boolean;
    isDeleting?: boolean;
    isTraversing?: boolean;
    isComparing?: boolean;
    isFound?: boolean;
    isSuccessor?: boolean;
    x?: number;
    y?: number;
    level?: number;
}

interface TreeVisualizerProps {
    operation: string;
    speed: number;
    currentStep: number;
    onStepsChange: (steps: number) => void;
}

const TreeVisualizer: React.FC<TreeVisualizerProps> = ({ operation, speed, currentStep, onStepsChange }) => {
    const { size } = useVisualization();
    const { theme } = useTheme();
    const [tree, setTree] = useState<TreeNode | null>(null);
    const [operationSteps, setOperationSteps] = useState<any[]>([]);
    const [traversalOrder, setTraversalOrder] = useState<number[]>([]);

    useEffect(() => {
        const initialTree: TreeNode = {
            value: 50,
            x: 300,
            y: 50,
            level: 0,
            left: {
                value: 30,
                x: 200,
                y: 120,
                level: 1,
                left: { value: 20, x: 150, y: 190, level: 2, left: null, right: null },
                right: { value: 40, x: 250, y: 190, level: 2, left: null, right: null }
            },
            right: {
                value: 70,
                x: 400,
                y: 120,
                level: 1,
                left: { value: 60, x: 350, y: 190, level: 2, left: null, right: null },
                right: { value: 80, x: 450, y: 190, level: 2, left: null, right: null }
            }
        };
        setTree(initialTree);
        generateOperationSteps(initialTree);
    }, [operation]);

    useEffect(() => {
        if (operationSteps[currentStep]) {
            setTree(operationSteps[currentStep].tree);
            setTraversalOrder(operationSteps[currentStep].traversalOrder || []);
        }
    }, [currentStep, operationSteps]);

    const generateOperationSteps = (initialTree: TreeNode) => {
        const steps: any[] = [];
        
        // Initial state
        steps.push({
            tree: JSON.parse(JSON.stringify(initialTree)),
            traversalOrder: [],
            title: 'Initial Binary Search Tree',
            description: 'Starting with a balanced binary search tree. Each node follows the BST property.',
            explanation: 'In a Binary Search Tree (BST), for every node: all values in the left subtree are smaller, and all values in the right subtree are larger.',
            concept: 'BST Property: Left < Root < Right for every node',
            bstProperty: 'This ordering enables efficient search, insertion, and deletion operations.'
        });
        
        switch (operation) {
            case 'tree-insert': {
                const newValue = 45;
                
                // Step 1: Start at root
                const step1 = JSON.parse(JSON.stringify(initialTree));
                step1.isHighlighted = true;
                steps.push({
                    tree: step1,
                    traversalOrder: [],
                    title: 'Step 1: Start at Root',
                    description: `Inserting value ${newValue}. Begin comparison at the root node (${step1.value}).`,
                    explanation: 'Tree insertion always starts at the root. We compare the new value with the current node to decide which direction to go.',
                    concept: 'Tree insertion follows a path from root to leaf',
                    bstProperty: `Since ${newValue} < ${step1.value}, we need to go to the left subtree.`
                });

                // Step 2: Go left
                const step2 = JSON.parse(JSON.stringify(step1));
                step2.isHighlighted = false;
                step2.isComparing = true;
                if (step2.left) {
                    step2.left.isHighlighted = true;
                }
                steps.push({
                    tree: step2,
                    traversalOrder: [],
                    title: 'Step 2: Navigate Left',
                    description: `${newValue} < ${step2.value}, so move to left child (${step2.left?.value}).`,
                    explanation: 'Following the BST property, smaller values go left. We continue the comparison at the left child.',
                    concept: 'BST navigation: smaller values go left, larger values go right',
                    bstProperty: `Now comparing ${newValue} with ${step2.left?.value}. Since ${newValue} > ${step2.left?.value}, we go right.`
                });

                // Step 3: Go right from left child
                const step3 = JSON.parse(JSON.stringify(step2));
                step3.isComparing = false;
                if (step3.left) {
                    step3.left.isHighlighted = false;
                    step3.left.isComparing = true;
                    if (step3.left.right) {
                        step3.left.right.isHighlighted = true;
                    }
                }
                steps.push({
                    tree: step3,
                    traversalOrder: [],
                    title: 'Step 3: Navigate Right',
                    description: `${newValue} > ${step3.left?.value}, so move to right child (${step3.left?.right?.value}).`,
                    explanation: 'Since our value is greater than the current node, we follow the right path according to BST rules.',
                    concept: 'Each comparison eliminates half of the remaining search space',
                    bstProperty: `${newValue} > ${step3.left?.right?.value}, so we need to go right again, but there\'s no right child.`
                });

                // Step 4: Found insertion point
                const step4 = JSON.parse(JSON.stringify(step3));
                if (step4.left?.right) {
                    step4.left.right.isHighlighted = false;
                    step4.left.right.isComparing = false;
                    step4.left.right.isFound = true;
                }
                steps.push({
                    tree: step4,
                    traversalOrder: [],
                    title: 'Step 4: Found Insertion Point',
                    description: `Node ${step4.left?.right?.value} has no right child. This is where we insert ${newValue}.`,
                    explanation: 'We\'ve found a leaf node where our new value should be attached. The new node will become the right child.',
                    concept: 'New nodes are always inserted as leaves in a BST',
                    bstProperty: 'The insertion point maintains the BST property: all ancestors are correctly ordered.'
                });

                // Step 5: Insert new node
                const finalTree = JSON.parse(JSON.stringify(step4));
                if (finalTree.left?.right) {
                    finalTree.left.right.isFound = false;
                    finalTree.left.right.right = {
                        value: newValue,
                        x: 300,
                        y: 260,
                        level: 3,
                        left: null,
                        right: null,
                        isNew: true
                    };
                }
                steps.push({
                    tree: finalTree,
                    traversalOrder: [],
                    title: 'Step 5: Insert New Node',
                    description: `Successfully inserted ${newValue} as the right child of node ${finalTree.left?.right?.value}.`,
                    explanation: 'The new node is added to the tree. All BST properties are maintained, and the tree structure is updated.',
                    concept: 'Insertion preserves BST property and tree balance',
                    bstProperty: `The path to ${newValue}: 50 → 30 → 40 → 45 follows BST ordering rules.`
                });

                // Step 6: Final state
                const finalState = JSON.parse(JSON.stringify(finalTree));
                if (finalState.left?.right?.right) {
                    finalState.left.right.right.isNew = false;
                }
                steps.push({
                    tree: finalState,
                    traversalOrder: [],
                    title: 'Insertion Complete',
                    description: `Node ${newValue} successfully added to the BST. Tree maintains all BST properties.`,
                    explanation: 'Insertion complete! The tree now contains the new value while preserving the binary search tree properties.',
                    concept: 'BST insertion time complexity: O(h) where h is tree height',
                    bstProperty: 'The tree remains a valid BST with efficient search capabilities.'
                });
                break;
            }

            case 'tree-delete': {
                const deleteValue = 30;
                
                // Step 1: Start search for node to delete
                const step1 = JSON.parse(JSON.stringify(initialTree));
                step1.isHighlighted = true;
                steps.push({
                    tree: step1,
                    traversalOrder: [],
                    title: 'Step 1: Locate Node to Delete',
                    description: `Searching for node ${deleteValue} to delete. Starting at root (${step1.value}).`,
                    explanation: 'Deletion first requires finding the node to delete. We use the same search process as insertion.',
                    concept: 'Tree deletion has three cases: leaf, one child, two children',
                    bstProperty: `${deleteValue} < ${step1.value}, so search in the left subtree.`
                });

                // Step 2: Found node to delete
                const step2 = JSON.parse(JSON.stringify(step1));
                step2.isHighlighted = false;
                if (step2.left) {
                    step2.left.isHighlighted = true;
                    step2.left.isFound = true;
                }
                steps.push({
                    tree: step2,
                    traversalOrder: [],
                    title: 'Step 2: Found Target Node',
                    description: `Found node ${deleteValue}. This node has two children - complex deletion case.`,
                    explanation: 'Node 30 has both left and right children. This is the most complex deletion case requiring a replacement strategy.',
                    concept: 'Two-child deletion requires finding inorder successor or predecessor',
                    bstProperty: 'We need to maintain BST property after deletion by finding a suitable replacement.'
                });

                // Step 3: Find inorder successor
                const step3 = JSON.parse(JSON.stringify(step2));
                if (step3.left) {
                    step3.left.isFound = false;
                    step3.left.isDeleting = true;
                    if (step3.left.right) {
                        step3.left.right.isSuccessor = true;
                        step3.left.right.isHighlighted = true;
                    }
                }
                steps.push({
                    tree: step3,
                    traversalOrder: [],
                    title: 'Step 3: Find Inorder Successor',
                    description: `Finding inorder successor of ${deleteValue}. The successor is ${step3.left?.right?.value}.`,
                    explanation: 'The inorder successor is the smallest value in the right subtree. It will replace the deleted node.',
                    concept: 'Inorder successor: leftmost node in right subtree',
                    bstProperty: 'The successor maintains BST ordering when it replaces the deleted node.'
                });

                // Step 4: Replace value
                const step4 = JSON.parse(JSON.stringify(step3));
                if (step4.left && step4.left.right) {
                    step4.left.value = step4.left.right.value; // Replace with successor value
                    step4.left.isDeleting = false;
                    step4.left.isNew = true;
                    step4.left.right.isSuccessor = false;
                    step4.left.right.isHighlighted = false;
                    step4.left.right.isDeleting = true;
                }
                steps.push({
                    tree: step4,
                    traversalOrder: [],
                    title: 'Step 4: Replace with Successor',
                    description: `Replaced node value with successor ${step4.left?.value}. Now delete the successor node.`,
                    explanation: 'The target node now contains the successor\'s value. We must delete the original successor node.',
                    concept: 'Successor replacement preserves BST ordering',
                    bstProperty: 'The replacement value maintains the correct ordering relationship with all other nodes.'
                });

                // Step 5: Delete successor node
                const finalTree = JSON.parse(JSON.stringify(step4));
                if (finalTree.left) {
                    finalTree.left.isNew = false;
                    finalTree.left.right = null; // Remove successor node
                }
                steps.push({
                    tree: finalTree,
                    traversalOrder: [],
                    title: 'Step 5: Remove Successor Node',
                    description: `Removed the successor node. Deletion complete.`,
                    explanation: 'The successor node (which was a leaf) is removed. The tree maintains its BST properties.',
                    concept: 'Successor deletion is simpler since it has at most one child',
                    bstProperty: 'Tree structure is updated while preserving all BST invariants.'
                });

                // Step 6: Final state
                steps.push({
                    tree: JSON.parse(JSON.stringify(finalTree)),
                    traversalOrder: [],
                    title: 'Deletion Complete',
                    description: `Node ${deleteValue} successfully deleted. BST properties maintained.`,
                    explanation: 'Deletion complete! The tree no longer contains the target value but remains a valid BST.',
                    concept: 'BST deletion time complexity: O(h) where h is tree height',
                    bstProperty: 'All remaining nodes maintain proper BST ordering relationships.'
                });
                break;
            }

            case 'tree-search': {
                const searchValue = 60;
                
                // Step 1: Start at root
                const step1 = JSON.parse(JSON.stringify(initialTree));
                step1.isHighlighted = true;
                step1.isComparing = true;
                steps.push({
                    tree: step1,
                    traversalOrder: [],
                    title: 'Step 1: Start Search at Root',
                    description: `Searching for value ${searchValue}. Compare with root node (${step1.value}).`,
                    explanation: 'Tree search leverages the BST property to efficiently navigate to the target value.',
                    concept: 'BST search eliminates half the tree at each step',
                    bstProperty: `${searchValue} > ${step1.value}, so search in the right subtree.`
                });

                // Step 2: Go right
                const step2 = JSON.parse(JSON.stringify(step1));
                step2.isHighlighted = false;
                step2.isComparing = false;
                if (step2.right) {
                    step2.right.isHighlighted = true;
                    step2.right.isComparing = true;
                }
                steps.push({
                    tree: step2,
                    traversalOrder: [],
                    title: 'Step 2: Navigate Right',
                    description: `${searchValue} > ${step2.value}, move to right child (${step2.right?.value}).`,
                    explanation: 'Following BST property, we move right since our target is larger than the current node.',
                    concept: 'Each comparison eliminates nodes that cannot contain the target',
                    bstProperty: `Now comparing ${searchValue} with ${step2.right?.value}. Since ${searchValue} < ${step2.right?.value}, go left.`
                });

                // Step 3: Go left from right child
                const step3 = JSON.parse(JSON.stringify(step2));
                if (step3.right) {
                    step3.right.isHighlighted = false;
                    step3.right.isComparing = false;
                    if (step3.right.left) {
                        step3.right.left.isHighlighted = true;
                        step3.right.left.isComparing = true;
                    }
                }
                steps.push({
                    tree: step3,
                    traversalOrder: [],
                    title: 'Step 3: Navigate Left',
                    description: `${searchValue} < ${step3.right?.value}, move to left child (${step3.right?.left?.value}).`,
                    explanation: 'The target is smaller than current node, so we follow the left path according to BST rules.',
                    concept: 'BST search path is determined by value comparisons',
                    bstProperty: `${searchValue} = ${step3.right?.left?.value}. Target found!`
                });

                // Step 4: Found target
                const finalTree = JSON.parse(JSON.stringify(step3));
                if (finalTree.right?.left) {
                    finalTree.right.left.isHighlighted = false;
                    finalTree.right.left.isComparing = false;
                    finalTree.right.left.isFound = true;
                }
                steps.push({
                    tree: finalTree,
                    traversalOrder: [],
                    title: 'Step 4: Target Found!',
                    description: `Successfully found value ${searchValue} in the tree.`,
                    explanation: 'Search complete! The target value has been located using the efficient BST search algorithm.',
                    concept: 'BST search is much faster than linear search',
                    bstProperty: `Search path: ${initialTree.value} → ${initialTree.right?.value} → ${searchValue} (3 comparisons instead of scanning all nodes).`
                });

                // Step 5: Final state
                steps.push({
                    tree: JSON.parse(JSON.stringify(finalTree)),
                    traversalOrder: [],
                    title: 'Search Complete',
                    description: `Search operation finished. Value ${searchValue} found efficiently.`,
                    explanation: 'BST search completed in logarithmic time by following the tree structure rather than checking every node.',
                    concept: 'BST search time complexity: O(log n) for balanced trees',
                    bstProperty: 'The BST property enabled us to eliminate large portions of the tree at each step.'
                });
                break;
            }

            case 'tree-traverse-inorder': {
                const traversalSteps = [];
                const order: number[] = [];
                
                // Helper function for inorder traversal
                const inorderTraversal = (node: TreeNode | null, tree: TreeNode, stepTitle: string): void => {
                    if (!node) return;
                    
                    // Visit left subtree
                    if (node.left) {
                        const leftStep = JSON.parse(JSON.stringify(tree));
                        markNodeAsTraversing(leftStep, node.left.value);
                        traversalSteps.push({
                            tree: leftStep,
                            traversalOrder: [...order],
                            title: `${stepTitle}: Visit Left Subtree`,
                            description: `Traversing to left child (${node.left.value}) of node ${node.value}.`,
                            explanation: 'Inorder traversal visits left subtree first, ensuring smaller values are processed before the current node.',
                            concept: 'Inorder: Left → Root → Right produces sorted output',
                            bstProperty: 'Left subtree contains all values smaller than current node.'
                        });
                        inorderTraversal(node.left, tree, `Step ${traversalSteps.length + 1}`);
                    }
                    
                    // Visit root
                    const rootStep = JSON.parse(JSON.stringify(tree));
                    markNodeAsTraversing(rootStep, node.value);
                    order.push(node.value);
                    traversalSteps.push({
                        tree: rootStep,
                        traversalOrder: [...order],
                        title: `${stepTitle}: Process Node ${node.value}`,
                        description: `Processing current node (${node.value}). Added to traversal order.`,
                        explanation: 'After visiting left subtree, we process the current node. This maintains sorted order in BST.',
                        concept: 'Processing nodes in inorder gives sorted sequence',
                        bstProperty: `Node ${node.value} is processed after all smaller values in left subtree.`
                    });
                    
                    // Visit right subtree
                    if (node.right) {
                        const rightStep = JSON.parse(JSON.stringify(tree));
                        markNodeAsTraversing(rightStep, node.right.value);
                        traversalSteps.push({
                            tree: rightStep,
                            traversalOrder: [...order],
                            title: `${stepTitle}: Visit Right Subtree`,
                            description: `Traversing to right child (${node.right.value}) of node ${node.value}.`,
                            explanation: 'Finally, visit right subtree to process all values larger than current node.',
                            concept: 'Right subtree processing completes the inorder pattern',
                            bstProperty: 'Right subtree contains all values larger than current node.'
                        });
                        inorderTraversal(node.right, tree, `Step ${traversalSteps.length + 1}`);
                    }
                };

                // Helper function to mark node as traversing
                const markNodeAsTraversing = (tree: TreeNode, value: number): void => {
                    const stack = [tree];
                    while (stack.length > 0) {
                        const current = stack.pop()!;
                        if (current.value === value) {
                            current.isTraversing = true;
                            break;
                        }
                        if (current.left) stack.push(current.left);
                        if (current.right) stack.push(current.right);
                    }
                };

                // Start traversal
                steps.push({
                    tree: JSON.parse(JSON.stringify(initialTree)),
                    traversalOrder: [],
                    title: 'Inorder Traversal Start',
                    description: 'Beginning inorder traversal: Left → Root → Right for each subtree.',
                    explanation: 'Inorder traversal visits nodes in a specific order that produces sorted output for BSTs.',
                    concept: 'Inorder traversal of BST yields values in ascending order',
                    bstProperty: 'The recursive pattern ensures all smaller values are visited before larger ones.'
                });

                inorderTraversal(initialTree, initialTree, 'Step 2');
                steps.push(...traversalSteps);

                // Final result
                steps.push({
                    tree: JSON.parse(JSON.stringify(initialTree)),
                    traversalOrder: order,
                    title: 'Inorder Traversal Complete',
                    description: `Traversal finished. Order: [${order.join(', ')}]`,
                    explanation: 'Inorder traversal complete! Notice how the values are in sorted ascending order.',
                    concept: 'Inorder traversal is the key to many BST algorithms',
                    bstProperty: 'The sorted output demonstrates the power of BST structure for ordered data processing.'
                });
                break;
            }

            case 'tree-traverse-preorder': {
                const traversalSteps = [];
                const order: number[] = [];
                
                const preorderTraversal = (node: TreeNode | null, tree: TreeNode, stepTitle: string): void => {
                    if (!node) return;
                    
                    // Visit root first
                    const rootStep = JSON.parse(JSON.stringify(tree));
                    markNodeAsTraversing(rootStep, node.value);
                    order.push(node.value);
                    traversalSteps.push({
                        tree: rootStep,
                        traversalOrder: [...order],
                        title: `${stepTitle}: Process Node ${node.value}`,
                        description: `Processing current node (${node.value}) first in preorder.`,
                        explanation: 'Preorder processes the current node before visiting its children. Useful for tree copying and expression evaluation.',
                        concept: 'Preorder: Root → Left → Right processes parent before children',
                        bstProperty: 'Processing root first is useful for tree serialization and prefix expressions.'
                    });
                    
                    // Visit left subtree
                    if (node.left) {
                        const leftStep = JSON.parse(JSON.stringify(tree));
                        markNodeAsTraversing(leftStep, node.left.value);
                        traversalSteps.push({
                            tree: leftStep,
                            traversalOrder: [...order],
                            title: `${stepTitle}: Visit Left Subtree`,
                            description: `Moving to left child (${node.left.value}) after processing ${node.value}.`,
                            explanation: 'After processing current node, visit left subtree completely before moving to right.',
                            concept: 'Left subtree is fully processed before right subtree',
                            bstProperty: 'Systematic traversal ensures no nodes are missed.'
                        });
                        preorderTraversal(node.left, tree, `Step ${traversalSteps.length + 1}`);
                    }
                    
                    // Visit right subtree
                    if (node.right) {
                        const rightStep = JSON.parse(JSON.stringify(tree));
                        markNodeAsTraversing(rightStep, node.right.value);
                        traversalSteps.push({
                            tree: rightStep,
                            traversalOrder: [...order],
                            title: `${stepTitle}: Visit Right Subtree`,
                            description: `Moving to right child (${node.right.value}) after left subtree completion.`,
                            explanation: 'Finally, process right subtree after current node and left subtree are complete.',
                            concept: 'Right subtree is processed last in preorder pattern',
                            bstProperty: 'Complete traversal ensures all nodes are visited exactly once.'
                        });
                        preorderTraversal(node.right, tree, `Step ${traversalSteps.length + 1}`);
                    }
                };

                const markNodeAsTraversing = (tree: TreeNode, value: number): void => {
                    const stack = [tree];
                    while (stack.length > 0) {
                        const current = stack.pop()!;
                        if (current.value === value) {
                            current.isTraversing = true;
                            break;
                        }
                        if (current.left) stack.push(current.left);
                        if (current.right) stack.push(current.right);
                    }
                };

                steps.push({
                    tree: JSON.parse(JSON.stringify(initialTree)),
                    traversalOrder: [],
                    title: 'Preorder Traversal Start',
                    description: 'Beginning preorder traversal: Root → Left → Right for each subtree.',
                    explanation: 'Preorder traversal processes each node before visiting its children, useful for tree copying and evaluation.',
                    concept: 'Preorder is ideal for creating tree copies and prefix expressions',
                    bstProperty: 'Processing nodes before children enables top-down tree operations.'
                });

                preorderTraversal(initialTree, initialTree, 'Step 2');
                steps.push(...traversalSteps);

                steps.push({
                    tree: JSON.parse(JSON.stringify(initialTree)),
                    traversalOrder: order,
                    title: 'Preorder Traversal Complete',
                    description: `Traversal finished. Order: [${order.join(', ')}]`,
                    explanation: 'Preorder traversal complete! This order is useful for reconstructing the tree structure.',
                    concept: 'Preorder output can be used to rebuild the original tree',
                    bstProperty: 'The root-first ordering preserves hierarchical relationships.'
                });
                break;
            }

            case 'tree-traverse-postorder': {
                const traversalSteps = [];
                const order: number[] = [];
                
                const postorderTraversal = (node: TreeNode | null, tree: TreeNode, stepTitle: string): void => {
                    if (!node) return;
                    
                    // Visit left subtree first
                    if (node.left) {
                        const leftStep = JSON.parse(JSON.stringify(tree));
                        markNodeAsTraversing(leftStep, node.left.value);
                        traversalSteps.push({
                            tree: leftStep,
                            traversalOrder: [...order],
                            title: `${stepTitle}: Visit Left Subtree`,
                            description: `Visiting left child (${node.left.value}) before processing ${node.value}.`,
                            explanation: 'Postorder visits children before parent. Left subtree is processed completely first.',
                            concept: 'Postorder: Left → Right → Root processes children before parent',
                            bstProperty: 'Children are processed before their parent in postorder traversal.'
                        });
                        postorderTraversal(node.left, tree, `Step ${traversalSteps.length + 1}`);
                    }
                    
                    // Visit right subtree
                    if (node.right) {
                        const rightStep = JSON.parse(JSON.stringify(tree));
                        markNodeAsTraversing(rightStep, node.right.value);
                        traversalSteps.push({
                            tree: rightStep,
                            traversalOrder: [...order],
                            title: `${stepTitle}: Visit Right Subtree`,
                            description: `Visiting right child (${node.right.value}) before processing ${node.value}.`,
                            explanation: 'After left subtree, process right subtree completely before handling current node.',
                            concept: 'Both children must be processed before their parent',
                            bstProperty: 'Right subtree processing completes before parent node.'
                        });
                        postorderTraversal(node.right, tree, `Step ${traversalSteps.length + 1}`);
                    }
                    
                    // Visit root last
                    const rootStep = JSON.parse(JSON.stringify(tree));
                    markNodeAsTraversing(rootStep, node.value);
                    order.push(node.value);
                    traversalSteps.push({
                        tree: rootStep,
                        traversalOrder: [...order],
                        title: `${stepTitle}: Process Node ${node.value}`,
                        description: `Processing node (${node.value}) after both children are complete.`,
                        explanation: 'Finally process current node after both children are handled. Useful for tree deletion and cleanup.',
                        concept: 'Postorder is perfect for safe tree deletion and resource cleanup',
                        bstProperty: 'Parent processing after children ensures safe memory management.'
                    });
                };

                const markNodeAsTraversing = (tree: TreeNode, value: number): void => {
                    const stack = [tree];
                    while (stack.length > 0) {
                        const current = stack.pop()!;
                        if (current.value === value) {
                            current.isTraversing = true;
                            break;
                        }
                        if (current.left) stack.push(current.left);
                        if (current.right) stack.push(current.right);
                    }
                };

                steps.push({
                    tree: JSON.parse(JSON.stringify(initialTree)),
                    traversalOrder: [],
                    title: 'Postorder Traversal Start',
                    description: 'Beginning postorder traversal: Left → Right → Root for each subtree.',
                    explanation: 'Postorder traversal processes children before parents, ideal for tree deletion and cleanup operations.',
                    concept: 'Postorder ensures children are handled before their parents',
                    bstProperty: 'Bottom-up processing is essential for safe tree operations.'
                });

                postorderTraversal(initialTree, initialTree, 'Step 2');
                steps.push(...traversalSteps);

                steps.push({
                    tree: JSON.parse(JSON.stringify(initialTree)),
                    traversalOrder: order,
                    title: 'Postorder Traversal Complete',
                    description: `Traversal finished. Order: [${order.join(', ')}]`,
                    explanation: 'Postorder traversal complete! This order is perfect for safely deleting tree nodes.',
                    concept: 'Postorder is essential for tree destruction and expression evaluation',
                    bstProperty: 'Children-first ordering prevents accessing deleted parent nodes.'
                });
                break;
            }
        }
        
        setOperationSteps(steps);
        onStepsChange(steps.length);
    };

    const renderConnections = (node: TreeNode, parentX?: number, parentY?: number) => {
        const connections = [];
        
        if (parentX !== undefined && parentY !== undefined && node.x && node.y) {
            connections.push(
                <line
                    key={`line-${node.value}`}
                    x1={parentX}
                    y1={parentY + 20}
                    x2={node.x}
                    y2={node.y + 20}
                    stroke={theme === 'dark' ? '#6B7280' : '#9CA3AF'}
                    strokeWidth="2"
                />
            );
        }

        if (node.left) {
            connections.push(...renderConnections(node.left, node.x, node.y));
        }
        if (node.right) {
            connections.push(...renderConnections(node.right, node.x, node.y));
        }

        return connections;
    };

    const renderNodes = (node: TreeNode): JSX.Element[] => {
        const nodes = [];

        if (node.x && node.y) {
            nodes.push(
                <g key={`node-${node.value}`}>
                    <circle
                        cx={node.x}
                        cy={node.y + 20}
                        r="25"
                        fill={
                            node.isNew ? '#3B82F6' :
                            node.isDeleting ? '#EF4444' :
                            node.isHighlighted ? '#F59E0B' :
                            node.isTraversing ? '#8B5CF6' :
                            node.isComparing ? '#EC4899' :
                            node.isFound ? '#10B981' :
                            node.isSuccessor ? '#F97316' :
                            theme === 'dark' ? '#374151' : '#F3F4F6'
                        }
                        stroke={theme === 'dark' ? '#6B7280' : '#9CA3AF'}
                        strokeWidth="2"
                        className="transition-all duration-500"
                    />
                    
                    <text
                        x={node.x}
                        y={node.y + 25}
                        textAnchor="middle"
                        className={`text-sm font-bold transition-all duration-500 ${
                            node.isNew || node.isDeleting || node.isHighlighted || node.isTraversing || node.isComparing || node.isFound || node.isSuccessor ? 'fill-white' :
                            theme === 'dark' ? 'fill-white' : 'fill-gray-900'
                        }`}
                    >
                        {node.value}
                    </text>
                </g>
            );
        }

        if (node.left) {
            nodes.push(...renderNodes(node.left));
        }
        if (node.right) {
            nodes.push(...renderNodes(node.right));
        }

        return nodes;
    };

    const currentStepData = operationSteps[currentStep] || {};

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-8">
            {/* Operation Title */}
            <h3 className="text-2xl font-bold mb-4 text-center">
                {operation === 'tree-insert' && 'Binary Search Tree Insertion'}
                {operation === 'tree-delete' && 'Binary Search Tree Deletion'}
                {operation === 'tree-search' && 'Binary Search Tree Search'}
                {operation === 'tree-traverse-inorder' && 'Inorder Tree Traversal'}
                {operation === 'tree-traverse-preorder' && 'Preorder Tree Traversal'}
                {operation === 'tree-traverse-postorder' && 'Postorder Tree Traversal'}
            </h3>

            {/* Current Step Info */}
            <div className={`
                mb-6 p-4 rounded-lg text-center max-w-4xl
                ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}
            `}>
                <h4 className="text-lg font-semibold mb-2">{currentStepData.title}</h4>
                <p className="text-sm mb-2">{currentStepData.description}</p>
                <p className={`text-xs mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {currentStepData.explanation}
                </p>
                {currentStepData.concept && (
                    <div className={`
                        mt-3 p-2 rounded text-xs font-medium
                        ${theme === 'dark' ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-800'}
                    `}>
                        💡 Key Concept: {currentStepData.concept}
                    </div>
                )}
                {currentStepData.bstProperty && (
                    <div className={`
                        mt-2 p-2 rounded text-xs font-medium
                        ${theme === 'dark' ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-100 text-purple-800'}
                    `}>
                        🌳 BST Property: {currentStepData.bstProperty}
                    </div>
                )}
            </div>

            {/* Traversal Order Display */}
            {traversalOrder.length > 0 && (
                <div className={`
                    mb-4 p-3 rounded-lg text-center
                    ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}
                `}>
                    <div className="text-sm font-semibold mb-1">Traversal Order:</div>
                    <div className="text-lg font-mono">
                        [{traversalOrder.join(', ')}]
                    </div>
                </div>
            )}

            {/* Tree visualization */}
            <div className="flex-1 w-full overflow-auto mb-6">
                <div 
                    className="min-w-[600px] min-h-[350px] relative"
                    style={{ transform: `scale(${size})`, transformOrigin: 'center' }}
                >
                    <svg width="600" height="350" className="w-full h-full">
                        {tree && renderConnections(tree)}
                        {tree && renderNodes(tree)}
                    </svg>
                </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4 text-xs mb-4">
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                    <span>Highlighted</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                    <span>Traversing</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-pink-500"></div>
                    <span>Comparing</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    <span>Found/Target</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    <span>New Node</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                    <span>Successor</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-red-500"></div>
                    <span>Deleting</span>
                </div>
            </div>

            {/* BST Properties Panel */}
            <div className={`
                p-4 rounded-lg max-w-4xl
                ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}
            `}>
                <h4 className="text-lg font-semibold mb-3 text-center">Binary Search Tree Properties</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                        <h5 className="font-bold mb-2">Structure</h5>
                        <ul className="space-y-1 text-xs">
                            <li>• Each node has at most 2 children</li>
                            <li>• Left child < Parent < Right child</li>
                            <li>• Recursive structure applies to all subtrees</li>
                            <li>• No duplicate values allowed</li>
                        </ul>
                    </div>
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-green-900/30' : 'bg-green-100'}`}>
                        <h5 className="font-bold mb-2">Operations</h5>
                        <ul className="space-y-1 text-xs">
                            <li>• <strong>Search:</strong> O(h) - Follow path to target</li>
                            <li>• <strong>Insert:</strong> O(h) - Find position and add</li>
                            <li>• <strong>Delete:</strong> O(h) - Complex with 3 cases</li>
                            <li>• <strong>Traverse:</strong> O(n) - Visit all nodes</li>
                        </ul>
                    </div>
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
                        <h5 className="font-bold mb-2">Advantages</h5>
                        <ul className="space-y-1 text-xs">
                            <li>• Efficient search compared to arrays</li>
                            <li>• Dynamic size (grows/shrinks)</li>
                            <li>• Inorder gives sorted sequence</li>
                            <li>• Good for range queries</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-3 text-center text-xs text-gray-500">
                    h = height of tree | Balanced tree: h = O(log n) | Worst case: h = O(n)
                </div>
            </div>

            {/* Progress indicator */}
            <div className="mt-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Step {currentStep + 1} of {operationSteps.length}
                </p>
            </div>
        </div>
    );
};

export default TreeVisualizer;