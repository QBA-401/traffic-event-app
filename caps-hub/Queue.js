'use strict';

// class Node {
//   constructor(value) {
//     this.value = value;
//     this.next = null;
//   }
// }

// class Queue {
//   constructor() {
//     this.front = null;
//     this.rear = null;
//     this.length = 0;
//   }

//   enqueue(value) {
//     const newNode = new Node(value);
//     if (this.rear === null) {
//       this.front = newNode;
//       this.rear = newNode;
//     } else {
//       this.rear.next = newNode;
//       this.rear = newNode;
//     }
//     this.length++;
//   }

//   dequeue() {
//     if (this.front === null) {
//       throw new Error("Queue is empty!");
//     }
//     const oldFront = this.front;
//     this.front = this.front.next;
//     if (this.front === null) {
//       this.rear = null;
//     }
//     this.length--;
//     return oldFront.value;
//   }

//   peek() {
//     if (this.front === null) {
//       throw new Error("Queue is empty!");
//     }
//     return this.front.value;
//   }

//   isEmpty() {
//     return this.front === null;
//   }
// }

'use strict';

class Queue {

  constructor() {
    this.storage = [];
  }

  enqueue(item) {
    this.storage.push(item);
  }

  dequeue() {
    return this.storage.shift();
  }

  peek() {
    return this.storage[0];
  }

  isEmpty() {
    return this.storage.length === 0;
  }

  length() {
    return this.storage.length;
  }

}


module.exports = Queue;