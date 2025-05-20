import java.util.ArrayList;
import java.util.List;

public class AlgorithmVisualizer {
    // Algorithm descriptions and code samples
    public static class Algorithm {
        private String title;
        private String description;
        private String timeComplexity;
        private String spaceComplexity;
        private String type;
        private String code;
        private List<Step> steps;

        public Algorithm(String title, String description, String timeComplexity, 
                        String spaceComplexity, String type, String code, List<Step> steps) {
            this.title = title;
            this.description = description;
            this.timeComplexity = timeComplexity;
            this.spaceComplexity = spaceComplexity;
            this.type = type;
            this.code = code;
            this.steps = steps;
        }

        // Getters
        public String getTitle() { return title; }
        public String getDescription() { return description; }
        public String getTimeComplexity() { return timeComplexity; }
        public String getSpaceComplexity() { return spaceComplexity; }
        public String getType() { return type; }
        public String getCode() { return code; }
        public List<Step> getSteps() { return steps; }
    }

    public static class Step {
        private String title;
        private String description;

        public Step(String title, String description) {
            this.title = title;
            this.description = description;
        }

        // Getters
        public String getTitle() { return title; }
        public String getDescription() { return description; }
    }

    // Array Operations
    public static class ArrayOperations {
        public static Algorithm ARRAY_INSERT = new Algorithm(
            "Array Insertion",
            "Insert a new element into an array at a specific index, shifting existing elements to make space.",
            "O(n)",
            "O(1)",
            "array",
            """
            public static int[] insertAt(int[] arr, int index, int element) {
                if (index < 0 || index > arr.length) {
                    throw new IndexOutOfBoundsException("Index out of bounds");
                }
                
                int[] newArr = new int[arr.length + 1];
                
                // Copy elements before the insertion point
                for (int i = 0; i < index; i++) {
                    newArr[i] = arr[i];
                }
                
                // Insert the new element
                newArr[index] = element;
                
                // Copy elements after the insertion point
                for (int i = index; i < arr.length; i++) {
                    newArr[i + 1] = arr[i];
                }
                
                return newArr;
            }
            """,
            List.of(
                new Step("Select Insert Position", "Identify the position where the new element will be inserted."),
                new Step("Insert Element", "Create space and insert the new element at the specified position."),
                new Step("Complete Operation", "The new element is now in place and the array is ready for more operations.")
            )
        );

        public static Algorithm ARRAY_DELETE = new Algorithm(
            "Array Deletion",
            "Remove an element from a specific index in the array, shifting remaining elements to fill the gap.",
            "O(n)",
            "O(1)",
            "array",
            """
            public static int[] deleteAt(int[] arr, int index) {
                if (index < 0 || index >= arr.length) {
                    throw new IndexOutOfBoundsException("Index out of bounds");
                }
                
                int[] newArr = new int[arr.length - 1];
                
                // Copy elements before the deletion point
                for (int i = 0; i < index; i++) {
                    newArr[i] = arr[i];
                }
                
                // Copy elements after the deletion point
                for (int i = index + 1; i < arr.length; i++) {
                    newArr[i - 1] = arr[i];
                }
                
                return newArr;
            }
            """,
            List.of(
                new Step("Select Element", "Identify the element to be removed from the array."),
                new Step("Remove Element", "Remove the selected element and shift remaining elements."),
                new Step("Complete Operation", "The element has been removed and the array is reindexed.")
            )
        );

        public static Algorithm ARRAY_SEARCH = new Algorithm(
            "Array Search",
            "Search for a specific value in the array using sequential search.",
            "O(n)",
            "O(1)",
            "array",
            """
            public static int search(int[] arr, int target) {
                for (int i = 0; i < arr.length; i++) {
                    if (arr[i] == target) {
                        return i; // Found at index i
                    }
                }
                return -1; // Not found
            }
            """,
            List.of(
                new Step("Start Search", "Begin searching from the first element of the array."),
                new Step("Check Elements", "Compare each element with the target value."),
                new Step("Complete Search", "Element found or reached the end of the array.")
            )
        );

        public static Algorithm ARRAY_UPDATE = new Algorithm(
            "Array Update",
            "Update the value of an element at a specific index in the array.",
            "O(1)",
            "O(1)",
            "array",
            """
            public static boolean update(int[] arr, int index, int newValue) {
                if (index < 0 || index >= arr.length) {
                    return false;
                }
                arr[index] = newValue;
                return true;
            }
            """,
            List.of(
                new Step("Select Element", "Identify the element to be updated."),
                new Step("Update Value", "Replace the old value with the new value."),
                new Step("Complete Update", "The element has been updated successfully.")
            )
        );
    }

