import { LinkedList } from './LinkedList.js';

export class HashMap {
  #loadFactor = 0.75;
  #capacity = 16; // Number of buckets
  buckets = new Array(16);

  hash(key) {
    // Take a key and produces a hash code with it
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  #getBucketIndex(key) {
    const hashCode = this.hash(key);
    const index = hashCode % this.#capacity;

    return index;

  }

  set(key, value) {
    // Creates a new key-value pair. 
    // If the key already exits just update its value

    // Make the buckets list grow when is close to be full.
    if (this.length * this.#loadFactor >= 9) {
      this.#capacity = this.#capacity * 2;
      console.log('capacity: ', this.#capacity)
      // TODO: make the buckets spread evenly among the expanded buckets.

      // TODO: finish it
    }

    const index = this.#getBucketIndex(key)
    const newPair = new Node(key, value);
    const nodesList = this.buckets[index]

    // If there is nothing in the bucket
    if (!nodesList) {
      // Create a linked List to avoid future collisions
      const newNodesList = new LinkedList();
      // Add the new key-pair value to the list
      newNodesList.append(newPair);
      // Associate that bucket to the list and its elements
      this.buckets[index] = newNodesList;
    } else {
      // Add the new value to the existing list
      nodesList.append(newPair);
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
      if (node.key === key) return node.value;
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
    if (entry) {
      delete this.buckets[index];
      return true;
    }
    return false;
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
  }
  values() {
    // Returns an array containing all the values
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
          entries.push(node);
          node = node.nextNode
        }
      } else {
        entries.push(bucket.head)
      }
    }
    return entries;
  }

}

class Node {
  key;
  value;
  nextNode = null;

  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}
