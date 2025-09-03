//hashMap.js

/* snippet to use when accessing a bucket via an index

if (index < 0 || index >= buckets.length) {
  throw new Error("Trying to access index out of bounds");
}
NOTE - this cannot happen when hash is using % capacity for index
*/
class HashMap {
  #loadFactor;
  #capacity;
  #buckets;
  #size;
  constructor(loadFactor = 0.75, capacity = 16) {
    this.#capacity = capacity;
    this.#loadFactor = loadFactor;
    this.#buckets = new Array(capacity);// .fill(null) possibly
    this.#size = 0;
  }
  //
  hash(key) {
   let hashCode = 0;
   const primeNumber = 31;
   for (let i = 0; i < key.length; i++) {
     hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#capacity;
   }
   return hashCode;
 }
 //
 set(key, value){
  // takes two arguments: the first is a key, and the second is a value that is assigned to this key. If a key already exists, then the old value is overwritten
  const bucketIndex = this.hash(key); 
  const bucket = this.#buckets[bucketIndex];
  if (bucketIndex < 0 || bucketIndex >= this.#buckets.length) {
      throw new Error("Trying to access index out of bounds");
       } else {
        if (!bucket){
          this.#buckets[bucketIndex] = [[key, value]];
          this.#size++;
        }else {
          const duplicateKeyItem = bucket.find(item => item[0] === key);
          if(duplicateKeyItem){
            duplicateKeyItem[1] = value;
          }else {
            this.#buckets[bucketIndex].push([key, value]);
            this.#size++;
          }
        }
       }
       if (this.#size > (this.#loadFactor * this.#capacity)){
        console.log('TIME TO GROW!! Size:',this.#size, "> capacity * load factor :", (this.#loadFactor * this.#capacity));
       }
  }
  //
  get(key){
    //takes one argument as a key and returns the value that is assigned to this key. If a key is not found, return null.
    const bucketIndex = this.hash(key); 
    const bucket = this.#buckets[bucketIndex];
    if(bucket){
       const duplicateKeyItem = bucket.find(item => item[0] === key);
       if(duplicateKeyItem){
        return duplicateKeyItem[1];
       }
    }
    return null;
  } 
  //
  has(key){
    // takes a key as an argument and returns true or false based on whether or not the key is in the hash map.
    const bucketIndex = this.hash(key); 
    const bucket = this.#buckets[bucketIndex];
    if(bucket){
       const duplicateKeyItem = bucket.find(item => item[0] === key);
       if(duplicateKeyItem){
        return true;
       }
    return false;
    }
  }
  //
  remove(key){
    //takes a key as an argument. If the given key is in the hash map, it should remove the entry with that key and return true. If the key isn’t in the hash map, it should return false.
    const bucketIndex = this.hash(key); 
    const bucket = this.#buckets[bucketIndex];
    if(bucket){
       const duplicateKeyItem = bucket.find(item => item[0] === key);
       console.log('duplicateKeyItem in remove() =>', duplicateKeyItem);
       if(duplicateKeyItem){
        bucket.splice(bucket.indexOf(duplicateKeyItem),1);
        if(bucket.length === 0){
          this.#buckets[bucketIndex] = null;
        }
        this.#size--;
        return true;
       }
    return false;
    }
  }
  //
  length(){
    //returns the number of stored keys in the hash map.
    return this.#size;
  }
  //
  clear(){
    //clear() removes all entries in the hash map.
    this.#buckets = new Array(capacity);// .fill(null) possibly
    this.#size = 0;
  }
  //
  keys(){
    //returns an array containing all the keys inside the hash map.
    const keys = [];
    for(let i=0; i<this.#buckets.length; i++){
      if(this.#buckets[i]){
        const entries = this.#buckets[i].length;
        for(let e = 0; e < entries; e++){
          keys.push(this.#buckets[i][e][0]);
        }
      }
    }
    return keys;
  }
  //
  values(){
    //returns an array containing all the keys inside the hash map.
    const values = [];
    for(let i=0; i<this.#buckets.length; i++){
      if(this.#buckets[i]){
        const entries = this.#buckets[i].length;
        for(let e = 0; e < entries; e++){
          values.push(this.#buckets[i][e][1]);
        }
      }
    }
    return values;
  }
  //
  entries(){
    //returns an array that contains each key, value pair. Example: [[firstKey, firstValue], [secondKey, secondValue]]
    const kv = [];
    for(let i=0; i<this.#buckets.length; i++){
      if(this.#buckets[i]){
        kv.push(this.#buckets[i]);
      }
    }
    return kv;
  }
  //
  resize(){
  // resize will double the current capacity and rehash all keys
  const temp = new HashMap(this.#loadFactor, this.#capacity*2);
    for(let i=0; i<this.#buckets.length; i++){
      if(this.#buckets[i]){
        const entries = this.#buckets[i].length;
        for(let e = 0; e < entries; e++){
          const key = this.#buckets[i][e][0];
          const val = this.#buckets[i][e][1];
          temp.set(key, val);
        }
      }
    }
    this.#capacity = temp.#capacity;
    this.#loadFactor = temp.#loadFactor;
    this.#buckets = temp.#buckets;// .fill(null) possibly
    this.#size = temp.#size;
  }
  //
  display(){
    //displays the HashMap content for any buckets with data
    for(let i=0; i<this.#buckets.length; i++){
      if(this.#buckets[i]){
        console.log(i,"=>", this.#buckets[i]);
      }
    }
  }
}
const test = new HashMap(0.75, 16);
//test set
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
//test overwrite
test.set('grape', 'green')
test.display();
//test get()
console.log("get('elephant') =>",test.get('elephant'));
console.log("get('hat') =>",test.get('hat'));
console.log("get('elephan') =>",test.get('elephan'));
// test has(key)
console.log("has('elephant') =>",test.has('elephant'));
console.log("has('hat') =>",test.has('hat'));
console.log("has('elephan') =>",test.has('elephan'));
//test remove(key)
console.log("remove('elephant') =>",test.remove('elephant'));
test.display();
// test.length();
console.log("test.length() => ", test.length());
//test.clear();
console.log("test.clear() => ", test.display());
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
test.set('foo', 'foo1')
test.set('foob', 'foob1')
test.set('fooba', 'fooba1')
test.display();
//test keys()
console.log("test.keys() => ", test.keys())
//test values()
console.log("test.values() => ", test.values())
//test entries()
console.log("test.entries() => ", test.entries())
//test resize()
console.log("test.length() before resize => ", test.length());
test.resize();
test.display();
console.log("test.length() after resize => ", test.length());