    // Linked List Operations
    public static class LinkedListOperations {
        public static Algorithm LINKEDLIST_INSERT = new Algorithm(
            "Linked List Insertion",
            "Insert a new node into a linked list at a specific position.",
            "O(n)",
            "O(1)",
            "linkedlist",
            """
            public static Node insertNode(Node head, int value, int position) {
                Node newNode = new Node(value);

                // Insert at beginning
                if (position == 0) {
                    newNode.next = head;
                    return newNode;
                }

                // Traverse to insertion point
                Node current = head;
                for (int i = 0; i < position - 1 && current != null; i++) {
                    current = current.next;
                }

                if (current != null) {
                    newNode.next = current.next;
                    current.next = newNode;
                }

                return head;
            }
            """,
            List.of(
                new Step("Create New Node", "Create a new node with the given value."),
                new Step("Find Insert Position", "Traverse the list to find the insertion point."),
                new Step("Update Pointers", "Update the next pointers to insert the new node."),
                new Step("Complete Operation", "The new node is now part of the linked list.")
            )
        );

        public static Algorithm LINKEDLIST_DELETE = new Algorithm(
            "Linked List Deletion",
            "Remove a node from a linked list at a specific position.",
            "O(n)",
            "O(1)",
            "linkedlist",
            """
            public static Node deleteNode(Node head, int position) {
                if (head == null) {
                    return null;
                }

                // Delete first node
                if (position == 0) {
                    return head.next;
                }

                // Traverse to node before deletion point
                Node current = head;
                for (int i = 0; i < position - 1 && current.next != null; i++) {
                    current = current.next;
                }

                // Delete node
                if (current.next != null) {
                    current.next = current.next.next;
                }

                return head;
            }
            """,
            List.of(
                new Step("Find Delete Position", "Traverse to the node before the deletion point."),
                new Step("Update Pointers", "Update the next pointer to skip the deleted node."),
                new Step("Complete Operation", "The node has been removed from the linked list.")
            )
        );

        public static Algorithm LINKEDLIST_SEARCH = new Algorithm(
            "Linked List Search",
            "Search for a value in a linked list.",
            "O(n)",
            "O(1)",
            "linkedlist",
            """
            public static int searchNode(Node head, int value) {
                Node current = head;
                int position = 0;

                while (current != null) {
                    if (current.value == value) {
                        return position;
                    }
                    current = current.next;
                    position++;
                }

                return -1; // Not found
            }
            """,
            List.of(
                new Step("Start Search", "Begin at the head of the linked list."),
                new Step("Traverse List", "Move through the list one node at a time."),
                new Step("Check Values", "Compare each node's value with the target."),
                new Step("Complete Search", "Return the position if found, or -1 if not found.")
            )
        );

        public static Algorithm LINKEDLIST_UPDATE = new Algorithm(
            "Linked List Update",
            "Update the value of a node at a specific position.",
            "O(n)",
            "O(1)",
            "linkedlist",
            """
            public static boolean updateNode(Node head, int position, int newValue) {
                Node current = head;

                // Traverse to the node
                for (int i = 0; i < position && current != null; i++) {
                    current = current.next;
                }

                // Update value if node exists
                if (current != null) {
                    current.value = newValue;
                    return true;
                }

                return false;
            }
            """,
            List.of(
                new Step("Find Node", "Traverse to the node at the specified position."),
                new Step("Update Value", "Change the node's value to the new value."),
                new Step("Complete Operation", "The node's value has been updated.")
            )
        );
    }

    // Tree Operations
    public static class TreeOperations {
        // Node class for binary tree
        public static class TreeNode {
            int value;
            TreeNode left;
            TreeNode right;

            public TreeNode(int value) {
                this.value = value;
                this.left = null;
                this.right = null;
            }
        }

        public static Algorithm TREE_INSERT = new Algorithm(
            "Binary Tree Insertion",
            "Insert a new node into a binary search tree while maintaining the BST property.",
            "O(h) where h is height",
            "O(1)",
            "tree",
            """
            public static TreeNode insert(TreeNode root, int value) {
                // If tree is empty, create new node
                if (root == null) {
                    return new TreeNode(value);
                }

                // Otherwise, recur down the tree
                if (value < root.value) {
                    root.left = insert(root.left, value);
                } else if (value > root.value) {
                    root.right = insert(root.right, value);
                }

                // Return the unchanged node pointer
                return root;
            }
            """,
            List.of(
                new Step("Check Empty Tree", "If tree is empty, create new root node."),
                new Step("Compare Values", "Compare new value with current node."),
                new Step("Recursive Insert", "Recursively insert into left or right subtree."),
                new Step("Complete Operation", "Return the updated tree structure.")
            )
        );

