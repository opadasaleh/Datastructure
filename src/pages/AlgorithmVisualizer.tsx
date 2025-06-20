import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { Play, Pause, RotateCcw, SkipBack, SkipForward, Settings } from 'lucide-react';
import ArrayVisualizer from '../components/visualizations/ArrayVisualizer';
import LinkedListVisualizer from '../components/visualizations/LinkedListVisualizer';
import TreeVisualizer from '../components/visualizations/TreeVisualizer';
import ListVisualizer from '../components/visualizations/ListVisualizer';
import QueueVisualizer from '../components/visualizations/QueueVisualizer';
import CompositeStructureVisualizer from '../components/visualizations/CompositeStructureVisualizer';
import StackVisualizer from '../components/visualizations/StackVisualizer';
import HeapVisualizer from '../components/visualizations/HeapVisualizer';
import SizeControl from '../components/controls/SizeControl';

interface AlgorithmInfo {
  title: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  code: string;
  steps: Array<{
    title: string;
    description: string;
  }>;
}

const AlgorithmVisualizer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { theme } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [activeTab, setActiveTab] = useState<'visualization' | 'code' | 'explanation'>('visualization');

  useEffect(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, [id]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentStep < totalSteps - 1) {
      interval = setInterval(() => {
        setCurrentStep(prev => prev + 1);
      }, 1000 / speed);
    } else if (currentStep >= totalSteps - 1) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, totalSteps, speed]);

  const algorithmData: Record<string, AlgorithmInfo> = {
  'array-insert': {
    title: 'Array Insertion',
    description: 'Insert a new element into an array at a specific index, shifting existing elements to make space.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    code: `public static int[] insertAt(int[] arr, int index, int element) {
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
}`,
    steps: [
      {
        title: 'Select Insert Position',
        description: 'Identify the position where the new element will be inserted.'
      },
      {
        title: 'Insert Element',
        description: 'Create space and insert the new element at the specified position.'
      },
      {
        title: 'Complete Operation',
        description: 'The new element is now in place and the array is ready for more operations.'
      }
    ]
  },
  'array-delete': {
    title: 'Array Deletion',
    description: 'Remove an element from a specific index in the array, shifting remaining elements to fill the gap.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    code: `public static int[] deleteAt(int[] arr, int index) {
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
}`,
    steps: [
      {
        title: 'Select Element',
        description: 'Identify the element to be removed from the array.'
      },
      {
        title: 'Remove Element',
        description: 'Remove the selected element and shift remaining elements.'
      },
      {
        title: 'Complete Operation',
        description: 'The element has been removed and the array is reindexed.'
      }
    ]
  },
  'array-search': {
    title: 'Array Search',
    description: 'Search for a specific value in the array using sequential search.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    code: `public static int search(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) {
            return i; // Found at index i
        }
    }
    return -1; // Not found
}`,
    steps: [
      {
        title: 'Start Search',
        description: 'Begin searching from the first element of the array.'
      },
      {
        title: 'Check Elements',
        description: 'Compare each element with the target value.'
      },
      {
        title: 'Complete Search',
        description: 'Element found or reached the end of the array.'
      }
    ]
  },
  'array-update': {
    title: 'Array Update',
    description: 'Update the value of an element at a specific index in the array.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    code: `public static boolean update(int[] arr, int index, int newValue) {
    if (index < 0 || index >= arr.length) {
        return false;
    }
    arr[index] = newValue;
    return true;
}`,
    steps: [
      {
        title: 'Select Element',
        description: 'Identify the element to be updated.'
      },
      {
        title: 'Update Value',
        description: 'Replace the old value with the new value.'
      },
      {
        title: 'Complete Update',
        description: 'The element has been updated successfully.'
      }
    ]
  },
  'ordered-list-insert': {
    title: 'Ordered List Insertion',
    description: 'Insert a new element into a sorted list while maintaining the sorted order.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    code: `public static void insertInOrder(List<Integer> list, int value) {
    int insertIndex = 0;
    
    // Find the correct position to maintain sorted order
    while (insertIndex < list.size() && list.get(insertIndex) < value) {
        insertIndex++;
    }
    
    // Insert the element at the found position
    list.add(insertIndex, value);
}`,
    steps: [
      {
        title: 'Find Position',
        description: 'Locate the correct position to maintain sorted order.'
      },
      {
        title: 'Insert Element',
        description: 'Insert the new element at the found position.'
      },
      {
        title: 'Maintain Order',
        description: 'The list remains sorted after insertion.'
      }
    ]
  },
  'unordered-list-insert': {
    title: 'Unordered List Insertion',
    description: 'Insert a new element at the end of an unordered list.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    code: `public static void insertAtEnd(List<Integer> list, int value) {
    // Simply add the element at the end
    list.add(value);
}`,
    steps: [
      {
        title: 'Add to End',
        description: 'Add the new element at the end of the list.'
      },
      {
        title: 'Complete Insertion',
        description: 'The element has been successfully added.'
      }
    ]
  },
  'ordered-list-search': {
    title: 'Binary Search (Ordered List)',
    description: 'Search for an element in a sorted list using binary search algorithm.',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    code: `public static int binarySearch(int[] arr, int target) {
    int left = 0;
    int right = arr.length - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            return mid; // Found
        } else if (arr[mid] < target) {
            left = mid + 1; // Search right half
        } else {
            right = mid - 1; // Search left half
        }
    }
    
    return -1; // Not found
}`,
    steps: [
      {
        title: 'Initialize Bounds',
        description: 'Set left and right boundaries for the search.'
      },
      {
        title: 'Check Middle',
        description: 'Compare the middle element with the target.'
      },
      {
        title: 'Narrow Search',
        description: 'Eliminate half of the remaining elements.'
      },
      {
        title: 'Find Target',
        description: 'Continue until target is found or search space is exhausted.'
      }
    ]
  },
  'unordered-list-search': {
    title: 'Linear Search (Unordered List)',
    description: 'Search for an element in an unordered list using linear search.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    code: `public static int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) {
            return i; // Found at index i
        }
    }
    return -1; // Not found
}`,
    steps: [
      {
        title: 'Start from Beginning',
        description: 'Begin search from the first element.'
      },
      {
        title: 'Check Each Element',
        description: 'Compare each element with the target sequentially.'
      },
      {
        title: 'Find or Finish',
        description: 'Return index when found or -1 if not found.'
      }
    ]
  },
  'linkedlist-insert': {
    title: 'Linked List Insertion',
    description: 'Insert a new node into a linked list at a specific position.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    code: `public Node insertNode(Node head, int value, int position) {
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
}`,
    steps: [
      {
        title: 'Create New Node',
        description: 'Create a new node with the given value.'
      },
      {
        title: 'Find Insert Position',
        description: 'Traverse the list to find the insertion point.'
      },
      {
        title: 'Update Pointers',
        description: 'Update the next pointers to insert the new node.'
      },
      {
        title: 'Complete Operation',
        description: 'The new node is now part of the linked list.'
      }
    ]
  },
  'linkedlist-delete': {
    title: 'Linked List Deletion',
    description: 'Remove a node from a linked list at a specific position.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    code: `public Node deleteNode(Node head, int position) {
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
}`,
    steps: [
      {
        title: 'Find Delete Position',
        description: 'Traverse to the node before the deletion point.'
      },
      {
        title: 'Update Pointers',
        description: 'Update the next pointer to skip the deleted node.'
      },
      {
        title: 'Complete Operation',
        description: 'The node has been removed from the linked list.'
      }
    ]
  },
  'linkedlist-search': {
    title: 'Linked List Search',
    description: 'Search for a value in a linked list.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    code: `public int searchNode(Node head, int value) {
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
}`,
    steps: [
      {
        title: 'Start Search',
        description: 'Begin at the head of the linked list.'
      },
      {
        title: 'Traverse List',
        description: 'Move through the list one node at a time.'
      },
      {
        title: 'Check Values',
        description: 'Compare each node\'s value with the target.'
      },
      {
        title: 'Complete Search',
        description: 'Return the position if found, or -1 if not found.'
      }
    ]
  },
  'linkedlist-update': {
    title: 'Linked List Update',
    description: 'Update the value of a node at a specific position.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    code: `public boolean updateNode(Node head, int position, int newValue) {
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
}`,
    steps: [
      {
        title: 'Find Node',
        description: 'Traverse to the node at the specified position.'
      },
      {
        title: 'Update Value',
        description: 'Change the node\'s value to the new value.'
      },
      {
        title: 'Complete Operation',
        description: 'The node\'s value has been updated.'
      }
    ]
  },
  'queue-enqueue': {
    title: 'Queue Enqueue',
    description: 'Add an element to the rear of the queue.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    code: `public void enqueue(int value) {
    if (isFull()) {
        throw new RuntimeException("Queue is full");
    }
    
    rear = (rear + 1) % capacity;
    queue[rear] = value;
    size++;
}`,
    steps: [
      {
        title: 'Check Capacity',
        description: 'Verify the queue has space for a new element.'
      },
      {
        title: 'Add to Rear',
        description: 'Place the new element at the rear of the queue.'
      },
      {
        title: 'Update Pointers',
        description: 'Update rear pointer and size counter.'
      }
    ]
  },
  'queue-dequeue': {
    title: 'Queue Dequeue',
    description: 'Remove an element from the front of the queue.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    code: `public int dequeue() {
    if (isEmpty()) {
        throw new RuntimeException("Queue is empty");
    }
    
    int value = queue[front];
    front = (front + 1) % capacity;
    size--;
    
    return value;
}`,
    steps: [
      {
        title: 'Check if Empty',
        description: 'Verify the queue has elements to remove.'
      },
      {
        title: 'Remove from Front',
        description: 'Take the element from the front of the queue.'
      },
      {
        title: 'Update Pointers',
        description: 'Update front pointer and size counter.'
      }
    ]
  },
  'queue-peek': {
    title: 'Queue Peek',
    description: 'View the front element without removing it.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    code: `public int peek() {
    if (isEmpty()) {
        throw new RuntimeException("Queue is empty");
    }
    
    return queue[front];
}`,
    steps: [
      {
        title: 'Check if Empty',
        description: 'Verify the queue has elements to view.'
      },
      {
        title: 'Return Front Value',
        description: 'Return the value at the front without removing it.'
      }
    ]
  },
  'queue-search': {
    title: 'Queue Search',
    description: 'Search for an element in the queue.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    code: `public int search(int value) {
    for (int i = 0; i < size; i++) {
        int index = (front + i) % capacity;
        if (queue[index] == value) {
            return i; // Position from front
        }
    }
    return -1; // Not found
}`,
    steps: [
      {
        title: 'Start from Front',
        description: 'Begin search from the front of the queue.'
      },
      {
        title: 'Check Each Element',
        description: 'Compare each element with the target value.'
      },
      {
        title: 'Return Position',
        description: 'Return position from front if found.'
      }
    ]
  },
  'queue-clear': {
    title: 'Queue Clear',
    description: 'Remove all elements from the queue.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    code: `public void clear() {
    front = 0;
    rear = -1;
    size = 0;
}`,
    steps: [
      {
        title: 'Reset Pointers',
        description: 'Reset front and rear pointers to initial values.'
      },
      {
        title: 'Clear Size',
        description: 'Set size counter to zero.'
      }
    ]
  },
  'tree-insert': {
    title: 'Tree Insertion',
    description: 'Insert a new node into a binary search tree while maintaining the BST property.',
    timeComplexity: 'O(h) where h is height',
    spaceComplexity: 'O(1)',
    code: `class TreeNode {
    int value;
    TreeNode left, right;
    
    public TreeNode(int value) {
        this.value = value;
        this.left = this.right = null;
    }
}

