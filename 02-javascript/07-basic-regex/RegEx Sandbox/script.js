const regexPattern = document.querySelector("#pattern");
const caseInsensitiveFlag = document.querySelector("#i");
const globalFlag = document.querySelector("#g");
const stringToTest = document.querySelector("#test-string");
const testButton = document.querySelector("#test-btn");
const testResult = document.querySelector("#result");

const getFlags = () => {
let flags = '';
if (globalFlag.checked) flags += "g";
if (caseInsensitiveFlag.checked) flags += "i";
return flags;
}

testButton.addEventListener("click", () => {
  const flags = getFlags();
  const regex = new RegExp(regexPattern.value, flags);
  const orgText = stringToTest.innerHTML;

  stringToTest.innerHTML = orgText.replace(regex, '<span class="highlight">$&</span>');
  const matched = orgText.match(regex);
  testResult.innerText = matched ? matched.join(", ") : `no match`;
});

