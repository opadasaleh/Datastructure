import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import {
  Play, Pause, SkipBack, SkipForward,
  Code, FileText, ChevronRight, ChevronDown,
  ChevronLeft, RotateCcw, Settings
} from 'lucide-react';
import SizeControl from '../components/controls/SizeControl';
import ArrayVisualizer from '../components/visualizations/ArrayVisualizer';
import LinkedListVisualizer from '../components/visualizations/LinkedListVisualizer';
import TreeVisualizer from '../components/visualizations/TreeVisualizer';
import ListVisualizer from '../components/visualizations/ListVisualizer';
import QueueVisualizer from '../components/visualizations/QueueVisualizer';
import CompositeStructureVisualizer from '../components/visualizations/CompositeStructureVisualizer';

// Algorithm descriptions and code samples
const ALGORITHMS = {
  'array-insert': {
    title: 'Array Insertion',
    description: 'Insert a new element into an array at a specific index, shifting existing elements to make space.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    type: 'array',
    code: `public class ArrayOperations {
    public static int[] insertAt(int[] array, int index, int element) {
        // Create new array with extra space
        int[] newArray = new int[array.length + 1];
        
        // Copy elements before insertion point
        for (int i = 0; i < index; i++) {
            newArray[i] = array[i];
        }
        
        // Insert new element
        newArray[index] = element;
        
        // Copy remaining elements
        for (int i = index; i < array.length; i++) {
            newArray[i + 1] = array[i];
        }
        
        return newArray;
    }
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
    description: 'Remove an element from an array at a specific index, shifting remaining elements to fill the gap.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    type: 'array',
    code: `public class ArrayOperations {
    public static int[] deleteAt(int[] array, int index) {
        // Create new array with one less element
        int[] newArray = new int[array.length - 1];
        
        // Copy elements before deletion point
        for (int i = 0; i < index; i++) {
            newArray[i] = array[i];
        }
        
        // Copy remaining elements
        for (int i = index + 1; i < array.length; i++) {
            newArray[i - 1] = array[i];
        }
        
        return newArray;
    }
}`,
    steps: [
      {
        title: 'Select Element',
        description: 'Identify the element to be removed from the array.'
      },
      {
        title: 'Remove Element',
        description: 'Delete the element and shift remaining elements to fill the gap.'
      },
      {
        title: 'Complete Operation',
        description: 'The element has been removed and the array is ready for more operations.'
      }
    ]
  },
  'array-search': {
    title: 'Array Search',
    description: 'Search for a specific value in the array using sequential search.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    type: 'array',
    code: `public class ArrayOperations {
    public static int search(int[] array, int target) {
        for (int i = 0; i < array.length; i++) {
            if (array[i] == target) {
                return i; // Found at index i
            }
        }
        return -1; // Not found
    }
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
    type: 'array',
    code: `public class ArrayOperations {
    public static boolean update(int[] array, int index, int newValue) {
        if (index >= 0 && index < array.length) {
            array[index] = newValue;
            return true;
        }
        return false;
    }
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
  'linkedlist-insert': {
    title: 'Linked List Insertion',
    description: 'Insert a new node into a linked list at a specific position.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    type: 'linkedlist',
    code: `public class LinkedList {
    class Node {
        int value;
        Node next;
        
        Node(int value) {
            this.value = value;
            this.next = null;
        }
    }
    
    public Node insertNode(Node head, int value, int position) {
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
            // Insert node
            newNode.next = current.next;
            current.next = newNode;
        }
        
        return head;
    }
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
    type: 'linkedlist',
    code: `public class LinkedList {
    class Node {
        int value;
        Node next;
        
        Node(int value) {
            this.value = value;
            this.next = null;
        }
    }
    
    public Node deleteNode(Node head, int position) {
        if (head == null) return null;
        
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
    type: 'linkedlist',
    code: `public class LinkedList {
    class Node {
        int value;
        Node next;
        
        Node(int value) {
            this.value = value;
            this.next = null;
        }
    }
    
    public int searchNode(Node head, int value) {
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
    type: 'linkedlist',
    code: `public class LinkedList {
    class Node {
        int value;
        Node next;
        
        Node(int value) {
            this.value = value;
            this.next = null;
        }
    }
    
    public boolean updateNode(Node head, int position, int newValue) {
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
    description: 'Add a new element to the rear (back) of the queue.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    type: 'queue',
    code: `public class Queue {
    private int[] queue;
    private int front;
    private int rear;
    private int size;
    private int capacity;
    
    public Queue(int capacity) {
        this.capacity = capacity;
        this.queue = new int[capacity];
        this.front = 0;
        this.rear = -1;
        this.size = 0;
    }
    
    public boolean enqueue(int element) {
        if (size == capacity) {
            return false; // Queue is full
        }
        
        rear = (rear + 1) % capacity;
        queue[rear] = element;
        size++;
        return true;
    }
}`,
    steps: [
      {
        title: 'Check Queue',
        description: 'Verify the queue has space for a new element.'
      },
      {
        title: 'Add to Rear',
        description: 'Place the new element at the rear of the queue.'
      },
      {
        title: 'Update Pointers',
        description: 'Update the rear pointer and size counter.'
      }
    ]
  },
  'queue-dequeue': {
    title: 'Queue Dequeue',
    description: 'Remove and return the element from the front of the queue.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    type: 'queue',
    code: `public class Queue {
    private int[] queue;
    private int front;
    private int rear;
    private int size;
    private int capacity;
    
    public int dequeue() {
        if (size == 0) {
            throw new RuntimeException("Queue is empty");
        }
        
        int element = queue[front];
        front = (front + 1) % capacity;
        size--;
        return element;
    }
}`,
    steps: [
      {
        title: 'Check Queue',
        description: 'Verify the queue is not empty.'
      },
      {
        title: 'Remove from Front',
        description: 'Take the element from the front of the queue.'
      },
      {
        title: 'Update Pointers',
        description: 'Update the front pointer and size counter.'
      }
    ]
  },
  'queue-peek': {
    title: 'Queue Peek',
    description: 'View the front element of the queue without removing it.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    type: 'queue',
    code: `public class Queue {
    private int[] queue;
    private int front;
    private int size;
    
    public int peek() {
        if (size == 0) {
            throw new RuntimeException("Queue is empty");
        }
        
        return queue[front];
    }
}`,
    steps: [
      {
        title: 'Check Queue',
        description: 'Verify the queue is not empty.'
      },
      {
        title: 'View Front',
        description: 'Look at the front element without removing it.'
      },
      {
        title: 'Return Value',
        description: 'Return the front element value.'
      }
    ]
  },
  'queue-search': {
    title: 'Queue Search',
    description: 'Search for a specific value in the queue.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    type: 'queue',
    code: `public class Queue {
    private int[] queue;
    private int front;
    private int size;
    private int capacity;
    
    public int search(int target) {
        for (int i = 0; i < size; i++) {
            int index = (front + i) % capacity;
            if (queue[index] == target) {
                return i; // Position from front
            }
        }
        return -1; // Not found
    }
}`,
    steps: [
      {
        title: 'Start Search',
        description: 'Begin searching from the front of the queue.'
      },
      {
        title: 'Check Elements',
        description: 'Compare each element with the target value.'
      },
      {
        title: 'Complete Search',
        description: 'Return position if found, or -1 if not found.'
      }
    ]
  },
  'queue-clear': {
    title: 'Queue Clear',
    description: 'Remove all elements from the queue.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    type: 'queue',
    code: `public class Queue {
    private int front;
    private int rear;
    private int size;
    
    public void clear() {
        front = 0;
        rear = -1;
        size = 0;
    }
}`,
    steps: [
      {
        title: 'Reset Pointers',
        description: 'Reset front and rear pointers to initial state.'
      },
      {
        title: 'Clear Size',
        description: 'Set the size counter to zero.'
      },
      {
        title: 'Complete Clear',
        description: 'The queue is now empty and ready for new elements.'
      }
    ]
  },
  'tree-insert': {
    title: 'Tree Insertion',
    description: 'Insert a new node into a binary search tree while maintaining the BST property.',
    timeComplexity: 'O(h) where h is height',
    spaceComplexity: 'O(1)',
    type: 'tree',
    code: `public class BinarySearchTree {
    class Node {
        int value;
        Node left;
        Node right;
        
        Node(int value) {
            this.value = value;
            this.left = null;
            this.right = null;
        }
    }
    
    public Node insert(Node root, int value) {
        if (root == null) {
            return new Node(value);
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
    type: 'tree',
    code: `public class BinarySearchTree {
    class Node {
        int value;
        Node left;
        Node right;
        
        Node(int value) {
            this.value = value;
            this.left = null;
            this.right = null;
        }
    }
    
    public Node deleteNode(Node root, int value) {
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
            Node successor = findMin(root.right);
            root.value = successor.value;
            root.right = deleteNode(root.right, successor.value);
        }
        return root;
    }
    
    private Node findMin(Node node) {
        while (node.left != null) {
            node = node.left;
        }
        return node;
    }
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
    type: 'tree',
    code: `public class BinarySearchTree {
    class Node {
        int value;
        Node left;
        Node right;
        
        Node(int value) {
            this.value = value;
            this.left = null;
            this.right = null;
        }
    }
    
    public Node search(Node root, int value) {
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
    type: 'tree',
    code: `public class BinarySearchTree {
    class Node {
        int value;
        Node left;
        Node right;
        
        Node(int value) {
            this.value = value;
            this.left = null;
            this.right = null;
        }
    }
    
    public void inorderTraversal(Node root) {
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
    type: 'tree',
    code: `public class BinarySearchTree {
    class Node {
        int value;
        Node left;
        Node right;
        
        Node(int value) {
            this.value = value;
            this.left = null;
            this.right = null;
        }
    }
    
    public void preorderTraversal(Node root) {
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
    type: 'tree',
    code: `public class BinarySearchTree {
    class Node {
        int value;
        Node left;
        Node right;
        
        Node(int value) {
            this.value = value;
            this.left = null;
            this.right = null;
        }
    }
    
    public void postorderTraversal(Node root) {
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
  'ordered-list-insert': {
    title: 'Ordered List Insertion',
    description: 'Insert a new element into an ordered list while maintaining the sorted order.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    type: 'list',
    code: `public class OrderedList {
    public static void insert(int[] list, int newValue) {
        // Find the correct position
        int pos = 0;
        while (pos < list.length && list[pos] < newValue) {
            pos++;
        }
        
        // Shift elements to make space
        for (int i = list.length - 1; i > pos; i--) {
            list[i] = list[i - 1];
        }
        
        // Insert the new value
        list[pos] = newValue;
    }
}`,
    steps: [
      {
        title: 'Find Position',
        description: 'Locate the correct position to maintain order.'
      },
      {
        title: 'Insert Element',
        description: 'Add the new element at the found position.'
      },
      {
        title: 'Complete Operation',
        description: 'The list remains sorted after insertion.'
      }
    ]
  },
  'unordered-list-insert': {
    title: 'Unordered List Insertion',
    description: 'Add a new element to the end of an unordered list.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    type: 'list',
    code: `public class UnorderedList {
    public static void insert(int[] list, int newValue) {
        // Add the new value at the end
        list[list.length - 1] = newValue;
    }
}`,
    steps: [
      {
        title: 'Prepare List',
        description: 'Get ready to add the new element.'
      },
      {
        title: 'Insert Element',
        description: 'Add the new element at the end.'
      },
      {
        title: 'Complete Operation',
        description: 'The new element is added to the list.'
      }
    ]
  },
  'ordered-list-search': {
    title: 'Binary Search in Ordered List',
    description: 'Efficiently find an element in a sorted list using binary search.',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    type: 'list',
    code: `public class OrderedList {
    public static int binarySearch(int[] list, int target) {
        int left = 0;
        int right = list.length - 1;
        
        while (left <= right) {
            int mid = (left + right) / 2;
            
            if (list[mid] == target) {
                return mid;
            } else if (list[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return -1; // Not found
    }
}`,
    steps: [
      {
        title: 'Initialize Search',
        description: 'Set up the search range.'
      },
      {
        title: 'Binary Search',
        description: 'Divide and conquer to find the element.'
      },
      {
        title: 'Complete Search',
        description: 'Element found or search complete.'
      }
    ]
  },
  'unordered-list-search': {
    title: 'Linear Search in Unordered List',
    description: 'Find an element in an unordered list by checking each element.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    type: 'list',
    code: `public class UnorderedList {
    public static int linearSearch(int[] list, int target) {
        for (int i = 0; i < list.length; i++) {
            if (list[i] == target) {
                return i;
            }
        }
        return -1; // Not found
    }
}`,
    steps: [
      {
        title: 'Start Search',
        description: 'Begin checking elements from the start.'
      },
      {
        title: 'Linear Search',
        description: 'Check each element one by one.'
      },
      {
        title: 'Complete Search',
        description: 'Element found or search complete.'
      }
    ]
  },
  // New composite structure algorithms
  'stack-using-array': {
    title: 'Stack Implementation using Array',
    description: 'Build a Stack data structure using an Array as the underlying storage mechanism.',
    timeComplexity: 'O(1) for push/pop',
    spaceComplexity: 'O(n)',
    type: 'composite',
    code: `public class ArrayStack {
    private int[] array;
    private int top;
    private int capacity;
    
    public ArrayStack(int capacity) {
        this.capacity = capacity;
        this.array = new int[capacity];
        this.top = -1;
    }
    
    public void push(int element) {
        if (top >= capacity - 1) {
            throw new RuntimeException("Stack overflow");
        }
        array[++top] = element;
    }
    
    public int pop() {
        if (top < 0) {
            throw new RuntimeException("Stack underflow");
        }
        return array[top--];
    }
    
    public int peek() {
        if (top < 0) {
            throw new RuntimeException("Stack is empty");
        }
        return array[top];
    }
}`,
    steps: [
      {
        title: 'Initialize Stack',
        description: 'Create an array and set top pointer to -1.'
      },
      {
        title: 'Push Operations',
        description: 'Add elements by incrementing top and storing values.'
      },
      {
        title: 'Pop Operations',
        description: 'Remove elements by returning top value and decrementing.'
      }
    ]
  },
  'queue-using-array': {
    title: 'Queue Implementation using Array',
    description: 'Build a Queue data structure using an Array with front and rear pointers.',
    timeComplexity: 'O(1) for enqueue/dequeue',
    spaceComplexity: 'O(n)',
    type: 'composite',
    code: `public class ArrayQueue {
    private int[] array;
    private int front;
    private int rear;
    private int size;
    private int capacity;
    
    public ArrayQueue(int capacity) {
        this.capacity = capacity;
        this.array = new int[capacity];
        this.front = 0;
        this.rear = -1;
        this.size = 0;
    }
    
    public void enqueue(int element) {
        if (size >= capacity) {
            throw new RuntimeException("Queue is full");
        }
        rear = (rear + 1) % capacity;
        array[rear] = element;
        size++;
    }
    
    public int dequeue() {
        if (size <= 0) {
            throw new RuntimeException("Queue is empty");
        }
        int element = array[front];
        front = (front + 1) % capacity;
        size--;
        return element;
    }
}`,
    steps: [
      {
        title: 'Initialize Queue',
        description: 'Create array with front and rear pointers.'
      },
      {
        title: 'Enqueue Operations',
        description: 'Add elements at rear position.'
      },
      {
        title: 'Dequeue Operations',
        description: 'Remove elements from front position.'
      }
    ]
  },
  'graph-using-array': {
    title: 'Graph using Adjacency Matrix',
    description: 'Represent a graph using a 2D array (adjacency matrix) to store connections.',
    timeComplexity: 'O(1) for edge operations',
    spaceComplexity: 'O(V²)',
    type: 'composite',
    code: `public class GraphMatrix {
    private int[][] matrix;
    private int vertices;
    
    public GraphMatrix(int vertices) {
        this.vertices = vertices;
        this.matrix = new int[vertices][vertices];
    }
    
    public void addEdge(int source, int destination) {
        matrix[source][destination] = 1;
        matrix[destination][source] = 1; // For undirected graph
    }
    
    public void removeEdge(int source, int destination) {
        matrix[source][destination] = 0;
        matrix[destination][source] = 0;
    }
    
    public boolean hasEdge(int source, int destination) {
        return matrix[source][destination] == 1;
    }
}`,
    steps: [
      {
        title: 'Initialize Matrix',
        description: 'Create a 2D array filled with zeros.'
      },
      {
        title: 'Add Edges',
        description: 'Set matrix[i][j] = 1 to represent edge between vertices i and j.'
      },
      {
        title: 'Query Graph',
        description: 'Check matrix values to determine if edges exist.'
      }
    ]
  },
  'hash-table-using-array': {
    title: 'Hash Table using Array',
    description: 'Implement a hash table using an array and a hash function for fast key-value storage.',
    timeComplexity: 'O(1) average for operations',
    spaceComplexity: 'O(n)',
    type: 'composite',
    code: `public class HashTable {
    private String[] array;
    private int capacity;
    
    public HashTable(int capacity) {
        this.capacity = capacity;
        this.array = new String[capacity];
    }
    
    private int hash(String key) {
        return Math.abs(key.hashCode()) % capacity;
    }
    
    public void put(String key, String value) {
        int index = hash(key);
        array[index] = value;
    }
    
    public String get(String key) {
        int index = hash(key);
        return array[index];
    }
    
    public void remove(String key) {
        int index = hash(key);
        array[index] = null;
    }
}`,
    steps: [
      {
        title: 'Initialize Array',
        description: 'Create an array to store values.'
      },
      {
        title: 'Hash Function',
        description: 'Use hash function to map keys to array indices.'
      },
      {
        title: 'Store/Retrieve',
        description: 'Use computed index to store and retrieve values.'
      }
    ]
  }
};

const AlgorithmVisualizer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { theme } = useTheme();
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [step, setStep] = useState(0);
  const [maxSteps, setMaxSteps] = useState(10);
  const [codeOpen, setCodeOpen] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [loopAnimation, setLoopAnimation] = useState(false);

  const algorithm = ALGORITHMS[id as keyof typeof ALGORITHMS];

  // Reset animation when algorithm changes
  useEffect(() => {
    setStep(0);
    setPlaying(false);
  }, [id]);

  // Auto-advance when playing
  useEffect(() => {
    if (!playing) return;

    const timer = setTimeout(() => {
      if (step < maxSteps - 1) {
        setStep(prevStep => prevStep + 1);
      } else {
        if (loopAnimation) {
          setStep(0); // Loop back to start
        } else {
          setPlaying(false);
        }
      }
    }, 1000 / speed);

    return () => clearTimeout(timer);
  }, [playing, step, maxSteps, speed, loopAnimation]);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleReset = () => {
    setStep(0);
    setPlaying(false);
  };

  const handleStepForward = () => {
    if (step < maxSteps - 1) {
      setStep(prevStep => prevStep + 1);
    }
  };

  const handleStepBackward = () => {
    if (step > 0) {
      setStep(prevStep => prevStep - 1);
    }
  };

  const handleGoToEnd = () => {
    setStep(maxSteps - 1);
    setPlaying(false);
  };

  if (!algorithm) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Algorithm Not Found</h1>
        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          The requested algorithm visualization is not available.
        </p>
      </div>
    );
  }

  const renderVisualizer = () => {
    switch (algorithm.type) {
      case 'array':
        return (
          <ArrayVisualizer
            operation={id || ''}
            currentStep={step}
            onStepsChange={setMaxSteps}
            speed={speed}
          />
        );
      case 'linkedlist':
        return (
          <LinkedListVisualizer
            operation={id || ''}
            currentStep={step}
            onStepsChange={setMaxSteps}
            speed={speed}
          />
        );
      case 'tree':
        return (
          <TreeVisualizer
            operation={id || ''}
            currentStep={step}
            onStepsChange={setMaxSteps}
            speed={speed}
          />
        );
      case 'list':
        return (
          <ListVisualizer
            operation={id || ''}
            currentStep={step}
            onStepsChange={setMaxSteps}
            speed={speed}
          />
        );
      case 'queue':
        return (
          <QueueVisualizer
            operation={id || ''}
            currentStep={step}
            onStepsChange={setMaxSteps}
            speed={speed}
          />
        );
      case 'composite':
        return (
          <CompositeStructureVisualizer
            operation={id || ''}
            currentStep={step}
            onStepsChange={setMaxSteps}
            speed={speed}
          />
        );
      default:
        return (
          <div className="text-center p-4">
            <p>Visualization not available for this algorithm type.</p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{algorithm.title}</h1>
        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          {algorithm.description}
        </p>
        <div className="mt-4 flex gap-4">
          <div className={`
            inline-flex items-center px-3 py-1 rounded-full text-sm
            ${theme === 'dark' ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-800'}
          `}>
            Time: {algorithm.timeComplexity}
          </div>
          <div className={`
            inline-flex items-center px-3 py-1 rounded-full text-sm
            ${theme === 'dark' ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-100 text-purple-800'}
          `}>
            Space: {algorithm.spaceComplexity}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Visualization Panel - Now takes 3/4 of the width */}
        <div className="xl:col-span-3">
          <div className={`
            rounded-lg overflow-hidden border
            ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
          `}>
            {/* Visualization Header */}
            <div className={`
              p-4 border-b
              ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}
            `}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
                <h2 className="font-semibold">Visualization</h2>
                <div className="flex items-center space-x-6 w-full sm:w-auto">
                  {/* Speed Control */}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm whitespace-nowrap">Speed:</span>
                    <input
                      type="range"
                      min="0.5"
                      max="4"
                      step="0.5"
                      value={speed}
                      onChange={(e) => setSpeed(Number(e.target.value))}
                      className={`
                        w-20 h-2 rounded-lg appearance-none cursor-pointer
                        ${theme === 'dark'
                          ? 'bg-gray-700 [&::-webkit-slider-thumb]:bg-blue-500 [&::-moz-range-thumb]:bg-blue-500'
                          : 'bg-gray-200 [&::-webkit-slider-thumb]:bg-blue-500 [&::-moz-range-thumb]:bg-blue-500'}
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full
                        [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none
                      `}
                    />
                    <span className="text-sm min-w-[2.5rem]">{speed}x</span>
                  </div>
                  
                  {/* Size Control */}
                  <SizeControl />

                  {/* Advanced Controls Toggle */}
                  <button
                    onClick={() => setShowControls(!showControls)}
                    className={`
                      p-2 rounded-full transition-colors
                      ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}
                    `}
                    title="Advanced Controls"
                  >
                    <Settings size={18} />
                  </button>
                </div>
              </div>

              {/* Advanced Controls Panel */}
              {showControls && (
                <div className={`
                  mt-4 p-4 rounded-lg border
                  ${theme === 'dark' ? 'bg-gray-900 border-gray-600' : 'bg-gray-100 border-gray-300'}
                `}>
                  <h3 className="text-sm font-semibold mb-3">Advanced Controls</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Auto Play */}
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="autoPlay"
                        checked={autoPlay}
                        onChange={(e) => setAutoPlay(e.target.checked)}
                        className="rounded"
                      />
                      <label htmlFor="autoPlay" className="text-sm">Auto-play on load</label>
                    </div>

                    {/* Loop Animation */}
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="loopAnimation"
                        checked={loopAnimation}
                        onChange={(e) => setLoopAnimation(e.target.checked)}
                        className="rounded"
                      />
                      <label htmlFor="loopAnimation" className="text-sm">Loop animation</label>
                    </div>

                    {/* Step Slider */}
                    <div className="sm:col-span-2">
                      <label className="text-sm font-medium mb-2 block">
                        Manual Step Control: {step + 1} / {maxSteps}
                      </label>
                      <input
                        type="range"
                        min="0"
                        max={maxSteps - 1}
                        value={step}
                        onChange={(e) => {
                          setStep(Number(e.target.value));
                          setPlaying(false);
                        }}
                        className={`
                          w-full h-2 rounded-lg appearance-none cursor-pointer
                          ${theme === 'dark'
                            ? 'bg-gray-700 [&::-webkit-slider-thumb]:bg-green-500 [&::-moz-range-thumb]:bg-green-500'
                            : 'bg-gray-200 [&::-webkit-slider-thumb]:bg-green-500 [&::-moz-range-thumb]:bg-green-500'}
                          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full
                          [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none
                        `}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Visualization Canvas - Much bigger now */}
            <div className={`
              h-[600px]
              ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}
            `}>
              {renderVisualizer()}
            </div>

            {/* Controls */}
            <div className={`
              p-4 border-t 
              ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}
            `}>
              <div className="flex items-center justify-center space-x-4">
                {/* Reset Button */}
                <button
                  onClick={handleReset}
                  className={`
                    p-2 rounded-full transition-colors
                    ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}
                    disabled:opacity-50
                  `}
                  disabled={step === 0 && !playing}
                  title="Reset to beginning"
                >
                  <RotateCcw size={20} />
                </button>

                <button
                  onClick={handleReset}
                  className={`
                    p-2 rounded-full
                    ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}
                    disabled:opacity-50
                  `}
                  disabled={step === 0}
                >
                  <SkipBack size={20} />
                </button>
                <button
                  onClick={handleStepBackward}
                  className={`
                    p-2 rounded-full
                    ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}
                    disabled:opacity-50
                  `}
                  disabled={step === 0}
                >
                  <ChevronLeft size={24} />
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
                  {playing ? <Pause size={24} /> : <Play size={24} />}
                </button>
                <button
                  onClick={handleStepForward}
                  className={`
                    p-2 rounded-full
                    ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}
                    disabled:opacity-50
                  `}
                  disabled={step === maxSteps - 1}
                >
                  <ChevronRight size={24} />
                </button>
                <button
                  onClick={handleGoToEnd}
                  className={`
                    p-2 rounded-full
                    ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}
                    disabled:opacity-50
                  `}
                  disabled={step === maxSteps - 1}
                >
                  <SkipForward size={20} />
                </button>
              </div>

              <div className="mt-4">
                <div className="relative w-full h-2 bg-gray-300 dark:bg-gray-600 rounded">
                  <div
                    className="absolute top-0 left-0 h-2 bg-blue-500 rounded"
                    style={{ width: `${(step / (maxSteps - 1)) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Step {step + 1}</span>
                  <span>{maxSteps} total</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Information Panel - Now takes 1/4 of the width */}
        <div className="xl:col-span-1">
          <div className={`
            rounded-lg border overflow-hidden
            ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
          `}>
            {/* Step Description */}
            <div className={`
              p-4 border-b
              ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}
            `}>
              <h2 className="font-semibold flex items-center">
                <FileText size={18} className="mr-2" /> Step Explanation
              </h2>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium mb-2">
                Step {step + 1}: {algorithm.steps[step % algorithm.steps.length]?.title || 'Processing'}
              </h3>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {algorithm.steps[step % algorithm.steps.length]?.description || 'Algorithm is processing...'}
              </p>
            </div>

            {/* Algorithm Code */}
            <div className={`
              border-t
              ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
            `}>
              <button
                onClick={() => setCodeOpen(!codeOpen)}
                className={`
                  w-full p-4 text-left font-semibold flex items-center justify-between
                  ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}
                `}
              >
                <span className="flex items-center">
                  <Code size={18} className="mr-2" /> Algorithm Code
                </span>
                {codeOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </button>

              {codeOpen && (
                <div className={`
                  p-4 font-mono text-xs overflow-x-auto max-h-96 overflow-y-auto
                  ${theme === 'dark' ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-800'}
                `}>
                  <pre>{algorithm.code}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmVisualizer;