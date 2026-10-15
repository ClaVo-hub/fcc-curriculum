/* 
Thinking Cap On: (Notes on possible solutions)
1. use math random and math floor inside a for loop with specified length to 
concat each random indexed character from valid set characters string assigned to result variable.
*/

function generatePassword(len) {
  let chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  let charLen = chars.length;
  let result = "";
  let ind;
  for (let i = 0; i < len; i++) {
    ind = Math.floor(Math.random() * charLen);
    if (result === "") {
      result = chars[ind];
    } else {
      result += chars[ind];
    }
  }
  return result;
}

let password = generatePassword(8);
console.log(`Generated password: ${password}`);
