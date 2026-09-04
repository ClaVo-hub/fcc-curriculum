function printCharacter(str) {
  for (const char of str) {
    console.log(char);
  }
}
printCharacter("hello");

function searchWordCounter(sentence, match) {
  let count = 0;
  for (const word of sentence) {
    if (word === match) {
      count++;
    }
    console.log(
      `Checking "${word}" against "${match}" | Running count: ${count}`,
    );
  }
  return `Total word count matched: ${count}`;
}

console.log(
  searchWordCounter(
    ["hello", "darling", "hello", "i", "what", "when", "darling", "i", "hello"],
    "hello",
  ),
);

/* end */

function getVowelCount(sentence) {
  let count = 0;
  const vowels = "aeiou";
  for (const char of sentence.toLowerCase()) {
    if (vowels.includes(char)) {
      count++;
    }
  }
  return count;
}

let vowelCount = getVowelCount(
  " A javaScript has opened a world of possibilities for me!",
);
console.log(`The Vowel Count Total is: ${vowelCount}`);

function getConsonantCount(sentence) {
  let count = 0;
  const consonant = "bcdfghjklmnpqrstvwxyz";
  for (const char of sentence.toLowerCase()) {
    if (consonant.includes(char)) {
      count++;
    }
  }
  return count;
}

let consonantCount = getConsonantCount(
  " A javaScript has opened a world of possibilities for me!",
);
console.log(`The Consonant Count Total is: ${consonantCount}`);

function getPunctuationCount(sentence) {
  let count = 0;
  const punc = `!.,?:[]{}\"'-;`;
  for (const char of sentence) {
    if (punc.includes(char)) {
      count++;
    }
  }
  return count;
}

let punctuationCount = getPunctuationCount("?...!");
console.log(`The Punctuation Count Total is: ${punctuationCount}`);

function getWordCount(sentence) {
  let count = 0;
  if (sentence.trim() === "") {
    return 0;
  }
  const words = sentence.trim().split(" ");
  for (let word of words) {
    if (words !== "") {
      count++;
    }
  }
  return count;
}

let wordCount = getWordCount("Hello, My name is Sarah!");
console.log(`The Word Count Total is: ${wordCount}`);

/* LAB create function to find word that is the longest inside a sentence */

function findLongestWordLength(sentence) {
  let count = 0;
  if (sentence.trim() === "") {
    return 0;
  }

  const words = sentence.trim().split(" ");
  for (let i = 0; i < words.length; i++) {
    let word = words[i].length;
    if (word > count) {
      count = word;
    }
  }
  return count;
}
//test funtion
console.log(
  findLongestWordLength("The quick brown fox jumped over the lazy dog"),
);
console.log(
  findLongestWordLength("The quick brown fox jumped over the lazy dog"),
);
console.log(findLongestWordLength("May the force be with you"));
/*Notes on how loops work, especially to this for loop in function 
if ["hello", "I", "wannna", "he", "uhigriwfboehfugwb"] in this case the function will stop after first iteration? 
because hello is larger than I and the last element is largest? or not?
A for loop always runs until it checks every single element in the array, one by one. 
Here is exactly what happens step-by-step with your example:
Step-by-Step Execution
Iteration 1 ("hello"): word is 5. Since 5 > 0, count becomes 5.
Iteration 2 ("I"): word is 1. Since 1 > 5 is false, the code ignores it. count stays 5.
Iteration 3 ("wannna"): word is 6. Since 6 > 5, count updates to 6.
Iteration 4 ("he"): word is 2. Since 2 > 6 is false, it is ignored. count stays 6.
Iteration 5 ("uhigriwfboehfugwb"): word is 17. Since 17 > 6, count updates to 17.
The loop finishes because it reached the end of the array, and the function correctly returns 17.
*/

/*================================================================
   Function  Get Factorial of one integer number - for user input. 
  ================================================================ */

let num = 5;

function factorialCalculator(num) {
  let result = 1;
  for (let count = 1; count <= num; count++) {
    result *= count;
  }
  return result;
}

let factorial = factorialCalculator(num);
let resultMsg = `Factorial of ${num} is ${factorial}`;
console.log(resultMsg);

/*================================================================
   Function  Create function that repeats strings x number of times (without using repeat built in function.
  ================================================================ */

function repeatStringNumTimes(string, num) {
  let result = "";
  for (let i = 0; i <= num; i++) {
    if (num <= 0) {
      result = "";
    } else if (i === 1) {
      result = string;
    } else if (i >= 2) {
      result = result + string;
    }
  }
  return result;
}

console.log(repeatStringNumTimes("*", 8));

/*
In this lab, you will create a function that repeats a given string a specific number of times. 
For the purpose of this lab, do not use the built-in .repeat() method.

Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:
You should create a function named repeatStringNumTimes that takes two parameters: a string and a number.
The function should return the string repeated the specified number of times.
If the number is less than or equal to zero, the function should return an empty string.
======================end =================================================================================================*/

/*================================================================
   Function - Missing Letter Detector 
  ================================================================ */

/*User Stories:

You should have a function named fearNotLetter.
The fearNotLetter function should accept one argument: a string representing a range of letters in alphabetical order which can have one letter missing.
The function should find the missing letter in the passed letter range and return it.
If all letters are present in the range, the function should return undefined. */

function fearNotLetter(string) {
  let alphabet = "abcdefghijklmnopqrstuvwxyz";
  for (let char of alphabet) {
    if (string.includes(char) === false) {
      return char;
    }
  }
  return "No fear, all letter are there!";
}

console.log(fearNotLetter("abcdefghijklmnopqrstuvwxyz")); // "No fear, all letter are there!"
console.log(fearNotLetter("abce")); // d
console.log(fearNotLetter("stvwx")); // a
