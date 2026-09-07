/* =========================================
     Implement a Unique Sorted Union
   =========================================
    User Stories:
    You should have a function named uniteUnique.
    The uniteUnique function should accept two or more arrays as arguments.
    The function should return a new array that contains unique values from the 
    argument arrays, in the order they are first found in the arguments. For example, 
    an input like [1, 2, 4], [2, 3, 5] would have an output of [1, 2, 4, 3, 5]. 
*/

function uniteUnique(arr1, arr2, ...rest) {
  const allArr = [arr1, arr2, ...rest];
  const result = [...new Set(allArr.flat())];
  return result;
}

/* test function */
console.log(uniteUnique([1, 2, 4], [2, 3, 5], [5, 6, 7])); // [ 1, 2, 4, 3, 5, 6, 7 ]
console.log(uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1])); // [1, 3, 2, 5, 4]
console.log(uniteUnique([1, 2, 3], [5, 2, 1, 4], [2, 1], [6, 7, 8])); // [1, 2, 3, 5, 4, 6, 7, 8]
console.log(uniteUnique([1, 3, 2], [5, 4], [5, 6])); // [1, 3, 2, 5, 4, 6]
console.log(uniteUnique([1, 3, 2, 3], [5, 2, 1, 4], [2, 1])); // [1, 3, 2, 5, 4]
