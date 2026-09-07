const lunches = [];

function addLunchToEnd(lunches, lunchItem) {
  lunches.push(lunchItem);
  console.log(`${lunchItem} added to the end of the lunch menu.`);
  return lunches;
}

function addLunchToStart(lunches, lunchItem) {
  lunches.unshift(lunchItem);
  console.log(`${lunchItem} added to the start of the lunch menu.`);
  return lunches;
}

function removeLastLunch(lunches) {
  let before = lunches.length;
  let removedItem = lunches.pop();
  let after = lunches.length;
  if (before > after && before !== 0) {
    console.log(`${removedItem} removed from the end of the lunch menu.`);
  } else if (before === 0) {
    console.log(`No lunches to remove.`);
  }
  return lunches;
}

function removeFirstLunch(lunches) {
  let before = lunches.length;
  let removedItem = lunches.shift();
  let after = lunches.length;
  if (before > after && before !== 0) {
    console.log(`${removedItem} removed from the start of the lunch menu.`);
  } else if (before === 0) {
    console.log(`No lunches to remove.`);
  }
  return lunches;
}

function getRandomLunch(lunches) {
  let arrayLength = lunches.length;
  let randomIndex = Math.floor(Math.random() * arrayLength);
  if (arrayLength > 0) {
    console.log(`Randomly selected lunch: ${lunches[randomIndex]}`);
  } else if (arrayLength === 0) {
    console.log("No lunches available.");
  }
}

function showLunchMenu(lunches) {
  let arrayLength = lunches.length;
  let joinM = lunches.join(", ");
  if (arrayLength > 0) {
    console.log(`Menu items: ${joinM}`);
  } else if (arrayLength === 0) {
    console.log("The menu is empty.");
  }
}

addLunchToEnd(lunches, "Tacos");
console.log(addLunchToEnd(["Pizza", "Tacos"], "Burger"));
addLunchToStart(lunches, "Sushi");
console.log(addLunchToStart(["Burger", "Sushi"], "Pizza"));

removeLastLunch([]);
removeLastLunch(["Stew", "Soup", "Toast"]);
console.log(removeLastLunch(["Sushi", "Pizza", "Noodles"]));

getRandomLunch([]);

showLunchMenu(["Greens", "Corns", "Beans"]);

const newM = ["Greens", "Corns", "Beans"];
getRandomLunch(newM);

/* node LunchPicker\index.js */
