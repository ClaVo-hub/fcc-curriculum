const msgInput = document.querySelector("#msg-input");
const msgBtn = document.querySelector("#check-msg-btn");
const result = document.querySelector("#result-msg");

const helpRegex = /please help|assist me/i;
const dollarRegex = /[0-9]+\s*(?:hundred|thousand|million|billion)?\s+dollars/i;
const freeRegex = /(?:^|\s)fr[e3][e3] m[o0]n[e3]y(?:$|\s)/i;
const stockRegex = /(?:^|\s)[s5][t7][o0][c{[(]k [a@4]l[e3]r[t7](?:$|\s)/i;
const dearRegex = /(?:\s|^)d[e3][a@4]r fr[i1|][e3]nd(?:\s|$)/i;

const denyList = [helpRegex, dollarRegex, freeRegex, stockRegex, dearRegex];

const isSpam = (msg) => denyList.some((regex) => regex.test(msg));

msgBtn.addEventListener("click", () => {
  if (msgInput.value === "") {
    alert("Please enter a message.");
    return;
  }
  result.textContent = isSpam(msgInput.value)
    ? "Oh no! This looks like a spam message."
    : "This message does not seem to contain any spam.";
  msgInput.value = "";
});