        public static Algorithm TREE_DELETE = new Algorithm(
            "Binary Tree Deletion",
            "Delete a node from a binary search tree while maintaining the BST property.",
            "O(h) where h is height",
            "O(1)",
            "tree",
            """
            public static TreeNode delete(TreeNode root, int value) {
                if (root == null) {
                    return null;
                }

                // Find the node to delete
                if (value < root.value) {
                    root.left = delete(root.left, value);
                } else if (value > root.value) {
                    root.right = delete(root.right, value);
                } else {
                    // Node with only one child or no child
                    if (root.left == null) {
                        return root.right;
                    } else if (root.right == null) {
                        return root.left;
                    }

                    // Node with two children: Get the inorder successor
                    root.value = minValue(root.right);
                    root.right = delete(root.right, root.value);
                }
                return root;
            }

            private static int minValue(TreeNode root) {
                int minv = root.value;
                while (root.left != null) {
                    minv = root.left.value;
                    root = root.left;
                }
                return minv;
            }
            """,
            List.of(
                new Step("Find Node", "Locate the node to be deleted."),
                new Step("Handle Leaf Node", "If node has no children, simply remove it."),
                new Step("Handle Single Child", "If node has one child, replace with child."),
                new Step("Handle Two Children", "If node has two children, find inorder successor."),
                new Step("Complete Operation", "Return the updated tree structure.")
            )
        );

        public static Algorithm TREE_SEARCH = new Algorithm(
            "Binary Tree Search",
            "Search for a value in a binary search tree.",
            "O(h) where h is height",
            "O(1)",
            "tree",
            """
            public static TreeNode search(TreeNode root, int value) {
                // Base Cases: root is null or value is present at root
                if (root == null || root.value == value) {
                    return root;
                }

                // Value is greater than root's value
                if (root.value < value) {
                    return search(root.right, value);
                }

                // Value is smaller than root's value
                return search(root.left, value);
            }
            """,
            List.of(
                new Step("Check Root", "Check if root is null or contains target value."),
                new Step("Compare Values", "Compare target with current node value."),
                new Step("Recursive Search", "Search in appropriate subtree."),
                new Step("Complete Search", "Return found node or null.")
            )
        );

        public static Algorithm TREE_TRAVERSAL = new Algorithm(
            "Binary Tree Traversal",
            "Traverse a binary tree using different methods (inorder, preorder, postorder).",
            "O(n)",
            "O(h) where h is height",
            "tree",
            """
            // Inorder Traversal (Left -> Root -> Right)
            public static void inorderTraversal(TreeNode root) {
                if (root != null) {
                    inorderTraversal(root.left);
                    System.out.print(root.value + " ");
                    inorderTraversal(root.right);
                }
            }

            // Preorder Traversal (Root -> Left -> Right)
            public static void preorderTraversal(TreeNode root) {
                if (root != null) {
                    System.out.print(root.value + " ");
                    preorderTraversal(root.left);
                    preorderTraversal(root.right);
                }
            }

            // Postorder Traversal (Left -> Right -> Root)
            public static void postorderTraversal(TreeNode root) {
                if (root != null) {
                    postorderTraversal(root.left);
                    postorderTraversal(root.right);
                    System.out.print(root.value + " ");
                }
            }
            """,
            List.of(
                new Step("Inorder Traversal", "Visit left subtree, then root, then right subtree."),
                new Step("Preorder Traversal", "Visit root, then left subtree, then right subtree."),
                new Step("Postorder Traversal", "Visit left subtree, then right subtree, then root."),
                new Step("Complete Traversal", "Print all nodes in the specified order.")
            )
        );
    }

    // Example usage
    public static void main(String[] args) {
        // Print array operations
        System.out.println("Array Operations:");
        printAlgorithm(ArrayOperations.ARRAY_INSERT);
        printAlgorithm(ArrayOperations.ARRAY_DELETE);
        printAlgorithm(ArrayOperations.ARRAY_SEARCH);
        printAlgorithm(ArrayOperations.ARRAY_UPDATE);

        System.out.println("\nLinked List Operations:");
        printAlgorithm(LinkedListOperations.LINKEDLIST_INSERT);
        printAlgorithm(LinkedListOperations.LINKEDLIST_DELETE);
        printAlgorithm(LinkedListOperations.LINKEDLIST_SEARCH);
        printAlgorithm(LinkedListOperations.LINKEDLIST_UPDATE);

        System.out.println("\nTree Operations:");
        printAlgorithm(TreeOperations.TREE_INSERT);
        printAlgorithm(TreeOperations.TREE_DELETE);
        printAlgorithm(TreeOperations.TREE_SEARCH);
        printAlgorithm(TreeOperations.TREE_TRAVERSAL);
    }

    private static void printAlgorithm(Algorithm algorithm) {
        System.out.println("\n" + algorithm.getTitle());
        System.out.println("Description: " + algorithm.getDescription());
        System.out.println("Time Complexity: " + algorithm.getTimeComplexity());
        System.out.println("Space Complexity: " + algorithm.getSpaceComplexity());
        System.out.println("\nCode:");
        System.out.println(algorithm.getCode());
        System.out.println("\nSteps:");
        for (Step step : algorithm.getSteps()) {
            System.out.println("- " + step.getTitle() + ": " + step.getDescription());
        }
        System.out.println("----------------------------------------");
    }
} 