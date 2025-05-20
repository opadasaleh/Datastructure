public class DataStructures {
    // Array Operations
    public static class ArrayOperations {
        /**
         * Insert an element at a specific index in the array
         * @param arr The array to insert into
         * @param index The position to insert at
         * @param element The element to insert
         * @return A new array with the element inserted
         */
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

        /**
         * Delete an element at a specific index in the array
         * @param arr The array to delete from
         * @param index The position to delete from
         * @return A new array with the element deleted
         */
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

        /**
         * Search for a value in the array
         * @param arr The array to search in
         * @param target The value to search for
         * @return The index of the target value, or -1 if not found
         */
        public static int search(int[] arr, int target) {
            for (int i = 0; i < arr.length; i++) {
                if (arr[i] == target) {
                    return i;
                }
            }
            return -1;
        }

        /**
         * Update the value at a specific index in the array
         * @param arr The array to update
         * @param index The position to update
         * @param newValue The new value
         * @return true if update was successful, false otherwise
         */
        public static boolean update(int[] arr, int index, int newValue) {
            if (index < 0 || index >= arr.length) {
                return false;
            }
            arr[index] = newValue;
            return true;
        }
    }

    // Linked List Operations
    public static class LinkedListOperations {
        // Node class for linked list
        public static class Node {
            int value;
            Node next;

            public Node(int value) {
                this.value = value;
                this.next = null;
            }
        }

        /**
         * Insert a new node into the linked list at a specific position
         * @param head The head of the linked list
         * @param value The value to insert
         * @param position The position to insert at
         * @return The new head of the linked list
         */
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

        /**
         * Delete a node from the linked list at a specific position
         * @param head The head of the linked list
         * @param position The position to delete from
         * @return The new head of the linked list
         */
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

        /**
         * Search for a value in the linked list
         * @param head The head of the linked list
         * @param value The value to search for
         * @return The position of the value, or -1 if not found
         */
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

            return -1;
        }

        /**
         * Update the value of a node at a specific position
         * @param head The head of the linked list
         * @param position The position to update
         * @param newValue The new value
         * @return true if update was successful, false otherwise
         */
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
    }

    // Example usage
    public static void main(String[] args) {
        // Array operations example
        int[] arr = {10, 20, 30, 40, 50};
        System.out.println("Original array: " + java.util.Arrays.toString(arr));

        // Insert
        arr = ArrayOperations.insertAt(arr, 2, 35);
        System.out.println("After insertion: " + java.util.Arrays.toString(arr));

        // Delete
        arr = ArrayOperations.deleteAt(arr, 3);
        System.out.println("After deletion: " + java.util.Arrays.toString(arr));

        // Search
        int searchResult = ArrayOperations.search(arr, 35);
        System.out.println("Search result for 35: " + searchResult);

        // Update
        ArrayOperations.update(arr, 2, 45);
        System.out.println("After update: " + java.util.Arrays.toString(arr));

        // Linked List operations example
        LinkedListOperations.Node head = new LinkedListOperations.Node(10);
        head.next = new LinkedListOperations.Node(20);
        head.next.next = new LinkedListOperations.Node(30);
        head.next.next.next = new LinkedListOperations.Node(40);

        System.out.println("\nLinked List operations:");
        // Insert
        head = LinkedListOperations.insertNode(head, 25, 2);
        printLinkedList(head);

        // Delete
        head = LinkedListOperations.deleteNode(head, 3);
        printLinkedList(head);

        // Search
        int listSearchResult = LinkedListOperations.searchNode(head, 25);
        System.out.println("Search result for 25: " + listSearchResult);

        // Update
        LinkedListOperations.updateNode(head, 2, 35);
        printLinkedList(head);
    }

    // Helper method to print linked list
    private static void printLinkedList(LinkedListOperations.Node head) {
        LinkedListOperations.Node current = head;
        System.out.print("Linked List: ");
        while (current != null) {
            System.out.print(current.value + " -> ");
            current = current.next;
        }
        System.out.println("null");
    }
} 