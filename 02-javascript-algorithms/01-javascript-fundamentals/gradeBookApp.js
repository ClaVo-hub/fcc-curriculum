// node jsFundamentals\gradeBookApp.js

function getAverage(scores) {
  const count = scores.length;
  let result = scores[0];
  for (let i = 1; i < scores.length; i++) {
    result += scores[i];
  }
  return result / count;
}

/* test function */

function getGrade(score) {
  switch (true) {
    case score === 100:
      return "A+";
      break;
    case score >= 90:
      return "A";
      break;
    case score >= 80:
      return "B";
      break;
    case score >= 70:
      return "C";
      break;
    case score >= 60:
      return "D";
      break;
    default:
      return "F";
  }
}

/* test function */

function hasPassingGrade(score) {
  return getGrade(score) !== "F" ? true : false;
}

function studentMsg(scores, studentScore) {
  if (hasPassingGrade(studentScore)) {
    return `Class average: ${getAverage(scores)}. Your grade: ${getGrade(studentScore)}. You passed this course!`;
  } else {
    return `Class average: ${getAverage(scores)}. Your grade: ${getGrade(studentScore)}. You failed this course!`;
  }
}

/* test final function */

console.log(studentMsg([92, 88, 12, 77, 57, 100, 67, 38, 97, 89], 37));
console.log(studentMsg([56, 23, 89, 42, 75, 11, 68, 34, 91, 19], 100));
console.log(studentMsg([12, 22, 32, 42, 52, 62, 72, 92], 85));
console.log(studentMsg([15, 25, 35, 45, 55, 60, 70, 60], 75));
