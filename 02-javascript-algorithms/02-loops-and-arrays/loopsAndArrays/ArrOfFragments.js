const shuffledFragments = [
  {
    id: 15,
    text: "and, after a time, passed the place where the Hare was sleeping.",
  },
  { id: 12, text: "he lay down beside the course to take a nap" },
  ,
  {
    id: 11,
    text: "and to make the Tortoise feel very deeply how ridiculous it was for him to try a race with a Hare,",
  },
  { id: 7, text: "but for the fun of the thing he agreed." },
  { id: 19, text: "The Hare now ran his swiftest," },
  ,
  {
    id: 1,
    text: "A Hare was making fun of the Tortoise one day for being so slow.",
  },
  { id: 14, text: "The Tortoise meanwhile kept going slowly but steadily," },
  { id: 9, text: "marked the distance and started the runners off." },
  ,
  { id: 5, text: "I'll run you a race and prove it.\"" },
  { id: 17, text: "and when at last he did wake up," },
  { id: 2, text: '"Do you ever get anywhere?" he asked with a mocking laugh.' },
  { id: 12, text: "he lay down beside the course to take a nap" },
  ,
  { id: 8, text: "So the Fox, who had consented to act as judge," },
  { id: 20, text: "but he could not overtake the Tortoise in time." },
  { id: 5, text: "I'll run you a race and prove it.\"" },
  {
    id: 6,
    text: "The Hare was much amused at the idea of running a race with the Tortoise,",
  },
  ,
  { id: 13, text: "until the Tortoise should catch up." },
  { id: 10, text: "The Hare was soon far out of sight," },
  { id: 12, text: "he lay down beside the course to take a nap" },
  { id: 18, text: "the Tortoise was near the goal." },
];

function compactFragments(fragments) {
  let result = [];
  for (let i = 0; i < fragments.length; i++) {
    if (fragments[i] !== undefined) {
      result.push(fragments[i]);
    } else {
      console.log("[COMPACTED]");
    }
  }
  return result;
}

let compactedShuffledFragments = compactFragments(shuffledFragments);

function sortFragments(compactedFragments) {
  const arr = [...compactedFragments];
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j].id > arr[j + 1].id) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

let sortedFragments = sortFragments(compactedShuffledFragments);

function dedupeFragments(sorted) {
  let result = [];
  for (let i = 0; i < sorted.length; i++) {
    let current = sorted[i];
    if (result.length > 0 && result[result.length - 1].id === current.id) {
      console.log("[DEDUPED]");
    } else {
      result.push(current);
    }
  }
  return result;
}

let dedupedFragments = dedupeFragments(sortedFragments);

function fillMissingFragments(fragments) {
  let result = [];
  let i = 0;
  let expectedId = fragments[0].id;
  while (i < fragments.length) {
    let current = fragments[i];
    let placeholder;
    if (current.id === expectedId) {
      result.push(current);
      i++;
      expectedId++;
    } else {
      placeholder = { id: expectedId, text: "[...]" };
      console.log("[FILLED]");
      result.push(placeholder);
      expectedId++;
    }
  }
  return result;
}

let filledFragments = fillMissingFragments(dedupedFragments);

function assembleStory(fragments) {
  let result = [];
  let fragment;
  for (let i = 0; i < fragments.length; i++) {
    fragment = fragments[i].text;
    result.push(fragment);
  }
  return result.join("\n");
}

console.log(
  assembleStory([
    { id: 1, text: "Hello" },
    { id: 2, text: "World" },
  ]),
);
console.log(assembleStory(filledFragments));
