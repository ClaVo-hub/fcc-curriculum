function myReplace(str, word, replaceW) {
  if (/^[A-Z]/.test(word)) {
    replaceW = replaceW.charAt(0).toUpperCase() + replaceW.slice(1);
  } else {
    replaceW = replaceW.charAt(0).toLowerCase() + replaceW.slice(1);
  }

  return str.replace(word, replaceW);
}
