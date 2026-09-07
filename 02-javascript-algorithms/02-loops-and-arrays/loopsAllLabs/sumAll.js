/* 
Thinking Cap On: (Notes on possible solutions)
1. What can be used to extract the number sequence between two numbers?
2. can maybe use the smallest number between the set of number and with every loop the smallest number 
get assign to a nextSeq number plus one assign to the next seqNum in each loop the use the seqNum to 
add to result variable and then get the sum of total. 
3. Used the for loop to iterate from the min number to the max number and add it to result. 

*/

function sumAll(arr) {
  let min = Math.min(arr[0], arr[1]); // 1
  let max = Math.max(arr[0], arr[1]); // 4
  let result = 0;
  for (min; min <= max; min++) {
    result += min;
  }
  return result;
}

console.log(sumAll([4, 1])); // 10
console.log(sumAll([1, 4])); // 10
console.log(sumAll([5, 10])); // 45
console.log(sumAll([10, 5])); //45
