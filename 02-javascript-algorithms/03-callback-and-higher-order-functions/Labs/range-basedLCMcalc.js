// range-basedLCMcalc.js

function smallestCommons(num1, num2) {
  const min = Math.min(num1, num2);
  const max = Math.max(num1, num2);

  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

  const lcm = (a, b) => (a * b) / gcd(a, b);

  let currentLCM = min;
  for (let i = min; i <= max; i++) {
    currentLCM = lcm(currentLCM, i);
  }

  return currentLCM;
}
