const number = [5, 12, 8, 130, 44];
const max = number.reduce((a, b) => Math.max(a, b), -Infinity);
console.log(max); // Output: 130

/*💻 Common Use Cases
1. Summing an Array of NumbersThis is the most common introductory example. The accumulator keeps track of the running total. */
const numbers = [10, 20, 30, 40];
const total = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(total); // Output: 100

// 2. Flattening an Array of ArraysYou can use reduce() to combine sub-arrays into a single flat array.
const nested = [
  [1, 2],
  [3, 4],
  [5, 6],
];
const flat = nested.reduce((acc, curr) => acc.concat(curr), []);
console.log(flat); // Output: [1, 2, 3, 4, 5, 6]

//3. Counting Occurrences (Frequency Map)By setting the initialValue to an empty object ({}), you can count the instances of items in an array
const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];
const fruitCounts = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});
console.log(fruitCounts);
// Output: { apple: 3, banana: 2, orange: 1 }

//4. Grouping Objects by a PropertyYou can group an array of objects into a single object categorized by a specific key.
const people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 25 },
];

const groupedByAge = people.reduce((acc, person) => {
  const age = person.age;
  if (!acc[age]) {
    acc[age] = [];
  }
  acc[age].push(person);
  return acc;
}, {});

console.log(groupedByAge);
/* Output:
{
  '25': [{ name: 'Alice', age: 25 }, { name: 'Charlie', age: 25 }],
  '30': [{ name: 'Bob', age: 30 }]
}
*/

/*======================================================================================
  Lab find largest number of each sub-array and return each largest number in an array.
========================================================================================*/

function findLargestNumber(arrays) {
  const result = [];
  for (let i = 0; i < arrays.length; i++) {
    let subMax = arrays[i][0];
    for (let j = 1; j < arrays[i].length; j++) {
      if (arrays[i][j] > subMax) {
        subMax = arrays[i][j];
      }
    }
    result.push(subMax);
  }
  return result;
}

const arrays = [
  [1, 20, 5, 130, 90],
  [55, 22, 111, 98, 60],
  [10, 20, 30, 40, 50],
];
console.log(findLargestNumber(arrays));
// node jsFundamentals\numbers.js

/*============================================================================
  find element - with outside function called within the findElement function
==============================================================================*/
function findElement(arr, func) {
  for (let i = 0; i < arr.length; i++) {
    let num = arr[i];
    if (func(num)) {
      return num;
    }
  }
}
//test
console.log(
  findElement(["hello", "world", "javascript"], function (str) {
    return str.length > 5;
  }),
);
console.log(
  findElement([2, 4, 6, 8], function (num) {
    return num % 2 === 0;
  }),
);
console.log(
  findElement([1, 2, 3, 4], function (num) {
    return num > 2;
  }),
);
console.log(
  findElement(["cat", "dog", "bird"], function (str) {
    return str.length > 10;
  }),
);
console.log(
  findElement([1, 3, 5, 8, 9, 10], function (num) {
    return num % 2 === 0;
  }),
);

/*==============================================
  Merge to arrays Function 
==============================================*/

function frankenSplice(arr1, arr2, index) {
  const result = arr2.slice();
  let incIndex = index;
  for (let i = 0; i < arr1.length; i++) {
    result.splice(incIndex, null, arr1[i]);
    incIndex++;
  }
  return result;
}

console.log(frankenSplice([1, 2, 3], [4, 5], 1));
console.log(frankenSplice([1, 2], ["a", "b"], 1));
console.log(
  frankenSplice(
    ["claw", "tentacle"],
    ["head", "shoulders", "knees", "toes"],
    2,
  ),
);
console.log(frankenSplice([1, 2, 3, 4], [], 0));

function restMergeArr(arr1, arr2, index) {
  let result = arr2.slice();
  result.splice(index, 0, ...arr1);
  return result;
}
console.log("Test rest operator splice function");
console.log(restMergeArr([1, 2, 3], [4, 5], 1));

/* ====================================================
    PYRAMID WITH CHARACTER FUNCTION. 
   ==================================================== */

function pyramid(char, rows, vertex) {
  const result = [];
  const totalRows = rows;
  for (let i = 0; i < totalRows; i++) {
    const currentRow = vertex ? totalRows - 1 - i : i;
    console.log(currentRow);
    const spaces = " ".repeat(totalRows - 1 - currentRow);
    const chars = char.repeat(2 * currentRow + 1);
    result.push(spaces + chars);
  }
  return "\n" + result.join("\n") + "\n";
}

console.log(pyramid("*", 5, true));
console.log(pyramid("o", 4, false));
console.log(pyramid("o", 4, true));
console.log(pyramid("p", 5, true));
