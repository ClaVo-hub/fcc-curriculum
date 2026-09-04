/* 
node loanQuaChecker\index.js
*/
const annualHome = 130000;
const creditHome = 800;
const annualCondo = 90000;
const creditCondo = 700;
const annualCar = 60000;
const creditCar = 650;

function loanChecker(annual, credit) {
  if (annual >= annualHome && credit >= creditHome) {
    return "Congratulations! You qualify for a Home, Condo and Car loan!";
  } else if (annual >= annualCondo && credit >= creditCondo) {
    return "Congratulations! You qualify for a Condo and Car loan!";
  } else if (annual >= annualCar && credit >= creditCar) {
    return "Congratulations! You qualify for a car loan!";
  } else if (annual < annualCar && credit < creditCar) {
    return "Sorry! You do not qualify for any loans. Please review your total income and credit score.";
  }
}

let loanHomeMsg = loanChecker(145000, 820);
let loanCondoMsg = loanChecker(95000, 730);
let loanCarMsg = loanChecker(62000, 655);
let noLoanMsg = loanChecker(45000, 500);

console.log(loanHomeMsg);
console.log(loanCondoMsg);
console.log(loanCarMsg);
console.log(noLoanMsg);
