/* ===========
     loops 
  ============*/

/* for (initializtation; condition; increment or decrement) { //code block to execute }; */
console.log("for loop. Example:");
for (let i = 0; i < 5; i++) {
  console.log(i);
}
console.log("  ");

/* for...of loop */
/* for (variable of iterable) { // code block }; */
/* best to loop over array values and string characters */
console.log("for..of loop. Examples:");
const numbers = [1, 2, 3, 4, 5];
for (const num of numbers) {
  console.log(num);
}

console.log("  ");

const str = "Hello Darling";
for (let char of str) {
  console.log(char);
}

console.log("  ");

const people = [
  { name: "John", age: 30 },
  { name: "Jane", age: 25 },
  { name: "Jim", age: 40 },
];

for (const person of people) {
  console.log(`${person.name} is ${person.age} years old`);
}

console.log("  ");
console.log("  ");

/* for...in loop */
/* for (variable/prop in object) {}; */
/* best to loop over the properties of an object */
console.log("for..in loop. Example:");
const fruit = { name: "apple", color: "red", price: 0.99 };
for (const prop in fruit) {
  console.log(fruit[prop]);
}

console.log("  ");

console.log("for..in loop. Nested Objects Example:");
const person = {
  name: "John",
  age: 30,
  address: {
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
  },
};

for (const prop in person) {
  console.log(person[prop]);
}

console.log("  ");
console.log("  ");

/* for...in nested loop */
console.log(
  "Nested for..in loop. Nested Objects - to access properties of nested object property Example:",
);

/* first check if nested property object does not contain array or null */
function isObject(obj) {
  return typeof obj === "object" && !Array.isArray(obj) && obj !== null;
}

for (const prop in person) {
  if (isObject(person[prop])) {
    for (const nestedProp in person[prop]) {
      console.log(person[prop][nestedProp]);
    }
  } else {
    console.log(person[prop]);
  }
}
/* end */

console.log("  ");
console.log("  ");

/* =======================
   while loops
   ======================= */

/* while (condition) { code block; }; */

console.log("while loop. Example: ");
let counter = 0;
while (counter < 5) {
  console.log(counter);
  counter++;
}

console.log("  ");

/* do...while loop */

console.log("do..while loop. Example:");
do {
  console.log(counter);
  counter++;
} while (counter < 5);

/* end */

/* ===================================== 
   break & continue statements in loops
   ===================================== */
console.log("  ");
console.log("  ");
console.log("break statement example:");
for (let i = 0; i < 10; i++) {
  if (i === 5) {
    break;
  }
  console.log(i); // 0 1 2 3 4 5 (breaks and leave loop if i === 5.)
}
console.log("  ");

console.log("continue statement example:");
for (let i = 0; i < 10; i++) {
  if (i === 5) {
    continue;
  }
  console.log(i); // 0 1 2 3 4 6 7 8 9 (notice it does not print the 5. it skips it and continues with the loop.
}
console.log("  ");

console.log("Label your loops");
outerLoop: for (let i = 0; i < 3; i++) {
  innerLoop: for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) {
      break outerLoop; //use the label to control flow of the outer loop from within the inner loop (use for nested loops)
    }
    console.log(`i: ${i}, j: ${j}`);
  }
}
console.log("  ");

let sen = ["I", "really", "really", "really", "like", "to", "code"];
let match = "really";

for (let count of sen) {
  console.log(count);
}
