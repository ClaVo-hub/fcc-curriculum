function getIndexToIns(arr, num) {
  const index = arr
    .sort((a, b) => a - b)
    .findIndex((element) => element >= num);
  return index === -1 ? arr.length : index;
}

console.log(getIndexToIns([1, 2, 3, 4], 1.5)); // 1*
console.log(getIndexToIns([20, 3, 5], 19)); // 2*
console.log(getIndexToIns([10, 20, 30, 40, 50], 35)); // 3*
console.log(getIndexToIns([10, 20, 30, 40, 50], 30)); // 2*
console.log(getIndexToIns([40, 60], 50)); // 1*
console.log(getIndexToIns([3, 10, 5], 3)); // 0*
console.log(getIndexToIns([5, 3, 20, 3], 5)); // 2*
console.log(getIndexToIns([2, 20, 10], 19)); // 2*
console.log(getIndexToIns([3, 10, 5], 11)); // 3
console.log(getIndexToIns([], 5)); // 0
