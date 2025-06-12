
export class LinkedList {
  #list = [];
  #size = 0;

  append(node) {
    // Adds a new node containing @value to the end of the list
    if (this.#size !== 0) {
      const lastNode = this.tail;
      lastNode.nextNode = node;
    } else {
      this.#list[this.#size] = node;
      this.#size ++;
    }
  }

  prepend(node) {
    // Adds a new node containing @value to the start of the list
    node.nextNode = this.head;
    this.#list[0] = node;
    this.#size ++;
  }

  get size() {
    // Returns the total number of nodes in the list
    return this.#size;
  }

  get head() {
    // Returns the first node in the list
    return this.#list[0];
  }

  get tail() {
    // Returns the last node in the list
    return this.at(this.#size - 1);
  }

  at(index) {
    // Returns the node at the given index
    let node = this.head;
    for (let i = 0; i < index; i++) {
      let nextNode = node.nextNode;
      node = nextNode;
    }
    return node;
  }

  pop() {
    // Removes the last element from the list

    let currentNode = this.head;
    // Iterates until the the node pointing to the tail is found
    while (currentNode.nextNode !== this.tail) {
      currentNode = currentNode.nextNode;
    }
    // Unlink the nodes
    currentNode.nextNode = null;
    this.#size --;


  }

  contains(value) {
    // Returns true if the passed in value is in the list
    // and otherwise returns false.
    let currentNode = this.head;
    for (let i = 0; i < this.#size; i++) {
      if (currentNode.value === value) return true;
      let nextNode = currentNode.nextNode;
      currentNode = nextNode;
    }
    return false;
  }

  find(value) {
    // Returns the index of the node containing value, or null if not found.
    let currentNode = this.head;
    for (let i = 0; i < this.#size; i++) {
      if (currentNode.value === value) return i;
      let nextNode = currentNode.nextNode;
      currentNode = nextNode;
    }
    return null;
  }

  toString() {
    // represents your LinkedList objects as strings,
    // so you can print them out and preview them in the console.
    // The format should be: ( value ) -> ( value ) -> ( value ) -> null
    let stringList = '';
    let currentNode = this.head;

    while (currentNode !== null) {
      stringList += `( key: ${currentNode.key}  value: ${currentNode.value}) -> `;
      let nextNode = currentNode.nextNode;
      currentNode = nextNode;
    }
    return stringList += 'null';
  }

  insertAt(node, index) {
    // That inserts a new node with the provided @value at the given @index.
    // Follows the following structure:
    // Previous structure: (previousNode) -> (nextNode)
    // Resulting structure: (previousNode) -> (newNode) -> (nextNode)
    // Get the node previous to the index postiion
    // so we can link it to the new Node 
    let previousNode = this.at(index - 1);
    node.nextNode = previousNode.nextNode;
    // Relink the prevous node to the new node
    previousNode.nextNode = node;

    this.#size ++;
  }
  removeAt(index) {
    // Removes the node at the given @index.

    const previousNode = this.at(index - 1);
    // Link the previous node to the element linked with
    // the element wants to be deleted.
    // before: (prevNode) -> (nodeToDelete) -> (nextNode)
    // result: (prevNode) -> (nextNode)
    previousNode.nextNode = this.at(index + 1);
    this.#size --;
  }

}
