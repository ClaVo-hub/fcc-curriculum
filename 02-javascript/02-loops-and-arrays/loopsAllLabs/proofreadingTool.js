// node loopsAllLabs\proofreadingTool.js

/*================================================================================
In this lab, you will build a proofreading tool that analyzes arrays of words for 
palindromes and repeated phrases.
===================================================================================*/

/*-------------------------------------------------------------------------------------------
User Stories:

You should define a function named isPalindrome that takes a word string as its argument. 
It should return true if the word reads the same forwards and backwards (case-insensitive), 
and false otherwise.

A palindrome is a word that reads the same forwards and backwards. 
For example, "racecar" and "level" are palindromes, but "hello" is not.
-----------------------------------------------------------------------------------------------*/
function isPalindrome(word) {
  const lowerWord = word.toLowerCase(); //manipulated the string by converting all letters to lowercase for further operations.
  const reverseWord = lowerWord.split("").reverse().join(""); // reverses the word to see to use for further condition operations below.
  return lowerWord === reverseWord; // both case-insensitive above results are checked for strict equality and returns true if its indeed a palindrome and false if not.
}

/*test function with sample word */
const word = "LeVel";
console.log(isPalindrome(word));
//output : true

/*-------------------------------------------------------------------------------------------
You should define a function named findPalindromeBreaks that takes a words array as its argument. 
It should return an array of indices of words that are not palindromes. 
It should return an empty array if the input is empty.
-----------------------------------------------------------------------------------------------*/
function findPalindromeBreaks(words) {
  const indices = [];
  for (let i = 0; i < words.length; i++) {
    //loops through each element within the words array.
    if (!isPalindrome(words[i])) {
      // words[i] = the value of i index within the array to check against above function.
      indices.push(i); // i = indexes
    }
  }
  return indices; // after each is found the array will return each i = index number.
  // if none of the words are not palindromes it will return exit loop and return an empty indices array initialized above.
}
/*test function with sample words */
const sampleWords1 = ["radar", "hello", "Level", "world", "noon"];
console.log(findPalindromeBreaks(sampleWords1));
// [1, 3, 5]

/*-------------------------------------------------------------------------------------------
You should define a function named findRepeatedPhrases that takes a words array and a 
phraseLength number as arguments. 
It should return an array of all start indices where a sequence of phraseLength consecutive 
words appears more than once in the array — including the index of the first occurrence. 
It should return an empty array if phraseLength is greater than or equal to the length of words. 
Overlapping sequences should also be counted.

A phrase is a sequence of consecutive words. For example, 
in ["the", "cat", "sat", "the", "cat"], 
the phrase "the cat" (a sequence of 2 words) appears at positions 0 and 3.
-----------------------------------------------------------------------------------------------*/
// Notes: struggled with this function
function findRepeatedPhrases(words, phraseLength) {
  // 1. Guard clause: If phraseLength is too big for the words array, return an empty array [] immediately
  if (phraseLength >= words.length) {
    return [];
  }

  // 2. Initialize an empty object to store phrases and their starting indices
  let phraseMap = {};

  // 3. Initialize an empty array to hold our final answer (indices of repeated phrases)
  let result = [];

  // --- LOOP 1: Scans through the 'words' array to build the 'phraseMap' ---
  for (let i = 0; i <= words.length - phraseLength; i++) {
    // i <= words.length - phraseLength; ensure that it does not cut the 2 words beyond the last index.
    // Create a phrase by cutting out 'phraseLength' words starting at index 'i', joined with spaces
    const phrase = words.slice(i, i + phraseLength).join(" ");

    // If this phrase isn't in 'phraseMap' yet, create an empty array for it
    if (!phraseMap[phrase]) {
      phraseMap[phrase] = [];
    }

    // Record the current index 'i' into the array for this phrase
    phraseMap[phrase].push(i);
  }

  // --- LOOP 2: Scans through the 'phraseMap' object to find duplicates ---
  for (const phrase in phraseMap) {
    // If the array of indices for a phrase has more than 1 item, it means the phrase repeated!
    if (phraseMap[phrase].length > 1) {
      // Spread (...) and push all stored indices for this repeating phrase into 'result'
      result.push(...phraseMap[phrase]);
    }
  }

  // 4. Return the final array of repeating start indices
  return result;
}

/* test function with example array of words and phraseLength */
const sampleWords = ["the", "cat", "sat", "the", "cat"];
console.log(findRepeatedPhrases(sampleWords, 2));
// Output: [0, 3]

/* Function explained: how the loops work.
Explanation of the Two Loops
Think of this function as a two-step assembly line:

 Loop 1: Collecting Information (for (let i = 0; ... ))
What it loops through: The numerical indices (0, 1, 2, 3...) of the words array.
Goal: Build the phraseMap dictionary object.
Walkthrough with ["the", "cat", "sat", "the", "cat"]:
When i = 0: Slices "the cat". Adds 0 to phraseMap["the cat"] ➔ { "the cat": [0] }
When i = 1: Slices "cat sat". Adds 1 to phraseMap["cat sat"] ➔ { "the cat": [0], "cat sat": [1] }
When i = 2: Slices "sat the". Adds 2 to phraseMap["sat the"] ➔ { ... "sat the": [2] }
When i = 3: Slices "the cat". Adds 3 to phraseMap["the cat"] ➔ { "the cat": [0, 3], ... }
When Loop 1 finishes, phraseMap looks like this:
{
  "the cat": [0, 3],
  "cat sat": [1],
  "sat the": [2]
}

 Loop 2: Filtering the Results (for (const phrase in phraseMap))
What it loops through: The keys (the phrase strings) of the phraseMap object ("the cat", "cat sat", "sat the").
Goal: Find which phrases appeared more than once and extract their indices into result.
Walkthrough:
1st Key ("the cat"): phraseMap["the cat"] is [0, 3]. Length is 2 (which is > 1). Push 0 and 3 into result.
2nd Key ("cat sat"): phraseMap["cat sat"] is [1]. Length is 1 (not > 1). Skip.
3rd Key ("sat the"): phraseMap["sat the"] is [2]. Length is 1 (not > 1). Skip.
When Loop 2 finishes, result is [0, 3].
*/

/*-------------------------------------------------------------------------------------------
You should define a function named analyzeTexts that takes a texts array and a phraseLength 
number as arguments. 
It should process each element of texts (each an array of words) and return an array of objects, 
each with repeatedPhrases and palindromeBreaks properties. It should return an empty array if 
texts is empty.
-----------------------------------------------------------------------------------------------*/
function analyzeTexts(texts, phraseLength) {
  const result = [];
  for (const arrayWords of texts) {
    result.push({
      repeatedPhrases: findRepeatedPhrases(arrayWords, phraseLength),
      palindromeBreaks: findPalindromeBreaks(arrayWords),
    });
  }
  return result;
}

/*test function with sample texts */
const sampleTexts = [
  ["radar", "hello", "Level", "world", "noon"],
  ["the", "cat", "sat", "the", "cat"],
];

console.log(analyzeTexts(sampleTexts, 2));
/* output: 
[
  {
    repeatedPhrases: [],
    palindromeBreaks: [1, 3]
  },
  {
    repeatedPhrases: [0, 3],
    palindromeBreaks: [0, 1, 2, 3, 4]
  }
]
*/
