function sumFibs(num) {
  let a = 1;
  let b = 1;
  let sum = 1;
  while (b <= num) {
    // While process: b = 1 | b = 2 | b = 3 | b = 5 and num is 4 exit loop.
    if (b % 2 == 1) {
      // check if the number can be devided by 2 if 0 - even if 1 odd.
      sum += b; // 1 + 1 = 2 (sum) | skip(2/2=0) | sum2 + b3 = sum 5
    }
    let temp = b; // temp = 1; | temp = 2 | temp = 3 | temp = 5
    b = a + b; // a1 + b1 = 2 | a1 + b2 = b3 | a2 + b3 = b5 | a3 + b5 = 8
    a = temp; // a = 1 | a = 2 | a = 3 | a = 5
  }
  return sum; // return last sum number which is 5 in this case.
}

console.log(sumFibs(4)); // 5
console.log(sumFibs(1000)); // 1785
