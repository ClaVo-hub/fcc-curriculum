/*
node leapYearCalc\index.js
*/

let year = 1953;

function leapYear(year) {
  if (year % 400 === 0) {
    return `${year} is a leap year.`;
  } else if (year % 100 === 0) {
    return `${year} is not a leap year.`;
  } else if (year % 4 === 0) {
    return `${year} is a leap year!`;
  } else {
    return `${year} is not a leap year.`;
  }
}

let result = leapYear(year);
console.log(result);

function hi() {
  return "Hello";
  return "World!";
}
console.log(hi());

const divideTwoNumbers = (num1, num2) => num1 / num2;
console.log(divideTwoNumbers(3, 0));