class BST {
    
    public TreeNode insert(TreeNode root, int value) {
        if (root == null) {
            return new TreeNode(value);
        }
        
        if (value < root.value) {
            root.left = insert(root.left, value);
        } else {
            root.right = insert(root.right, value);
        }
        
        return root;
    }
}`,
    steps: [
      {
        title: 'Check Empty Tree',
        description: 'If tree is empty, create new root node.'
      },
      {
        title: 'Compare Values',
        description: 'Compare new value with current node.'
      },
      {
        title: 'Recursive Insert',
        description: 'Recursively insert into left or right subtree.'
      },
      {
        title: 'Complete Operation',
        description: 'Return the updated tree structure.'
      }
    ]
  },
  'tree-delete': {
    title: 'Tree Deletion',
    description: 'Delete a node from a binary search tree while maintaining the BST property.',
    timeComplexity: 'O(h) where h is height',
    spaceComplexity: 'O(1)',
    code: `public TreeNode deleteNode(TreeNode root, int value) {
    if (root == null) return null;
    
    if (value < root.value) {
        root.left = deleteNode(root.left, value);
    } else if (value > root.value) {
        root.right = deleteNode(root.right, value);
    } else {
        // Node with only one child or no child
        if (root.left == null) return root.right;
        if (root.right == null) return root.left;
        
        // Node with two children
        TreeNode successor = findMin(root.right);
        root.value = successor.value;
        root.right = deleteNode(root.right, successor.value);
    }
    return root;
}

