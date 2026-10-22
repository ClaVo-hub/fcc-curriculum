const txt = document.querySelector("#text-input");
const btn = document.querySelector("#check-btn");
const result = document.querySelector("#result");

const isPalindrome = (word) => {
  const cleanWord = word.replace(/[^A-Za-z0-9]/gi, "").toLowerCase();
  const reverseWord = cleanWord.split("").reverse().join("");
  return cleanWord === reverseWord;
};

const checkInput = () => {
  const inputOrg = txt.value;
  if (inputOrg === "") {
    alert("Please input a value");
    return;
  }
  result.textContent = isPalindrome(inputOrg)
    ? `${inputOrg} is a palindrome`
    : `${inputOrg} is not a palindrome`;

  txt.value = "";
};

btn.addEventListener("click", checkInput);

txt.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkInput();
  }
});
