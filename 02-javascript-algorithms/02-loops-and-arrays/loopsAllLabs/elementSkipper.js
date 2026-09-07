/* ======================================
        Implement an Element Skipper
   ======================================
  In this lab you will create a function that 
  skips elements in an array until it finds an 
  acceptable one based on a specific test function.
 */

function dropElements(arr, func) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (func(arr[i])) {
      result = arr.slice(i);
      return result;
    }
  }
  return [];
}

console.log(
  dropElements([1, 2, 3, 4], function (n) {
    return n >= 3;
  }),
); // [3, 4]
console.log(
  dropElements([0, 1, 0, 1], function (n) {
    return n === 1;
  }),
); // [1, 0, 1]
console.log(
  dropElements([1, 2, 3], function (n) {
    return n > 0;
  }),
); // [1, 2, 3]
console.log(
  dropElements([1, 2, 3, 4], function (n) {
    return n > 5;
  }),
); // []
console.log(
  dropElements([1, 2, 3, 7, 4], function (n) {
    return n > 3;
  }),
); // [7, 4]