private TreeNode findMin(TreeNode root) {
    while (root.left != null) {
        root = root.left;
    }
    return root;
}`,
    steps: [
      {
        title: 'Find Node',
        description: 'Locate the node to be deleted.'
      },
      {
        title: 'Handle Leaf Node',
        description: 'If node has no children, simply remove it.'
      },
      {
        title: 'Handle Single Child',
        description: 'If node has one child, replace with child.'
      },
      {
        title: 'Handle Two Children',
        description: 'If node has two children, find inorder successor.'
      },
      {
        title: 'Complete Operation',
        description: 'Return the updated tree structure.'
      }
    ]
  },
  'tree-search': {
    title: 'Tree Search',
    description: 'Search for a value in a binary search tree.',
    timeComplexity: 'O(h) where h is height',
    spaceComplexity: 'O(1)',
    code: `class BST {
    
    public TreeNode search(TreeNode root, int value) {
        if (root == null || root.value == value) {
            return root;
        }
        
        if (value < root.value) {
            return search(root.left, value);
        }
        
        return search(root.right, value);
    }
}`,
    steps: [
      {
        title: 'Check Root',
        description: 'Check if root is null or contains target value.'
      },
      {
        title: 'Compare Values',
        description: 'Compare target with current node value.'
      },
      {
        title: 'Recursive Search',
        description: 'Search in appropriate subtree.'
      },
      {
        title: 'Complete Search',
        description: 'Return found node or null.'
      }
    ]
  },
  'tree-traverse-inorder': {
    title: 'Inorder Traversal',
    description: 'Traverse a binary tree in inorder fashion (Left -> Root -> Right).',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    code: `class BST {
    
    public void inorderTraversal(TreeNode root) {
        if (root != null) {
            inorderTraversal(root.left);
            System.out.println(root.value);
            inorderTraversal(root.right);
        }
    }
}`,
    steps: [
      {
        title: 'Visit Left Subtree',
        description: 'Recursively traverse the left subtree.'
      },
      {
        title: 'Visit Root',
        description: 'Process the current node.'
      },
      {
        title: 'Visit Right Subtree',
        description: 'Recursively traverse the right subtree.'
      }
    ]
  },
  'tree-traverse-preorder': {
    title: 'Preorder Traversal',
    description: 'Traverse a binary tree in preorder fashion (Root -> Left -> Right).',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    code: `class BST {
    
    public void preorderTraversal(TreeNode root) {
        if (root != null) {
            System.out.println(root.value);
            preorderTraversal(root.left);
            preorderTraversal(root.right);
        }
    }
}`,
    steps: [
      {
        title: 'Visit Root',
        description: 'Process the current node.'
      },
      {
        title: 'Visit Left Subtree',
        description: 'Recursively traverse the left subtree.'
      },
      {
        title: 'Visit Right Subtree',
        description: 'Recursively traverse the right subtree.'
      }
    ]
  },
  'tree-traverse-postorder': {
    title: 'Postorder Traversal',
    description: 'Traverse a binary tree in postorder fashion (Left -> Right -> Root).',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    code: `class BST {
    
    public void postorderTraversal(TreeNode root) {
        if (root != null) {
            postorderTraversal(root.left);
            postorderTraversal(root.right);
            System.out.println(root.value);
        }
    }
}`,
    steps: [
      {
        title: 'Visit Left Subtree',
        description: 'Recursively traverse the left subtree.'
      },
      {
        title: 'Visit Right Subtree',
        description: 'Recursively traverse the right subtree.'
      },
      {
        title: 'Visit Root',
        description: 'Process the current node.'
      }
    ]
  },
  'stack-using-array': {
    title: 'Stack using Array',
    description: 'Implementation of stack data structure using array as underlying storage.',
    timeComplexity: 'O(1) for push/pop',
    spaceComplexity: 'O(n)',
    code: `class Stack {
    private int[] array;
    private int top;
    private int capacity;
    
    public Stack(int size) {
        array = new int[size];
        capacity = size;
        top = -1;
    }
    
    public void push(int value) {
        if (top == capacity - 1) {
            throw new RuntimeException("Stack overflow");
        }
        array[++top] = value;
    }
    
    public int pop() {
        if (top == -1) {
            throw new RuntimeException("Stack underflow");
        }
        return array[top--];
    }
    
    public int peek() {
        if (top == -1) {
            throw new RuntimeException("Stack is empty");
        }
        return array[top];
    }
}`,
    steps: [
      {
        title: 'Initialize Stack',
        description: 'Create array-based stack with capacity.'
      },
      {
        title: 'Push Operations',
        description: 'Add elements to top of stack.'
      },
      {
        title: 'Pop Operations',
        description: 'Remove elements from top of stack.'
      }
    ]
  },
  'queue-using-array': {
    title: 'Queue using Array',
    description: 'Implementation of queue data structure using array with front and rear pointers.',
    timeComplexity: 'O(1) for enqueue/dequeue',
    spaceComplexity: 'O(n)',
    code: `class Queue {
    private int[] array;
    private int front;
    private int rear;
    private int size;
    private int capacity;
    
    public Queue(int capacity) {
        this.capacity = capacity;
        array = new int[capacity];
        front = 0;
        rear = -1;
        size = 0;
    }
    
    public void enqueue(int value) {
        if (size == capacity) {
            throw new RuntimeException("Queue is full");
        }
        rear = (rear + 1) % capacity;
        array[rear] = value;
        size++;
    }
    
    public int dequeue() {
        if (size == 0) {
            throw new RuntimeException("Queue is empty");
        }
        int value = array[front];
        front = (front + 1) % capacity;
        size--;
        return value;
    }
}`,
    steps: [
      {
        title: 'Initialize Queue',
        description: 'Create array-based queue with pointers.'
      },
      {
        title: 'Enqueue Operations',
        description: 'Add elements to rear of queue.'
      },
      {
        title: 'Dequeue Operations',
        description: 'Remove elements from front of queue.'
      }
    ]
  },
  'graph-using-array': {
    title: 'Graph using Adjacency Matrix',
    description: 'Representation of graph using 2D array (adjacency matrix).',
    timeComplexity: 'O(1) for edge operations',
    spaceComplexity: 'O(V²)',
    code: `class Graph {
    private int[][] adjMatrix;
    private int vertices;
    
    public Graph(int vertices) {
        this.vertices = vertices;
        adjMatrix = new int[vertices][vertices];
    }
    
    public void addEdge(int src, int dest) {
        adjMatrix[src][dest] = 1;
        adjMatrix[dest][src] = 1; // For undirected graph
    }
    
    public void removeEdge(int src, int dest) {
        adjMatrix[src][dest] = 0;
        adjMatrix[dest][src] = 0;
    }
    
    public boolean hasEdge(int src, int dest) {
        return adjMatrix[src][dest] == 1;
    }
    
    public void printGraph() {
        for (int i = 0; i < vertices; i++) {
            for (int j = 0; j < vertices; j++) {
                System.out.print(adjMatrix[i][j] + " ");
            }
            System.out.println();
        }
    }
}`,
    steps: [
      {
        title: 'Initialize Matrix',
        description: 'Create 2D array for adjacency matrix.'
      },
      {
        title: 'Add Edges',
        description: 'Set matrix values to represent connections.'
      },
      {
        title: 'Query Graph',
        description: 'Check connections and traverse graph.'
      }
    ]
  },
  'hash-table-using-array': {
    title: 'Hash Table using Array',
    description: 'Implementation of hash table using array and hash function.',
    timeComplexity: 'O(1) average for operations',
    spaceComplexity: 'O(n)',
    code: `class HashTable {
    private String[] table;
    private int size;
    
    public HashTable(int size) {
        this.size = size;
        table = new String[size];
    }
    
    private int hash(String key) {
        int hash = 0;
        for (char c : key.toCharArray()) {
            hash = (hash + c) % size;
        }
        return hash;
    }
    
    public void put(String key, String value) {
        int index = hash(key);
        // Linear probing for collision resolution
        while (table[index] != null && !table[index].startsWith(key + ":")) {
            index = (index + 1) % size;
        }
        table[index] = key + ":" + value;
    }
    
    public String get(String key) {
        int index = hash(key);
        while (table[index] != null) {
            if (table[index].startsWith(key + ":")) {
                return table[index].substring(key.length() + 1);
            }
            index = (index + 1) % size;
        }
        return null;
    }
}`,
    steps: [
      {
        title: 'Initialize Table',
        description: 'Create array for hash table storage.'
      },
      {
        title: 'Hash Function',
        description: 'Map keys to array indices using hash function.'
      },
      {
        title: 'Handle Collisions',
        description: 'Resolve collisions using probing or chaining.'
      }
    ]
  },
  'stack-push': {
    title: 'Stack Push Operation',
    description: 'Add an element to the top of the stack following LIFO principle.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    code: `public void push(int value) {
    if (isFull()) {
        throw new RuntimeException("Stack overflow");
    }
    
    array[++top] = value;
    size++;
}`,
    steps: [
      {
        title: 'Check Capacity',
        description: 'Verify the stack has space for a new element.'
      },
      {
        title: 'Add to Top',
        description: 'Place the new element at the top of the stack.'
      },
      {
        title: 'Update Pointers',
        description: 'Update top pointer and size counter.'
      }
    ]
  },
  'stack-pop': {
    title: 'Stack Pop Operation',
    description: 'Remove an element from the top of the stack following LIFO principle.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    code: `public int pop() {
    if (isEmpty()) {
        throw new RuntimeException("Stack underflow");
    }
    
    int value = array[top];
    top--;
    size--;
    
    return value;
}`,
    steps: [
      {
        title: 'Check if Empty',
        description: 'Verify the stack has elements to remove.'
      },
      {
        title: 'Remove from Top',
        description: 'Take the element from the top of the stack.'
      },
      {
        title: 'Update Pointers',
        description: 'Update top pointer and size counter.'
      }
    ]
  },
  'stack-peek': {
    title: 'Stack Peek Operation',
    description: 'View the top element without removing it from the stack.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    code: `public int peek() {
    if (isEmpty()) {
        throw new RuntimeException("Stack is empty");
    }
    
    return array[top];
}`,
    steps: [
      {
        title: 'Check if Empty',
        description: 'Verify the stack has elements to view.'
      },
      {
        title: 'Return Top Value',
        description: 'Return the value at the top without removing it.'
      }
    ]
  },
  'stack-search': {
    title: 'Stack Search Operation',
    description: 'Search for an element in the stack from top to bottom.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    code: `public int search(int value) {
    for (int i = top; i >= 0; i--) {
        if (array[i] == value) {
            return top - i; // Distance from top
        }
    }
    return -1; // Not found
}`,
    steps: [
      {
        title: 'Start from Top',
        description: 'Begin search from the top of the stack.'
      },
      {
        title: 'Check Each Element',
        description: 'Compare each element with the target value.'
      },
      {
        title: 'Return Distance',
        description: 'Return distance from top if found.'
      }
    ]
  },
  'stack-clear': {
    title: 'Stack Clear Operation',
    description: 'Remove all elements from the stack.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    code: `public void clear() {
    top = -1;
    size = 0;
}`,
    steps: [
      {
        title: 'Reset Pointer',
        description: 'Reset top pointer to initial value.'
      },
      {
        title: 'Clear Size',
        description: 'Set size counter to zero.'
      }
    ]
  },
  'heap-insert': {
    title: 'Heap Insertion',
    description: 'Insert a new element into a heap while maintaining the heap property.',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    code: `public void insert(int value) {
    if (size >= capacity) {
        throw new RuntimeException("Heap is full");
    }
    
    // Add new element at the end
    heap[size] = value;
    size++;
    
    // Bubble up to maintain heap property
    int current = size - 1;
    while (current > 0) {
        int parent = (current - 1) / 2;
        if (heap[current] <= heap[parent]) {
            break;
        }
        
        // Swap with parent
        swap(current, parent);
        current = parent;
    }
}`,
    steps: [
      {
        title: 'Add at End',
        description: 'Place new element at the end of the heap.'
      },
      {
        title: 'Bubble Up',
        description: 'Compare with parent and swap if needed.'
      },
      {
        title: 'Maintain Property',
        description: 'Continue until heap property is satisfied.'
      }
    ]
  },
  'heap-extract': {
    title: 'Heap Extract Maximum',
    description: 'Remove and return the maximum element from a max heap.',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    code: `public int extractMax() {
    if (size == 0) {
        throw new RuntimeException("Heap is empty");
    }
    
    int max = heap[0];
    
    // Move last element to root
    heap[0] = heap[size - 1];
    size--;
    
    // Bubble down to maintain heap property
    heapifyDown(0);
    
    return max;
}

