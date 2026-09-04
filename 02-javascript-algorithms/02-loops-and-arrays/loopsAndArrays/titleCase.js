function titleCase(str) {
  let arr = str.split(" ");
  let result = [];
  for (let element of arr) {
    let upper = element[0].toUpperCase();
    let final = element.slice(1).toLowerCase();
    result.push(upper + final);
  }
  return result.join(" ");
}

console.log(titleCase("I like to code")); // I Like To Code
console.log(titleCase("I'm a little tea pot")); // I'm A Little Tea Pot
console.log(titleCase("sHoRt AnD sToUt")); // Short And Stout
console.log(titleCase("HERE IS MY HANDLE HERE IS MY SPOUT")); // Here Is My Handle Here Is My Spout
