function diffArray(arr1, arr2) {
  const filteredArr1 = arr1.filter((item) => !arr2.includes(item));
  const filteredArr2 = arr2.filter((item) => !arr1.includes(item));
  return filteredArr1.concat(filteredArr2);
}

let arrayA = ["diamond", "stick", "apple"];
let arrayB = ["stick", "emerald", "bread"];
console.log(diffArray(arrayA, arrayB)); // [ 'diamond', 'apple', 'emerald', 'bread' ]

console.log(
  diffArray(
    ["diorite", "andesite", "grass", "dirt", "pink wool", "dead shrub"],
    ["diorite", "andesite", "grass", "dirt", "dead shrub"],
  ),
); // [ 'pink wool' ]

console.log(
  diffArray(
    ["diorite", "andesite", "grass", "dirt", "pink wool", "dead shrub"],
    ["andesite", "grass", "dirt", "dead shrub"],
  ),
); // [ 'diorite', 'pink wool' ]

console.log(diffArray(["pen", "book"], ["book", "pencil", "notebook"])); // [ 'pen', 'pencil', 'notebook' ]

console.log(
  diffArray(["apple", "orange"], ["apple", "orange", "banana", "grape"]),
); // [ 'banana', 'grape' ]

console.log(diffArray([], ["apple", "banana"])); // [ 'apple', 'banana' ]

console.log(diffArray([], [])); // []

console.log(diffArray(["apple", "banana"], ["apple", "banana"])); // []

/* second lab */
/* this function returns the values (element values) that does not match any of 
the provided values from the orginal array and returns a new array, if no values 
are left it returns an empty array */

function destroyer(arr, arg, ...args) {
  const bindVal = [].concat(arg, ...args);
  const result = arr.filter((item) => !bindVal.includes(item));
  return result;
}

console.log(destroyer([1, 2, 3, 1, 2, 3], 2, 3)); //[ 1, 1 ]
console.log(destroyer([1, 2, 3, 5, 1, 2, 3], 2, 3)); // [ 1, 5, 1 ]
console.log(destroyer([3, 5, 1, 2, 2], 2, 3, 5)); // [ 1 ]
console.log(destroyer([2, 3, 2, 3], 2, 3)); // []
console.log(destroyer(["tree", "hamburger", 53], "tree", 53)); // [ 'hamburger' ]
console.log(
  destroyer(
    [
      "possum",
      "trollo",
      12,
      "safari",
      "hotdog",
      92,
      65,
      "grandma",
      "bugati",
      "trojan",
      "yacht",
    ],
    "yacht",
    "possum",
    "trollo",
    "safari",
    "hotdog",
    "grandma",
    "bugati",
    "trojan",
  ),
); // [ 12, 92, 65 ]
