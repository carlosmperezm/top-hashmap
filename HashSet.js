import { LinkedList } from "./LinkedList.js";

export class HashSet {
  #loadFactor = 0.75;
  #capacity = 16; // Number of buckets
  buckets = new Array(16);

  hash(key) {
    // Take a key and produces a hash code with it
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#capacity;
    }
    return hashCode;
  }
  get capacity() {
    return this.#capacity;
  }
  set capacity(newCapacity) {
    this.#capacity = newCapacity;
  }
  #getBucketIndex(key) {
    const hashCode = this.hash(key);
    const index = hashCode % this.#capacity;
    return index;
  }

  set(key) {
    // Creates a new key-value pair. 
    // If the key already exits just update its value
    let maxNumber = 9
    // Make the buckets list grow when is close to be full.
    if (this.length * this.#loadFactor >= maxNumber) {
      const newHashSet = new HashSet();
      newHashSet.capacity = this.#capacity * 2
      newHashSet.buckets = new Array(newHashSet.capacity)
      for (let entry of this.entries()) {
        newHashSet.set(entry[0]);
      }
      this.buckets = newHashSet.buckets;
      this.capacity = newHashSet.capacity;
      maxNumber * 2
    }

    const index = this.#getBucketIndex(key)
    const newNode = new Node(key);
    const nodesList = this.buckets[index]

    // If there is nothing in the bucket
    if (!nodesList) {
      // Create a linked List to avoid future collisions
      const newNodesList = new LinkedList();
      // Add the new key-pair value to the list
      newNodesList.append(newNode);
      // Associate that bucket to the list and its elements
      this.buckets[index] = newNodesList;
    } else if (this.has(key)) {
      // There is no need to update the key
      return;
    } else {
      // Add the new value to the existing list
      nodesList.append(newNode);
    }
  }

  get(key) {
    // Returns the value assigned to that key.
    // If a key is not found, return null
    const index = this.#getBucketIndex(key);
    const bucket = this.buckets[index];
    // If the bucket does not exist return null because 
    // that means that the key neither exists because there is no
    // bucket to store it
    if (!bucket) {
      return null;
    }
    // If the bucket exits
    let node = bucket.head;
    while (node) {
      if (node.key === key) return node;
      else node = node.nextNode;
    }
    return null;
  }

  has(key) {
    // Returns true or false based on whether or not the key is in the hash map
    return Boolean(this.get(key))
  }

  remove(key) {
    // Remove the entry with that key and return true. Otherwise false.
    const index = this.#getBucketIndex(key);
    const entry = this.buckets[index];
    // If the bucket exits
    if (!this.has(key)) return false;

    if (entry.size > 1) {
      let nodeIndex = this.buckets[index].find(key);
      delete this.buckets[index].removeAt(nodeIndex);
    } else {
      delete this.buckets[index];
    }
    return true;
  }

  get length() {
    // Returns the number of keys stored in the hash map
    return this.entries().length;
  }

  clear() {
    // Remove all entries in the hash map
    this.#capacity = 16;
    this.buckets = new Array(this.#capacity);
  }

  keys() {
    // Returns an array containing all the keys inside the hash map
    const keys = [];
    const entries = this.entries();
    entries.forEach(entry => keys.push(entry[0]))
    return keys;
  }

  entries() {
    // Returns an array that contains each key,value pair.
    // Example: [[firstKey, firstValue], [secondKey, secondValue]]
    const entries = [];
    for (let bucket of this.buckets) {
      if (!bucket)
        // if the bucket is undefined skip to the next bucket
        continue;
      if (bucket.size > 1) {
        // if the bucket has more than one element means we have to 
        // iterate over that bucket too. So we save it for later
        // (To not do nested loops)
        let node = bucket.head;
        while (node) {
          entries.push([node.key]);
          node = node.nextNode
        }
      } else {
        entries.push([bucket.head.key])
      }
    }
    return entries;
  }
}

class Node {
  key;
  nextNode = null;

  constructor(key, value) {
    this.key = key;
  }
}