private void heapifyDown(int index) {
    while (true) {
        int largest = index;
        int left = 2 * index + 1;
        int right = 2 * index + 2;
        
        if (left < size && heap[left] > heap[largest]) {
            largest = left;
        }
        if (right < size && heap[right] > heap[largest]) {
            largest = right;
        }
        
        if (largest == index) break;
        
        swap(index, largest);
        index = largest;
    }
}`,
    steps: [
      {
        title: 'Save Maximum',
        description: 'Store the root element (maximum) to return.'
      },
      {
        title: 'Replace Root',
        description: 'Move last element to root position.'
      },
      {
        title: 'Bubble Down',
        description: 'Restore heap property by bubbling down.'
      }
    ]
  },
  'heap-peek': {
    title: 'Heap Peek',
    description: 'View the maximum element without removing it from the heap.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    code: `public int peek() {
    if (size == 0) {
        throw new RuntimeException("Heap is empty");
    }
    
    return heap[0];
}`,
    steps: [
      {
        title: 'Check if Empty',
        description: 'Verify the heap has elements to view.'
      },
      {
        title: 'Return Root Value',
        description: 'Return the maximum value at the root.'
      }
    ]
  },
  'heap-heapify': {
    title: 'Heapify Array',
    description: 'Convert an arbitrary array into a valid heap structure.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    code: `public void buildHeap(int[] array) {
    this.heap = array;
    this.size = array.length;
    
    // Start from last non-leaf node and heapify down
    for (int i = (size / 2) - 1; i >= 0; i--) {
        heapifyDown(i);
    }
}

