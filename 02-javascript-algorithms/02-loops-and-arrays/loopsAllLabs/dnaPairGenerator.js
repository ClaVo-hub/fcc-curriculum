/* ===================================
     Implement a DNA Pair Generator
   ===================================
   In the double helix of the DNA, the bases are always paired together: 
   if on one strand there is an A base, on the other strand directly in 
   front there is a T base, the other pair is C and G

   For example, for the input ATCG, return [["A", "T"], ["T", "A"], ["C", "G"], ["G", "C"]]
    A base gets paired with a T base
    T base is paired with a A base
    C is paired with the G base
    G base is paired with a C base
 */

/* ============================================================
       Thinking Cap On: (Notes on possible solutions)
   ============================================================
    1. Declare and assign each base to a variable and an empty array result variable.
    2. use for...of loop to iterate through each character in the string passed in argument.
    3. using if else if statement to assign the entire base array if matched with number.
    4. return result.
*/

function pairElement(string) {
  let result = [];
  for (const char of string) {
    if (char === "A") {
      result.push(["A", "T"]);
    } else if (char === "T") {
      result.push(["T", "A"]);
    } else if (char === "C") {
      result.push(["C", "G"]);
    } else if (char === "G") {
      result.push(["G", "C"]);
    }
  }
  return result;
}

/* test */
console.log(pairElement("ATCGA")); // [["A","T"],["T","A"],["C","G"],["G","C"],["A","T"]]
console.log(pairElement("TTGAG")); // [["T","A"],["T","A"],["G","C"],["A","T"],["G","C"]]
console.log(pairElement("CTCTA")); // [["C","G"],["T","A"],["C","G"],["T","A"],["A","T"]]
