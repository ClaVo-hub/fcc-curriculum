function bouncer(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Boolean(arr[i])) {
      result.push(arr[i]);
    }
  }
  return result;
}

console.log(bouncer([7, "ate", "", false, 9])); // [ 7, 'ate', 9 ]
console.log(bouncer(["a", "b", "c"])); // [ 'a', 'b', 'c' ]
console.log(bouncer([false, null, 0, NaN, undefined, ""])); // []
console.log(bouncer([null, NaN, 1, 2, undefined])); // [ 1, 2 ]
console.log(bouncer([])); // []

//  node jsFundamentals\falsyChecker.js