private void heapifyDown(int index) {
    while (true) {
        int largest = index;
        int left = 2 * index + 1;
        int right = 2 * index + 2;
        
        if (left < size && heap[left] > heap[largest]) {
            largest = left;
        }
        if (right < size && heap[right] > heap[largest]) {
            largest = right;
        }
        
        if (largest == index) break;
        
        swap(index, largest);
        index = largest;
    }
}`,
    steps: [
      {
        title: 'Start from Bottom',
        description: 'Begin with last non-leaf node.'
      },
      {
        title: 'Heapify Subtrees',
        description: 'Ensure each subtree satisfies heap property.'
      },
      {
        title: 'Work Upward',
        description: 'Continue until entire tree is heapified.'
      }
    ]
  }
};

  const algorithm = algorithmData[id || ''] || {
    title: 'Algorithm Not Found',
    description: 'The requested algorithm could not be found.',
    timeComplexity: 'N/A',
    spaceComplexity: 'N/A',
    code: '// Algorithm not implemented',
    steps: []
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handleStepForward = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderVisualization = () => {
    if (!id) return <div>No algorithm selected</div>;

    if (id.startsWith('array-')) {
      return (
        <ArrayVisualizer
          operation={id}
          currentStep={currentStep}
          onStepsChange={setTotalSteps}
          speed={speed}
        />
      );
    }

    if (id.startsWith('linkedlist-')) {
      return (
        <LinkedListVisualizer
          operation={id}
          currentStep={currentStep}
          onStepsChange={setTotalSteps}
          speed={speed}
        />
      );
    }

    if (id.startsWith('tree-')) {
      return (
        <TreeVisualizer
          operation={id}
          currentStep={currentStep}
          onStepsChange={setTotalSteps}
          speed={speed}
        />
      );
    }

    if (id.includes('list-')) {
      return (
        <ListVisualizer
          operation={id}
          currentStep={currentStep}
          onStepsChange={setTotalSteps}
          speed={speed}
        />
      );
    }

    if (id.startsWith('queue-')) {
      return (
        <QueueVisualizer
          operation={id}
          currentStep={currentStep}
          onStepsChange={setTotalSteps}
          speed={speed}
        />
      );
    }

    if (id.startsWith('stack-')) {
      return (
        <StackVisualizer
          operation={id}
          currentStep={currentStep}
          onStepsChange={setTotalSteps}
          speed={speed}
        />
      );
    }

    if (id.startsWith('heap-')) {
      return (
        <HeapVisualizer
          operation={id}
          currentStep={currentStep}
          onStepsChange={setTotalSteps}
          speed={speed}
        />
      );
    }

    if (['stack-using-array', 'queue-using-array', 'graph-using-array', 'hash-table-using-array'].includes(id)) {
      return (
        <CompositeStructureVisualizer
          operation={id}
          currentStep={currentStep}
          onStepsChange={setTotalSteps}
          speed={speed}
        />
      );
    }

    return <div>Visualization not available for this algorithm</div>;
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className={`
        border-b ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}
        p-4
      `}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{algorithm.title}</h1>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {algorithm.description}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <SizeControl />
            <div className="flex items-center space-x-2">
              <Settings size={16} />
              <select
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className={`
                  rounded-md border px-2 py-1 text-sm
                  ${theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-800'}
                `}
              >
                <option value={0.5}>0.5x</option>
                <option value={1}>1x</option>
                <option value={1.5}>1.5x</option>
                <option value={2}>2x</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mt-4">
          <button
            onClick={() => setActiveTab('visualization')}
            className={`
              px-4 py-2 rounded-md text-sm font-medium transition-colors
              ${activeTab === 'visualization'
                ? theme === 'dark' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-blue-500 text-white'
                : theme === 'dark'
                  ? 'text-gray-400 hover:text-white' 
                  : 'text-gray-600 hover:text-gray-900'}
            `}
          >
            Visualization
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`
              px-4 py-2 rounded-md text-sm font-medium transition-colors
              ${activeTab === 'code'
                ? theme === 'dark' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-blue-500 text-white'
                : theme === 'dark'
                  ? 'text-gray-400 hover:text-white' 
                  : 'text-gray-600 hover:text-gray-900'}
            `}
          >
            Code
          </button>
          <button
            onClick={() => setActiveTab('explanation')}
            className={`
              px-4 py-2 rounded-md text-sm font-medium transition-colors
              ${activeTab === 'explanation'
                ? theme === 'dark' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-blue-500 text-white'
                : theme === 'dark'
                  ? 'text-gray-400 hover:text-white' 
                  : 'text-gray-600 hover:text-gray-900'}
            `}
          >
            Explanation
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Visualization Area */}
        <div className="flex-1 flex flex-col">
          {activeTab === 'visualization' && (
            <>
              <div className="flex-1">
                {renderVisualization()}
              </div>
              
              {/* Controls */}
              <div className={`
                border-t ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}
                p-4
              `}>
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={handleStepBackward}
                    disabled={currentStep === 0}
                    className={`
                      p-2 rounded-md
                      ${currentStep === 0
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
                    `}
                  >
                    <SkipBack size={20} />
                  </button>
                  
                  <button
                    onClick={handlePlayPause}
                    className={`
                      p-3 rounded-full
                      ${theme === 'dark' 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-blue-500 hover:bg-blue-600'}
                      text-white
                    `}
                  >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                  </button>
                  
                  <button
                    onClick={handleStepForward}
                    disabled={currentStep >= totalSteps - 1}
                    className={`
                      p-2 rounded-md
                      ${currentStep >= totalSteps - 1
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
                    `}
                  >
                    <SkipForward size={20} />
                  </button>
                  
                  <button
                    onClick={handleReset}
                    className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <RotateCcw size={20} />
                  </button>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Step {currentStep + 1} of {totalSteps}</span>
                    <span>{Math.round(((currentStep + 1) / totalSteps) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'code' && (
            <div className="flex-1 p-6 overflow-auto">
              <h3 className="text-lg font-semibold mb-4">Implementation</h3>
              <div className={`
                rounded-lg p-4 font-mono text-sm overflow-x-auto
                ${theme === 'dark' ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-800'}
              `}>
                <pre>{algorithm.code}</pre>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`
                  p-4 rounded-lg
                  ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
                  border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
                `}>
                  <h4 className="font-semibold mb-2">Time Complexity</h4>
                  <p className="text-2xl font-bold text-blue-500">{algorithm.timeComplexity}</p>
                </div>
                <div className={`
                  p-4 rounded-lg
                  ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
                  border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
                `}>
                  <h4 className="font-semibold mb-2">Space Complexity</h4>
                  <p className="text-2xl font-bold text-green-500">{algorithm.spaceComplexity}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'explanation' && (
            <div className="flex-1 p-6 overflow-auto">
              <h3 className="text-lg font-semibold mb-4">Algorithm Steps</h3>
              <div className="space-y-4">
                {algorithm.steps.map((step, index) => (
                  <div
                    key={index}
                    className={`
                      p-4 rounded-lg border
                      ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
                    `}
                  >
                    <h4 className="font-semibold mb-2">
                      Step {index + 1}: {step.title}
                    </h4>
                    <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlgorithmVisualizer;