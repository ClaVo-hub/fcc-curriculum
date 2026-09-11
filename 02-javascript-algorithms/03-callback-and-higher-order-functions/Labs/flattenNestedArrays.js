function steamrollArray(arr) {
  return arr.reduce((acc, val) => {
    return acc.concat(Array.isArray(val) ? steamrollArray(val) : val);
  }, []);
}

console.log(steamrollArray([[["a"]], [["b"]]])); // [a, b]
console.log(steamrollArray([1, [2], [3, [[4]]]])); // [1, 2, 3, 4]
console.log(steamrollArray([1, [], [3, [[4]]]]));
console.log(steamrollArray([1, {}, [3, [[4]]]]));
