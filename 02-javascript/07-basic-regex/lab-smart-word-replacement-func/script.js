function myReplace(str, word, replaceW) {
  const regex = /\b[A-Z]\w*/;
  const checkWord = regex.test(word);
  const checkReplace = regex.test(replaceW);

  if (!checkWord && !checkReplace) {
    return str.replace(word, replaceW);
  } else if (!checkWord && checkReplace) {
    const lower = replaceW.toLowerCase();
    console.log(lower);
    return str.replace(word, lower);
  } else {
    const upper =
      replaceW.charAt(0).toUpperCase() + replaceW.slice(1).toLowerCase();
    return str.replace(word, upper);
  }
}

console.log(myReplace("Let us go to the store", "store", "mall")); // Let us go to the mall
console.log(myReplace("He is Sleeping on the couch", "Sleeping", "sitting")); // He is Sitting on the couch
console.log(myReplace("I think we should look up there", "up", "Down")); //I think we should look down there
console.log(myReplace("This has a spellngi error", "spellngi", "spelling")); // This has a spelling error
console.log(myReplace("His name is Tom", "Tom", "john")); // His name is John
console.log(
  myReplace("Let us get back to more Coding", "Coding", "algorithms"),
); // Let us get back to more Algorithms
