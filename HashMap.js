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

    // TODO: Make the buckets list grow when is close to be full.
    if (this.entries().length * this.#loadFactor === 9) {
      this.#capacity = this.#capacity * 2;
      // console.log(this.entries().length);
      // console.log('capacity: ', this.#capacity)
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
    return this.buckets[index];
  }

  has(key) {
    // Returns true or false based on whether or not the key is in the hash map
    const index = this.#getBucketIndex(key);
    return this.buckets[index] ? true : false;
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
    // TODO: inlclude the the extra keys that might be in a bucket
    return this.entries().length;
  }

  clear() {
    // Remove all entries in the hash map
    this.buckets = new Array(16)
  }

  keys() {
    // Returns an array containing all the keys inside the hash map
    const keys = [];
    for (let key of this.buckets) {
      keys.push(key);
    }
    return keys;
  }
  values() {
    // Returns an array containing all the values
  }

  entries() {
    // Returns an array that contains each key,value pair.
    // Example: [[firstKey, firstValue], [secondKey, secondValue]]
    const entries = [];
    const collisionedBuckets = [];
    for (let bucket of this.buckets) {
      if (!bucket)
        // if the bucket is undefined skip to the next bucket
        continue;
      if (bucket.size > 1) {
        // if the bucket has more than one element means we have to 
        // iterate over that bucket too. So we save it for later
        // (To not do nested loops)
        collisionedBuckets.push(bucket)
      } else {
        entries.push(bucket.head)
      }
    }
    collisionedBuckets.forEach(bucket => entries.push(bucket))
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
