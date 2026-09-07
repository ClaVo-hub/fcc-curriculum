/* In this workshop, you will leverage JavaScript to build a roster of astronauts for a space mission. */

// create empty array for your roster called squad.

/* Object: firstAstronaut with the following properties:
Key	Value
id	1
name	"Andy"
role	"Commander"
isEVAEligible	true
priority	3
*/

const squad = [];

const firstAstronaut = {
  id: 1,
  name: "Andy",
  role: "Commander",
  isEVAEligible: true,
  priority: 3,
};

function addCrewMember(crew, astronaut) {
  for (let i = 0; i < crew.length; i++) {
    if (crew[i] === astronaut.id) {
      console.log("Duplicate ID: " + astronaut.id);
      return;
    }
  }
  crew.push(astronaut);
}

addCrewMember(squad, firstAstronaut);

const remainingCrew = [
  { id: 2, name: "Bart", role: "Pilot", isEVAEligible: false, priority: 8 },
  {
    id: 3,
    name: "Caroline",
    role: "Engineer",
    isEVAEligible: true,
    priority: 4,
  },
  {
    id: 4,
    name: "Diego",
    role: "Scientist",
    isEVAEligible: false,
    priority: 1,
  },
  { id: 5, name: "Elise", role: "Medic", isEVAEligible: true, priority: 7 },
  { id: 6, name: "Felix", role: "Navigator", isEVAEligible: true, priority: 6 },
  {
    id: 7,
    name: "Gertrude",
    role: "Communications",
    isEVAEligible: false,
    priority: 4,
  },
  { id: 8, name: "Hank", role: "Mechanic", isEVAEligible: true, priority: 2 },
  {
    id: 9,
    name: "Irene",
    role: "Specialist",
    isEVAEligible: true,
    priority: 5,
  },
  {
    id: 10,
    name: "Joan",
    role: "Technician",
    isEVAEligible: false,
    priority: 1,
  },
];

/*log each astronaut members name */
for (let i = 0; i < remainingCrew.length; i++) {
  addCrewMember(squad, remainingCrew[i]);
}

function swapCrewMembers(crew, fromIndex, toIndex) {
  if (
    fromIndex < 0 ||
    fromIndex >= crew.length ||
    toIndex < 0 ||
    fromIndex >= crew.length
  ) {
    console.log("Invalid crew indices");
    return;
  }
  const updatedCrew = crew.slice();
  updatedCrew[fromIndex] = updatedCrew.splice(
    toIndex,
    1,
    updatedCrew[fromIndex],
  )[0];
  return updatedCrew;
}

const updatedSquad = swapCrewMembers(squad, 2, 5);

/* helper function for getEVAReadyCrew function below - called the bubble sort technique */
function sortByPriorityDescending(crew) {
  for (let i = 0; i < crew.length - 1; i++) {
    for (let j = 0; j < crew.length - 1 - i; j++) {
      if (crew[j].priority < crew[j + 1].priority) {
        const temp = crew[j];
        crew[j] = crew[j + 1];
        crew[j + 1] = temp;
      }
    }
  }
}

function getEVAReadyCrew(crew) {
  const eligible = [];
  for (const member of crew) {
    if (member.isEVAEligible === true) {
      eligible.push(member);
    }
  }
  sortByPriorityDescending(eligible);
  return eligible;
}

const EVAReadySquad = getEVAReadyCrew(updatedSquad);
for (let i = 0; i < EVAReadySquad.length; i++) {
  console.log(EVAReadySquad[i].name);
}

//Mission control has requested a new function for breaking down a crew into chunks of variable sizes.
// Create an empty function named chunkCrew that accepts two parameters, crew and size.
// validate if size is more than 1 , other wise exit function.

function chunkCrew(crew, size) {
  if (size < 1) {
    console.log(
      `The chunk size is: ${size}. Size must be greater than 1 (one)`,
    );
  }
  const chunk = [];
  for (let i = 0; i < crew.length; i += size) {
    chunk.push(crew.slice(i, i + size));
  }
  return chunk;
}

const EVAChunks = chunkCrew(EVAReadySquad, 3);
console.log("This is EVAChunks:");
console.log(EVAChunks);

/* You may have noticed that EVAChunks is essentially an array with arrays inside of it, or a two-dimensional (2D) array. 
A nested for loop can be used to log data from a 2D array:*/
for (let i = 0; i < EVAChunks.length; i++) {
  console.log(`Log Data with 2D Array: Chunk ${i + 1}: `);
  for (j = 0; j < EVAChunks[i].length; j++) {
    console.log(EVAChunks[i][j].name);
  }
}

/* last step is to create a summary report of the crew / squad */
function printCrewSummary(crew) {
  const sorted = crew.slice(); //create shallow copy of the array to sort is by priority
  sortByPriorityDescending(sorted);
  console.log(`Final Updates Astronauts Summary:`);
  console.log(
    `The list of the Astronauts names who are EVA Eligible and sorted by priority first is as follow:`,
  );
  for (let i = 0; i < sorted.length; i++) {
    console.log(sorted[i]["name"]);
  }
}
printCrewSummary(updatedSquad);

/* ======================================================Workshop Completed=====================================================*/

/* ==== new slpice Technique ==== */
/*The splice() method can modify arrays by adding or removing elements at any position, including the middle. 
Since splice() returns an array containing the removed elements, 
you can use it to swap two elements in an array without mutating the original.
This can be done in one line using the following technique: 

// swap elements at i and j without mutating the original
const copy = array.slice();
copy[i] = copy.splice(j, 1, copy[i])[0];
*/
//  indexNum = [ 0,  1,  2,  3]
const orgArr = [12, 97, 68, 55];
const copyArr = orgArr.slice(); // make a shallow copy of orginal array first
copyArr[1] = copyArr.splice(3, 1, copyArr[1])[0];
console.log(copyArr);
/* The technique, applied in the third line, works as follows:
splice(3, 1, copyArray[1]) removes the element at index 3 (55)
It inserts the element from copyArray[1] (97) into index 3
splice() returns [55], an array containing the removed element
[0] extracts 55 from that array
That value (55) is assigned back to copyArray[1], completing the swap */

/*============= Filter sort object with bubble sort - technique ==============*/
/*
Mission control has alerted you that the list of EVA-eligible astronauts should also be sorted by priority descending. 
There are a few ways to sort an array - perhaps the most basic is bubble sort.
Bubble sort works by repeatedly stepping through a list, comparing neighboring items, and swapping them if they’re in the wrong order. 
After each pass,the item that should come first based on your sort criteria moves closer to (or “bubbles” toward) its correct position in the array. 
Here is how you can sort crew by priority descending using bubble sort:

// Outer loop: controls how many passes we make
for (let i = 0; i < crew.length - 1; i++) {
  // Inner loop: compares neighboring items
  for (let j = 0; j < crew.length - 1 - i; j++) {
    // If current member has lower priority than next, swap
    if (crew[j].priority < crew[j + 1].priority) {
      // Using a temp variable for the swap
        const temp = crew[j];
        crew[j] = crew[j + 1];
        crew[j + 1] = temp;
    }
  }
}
 */

/* ========= technique: combine for loop and slice() method to create chunks of size n from an array ===========*/
//Mission control has requested a new function for breaking down a crew into chunks of variable sizes.
/* 
const result = [];
for (let i = 0; i < array.length; i += n) {
  result.push(array.slice(i, i + n));
}
The example above:
creates an empty array named result
loops through the original array in steps of size n
creates chunks from array of size n and pushes them into result using slice()
*/

/*========= new learning: A nested for loop can be used to log data from a 2D array: ========*/
/*
for (let i = 0; i < rootArray.length; i++) {
  console.log(`Group ${i + 1}:`);
  for (let j = 0; j < rootArray[i].length; j++) {
    console.log(rootArray[i][j].property);
  }
}
In the example above, 
rootArray is the main array, 
rootArray[i] is a sub-array inside of the main array, 
and rootArray[i][j] is one object inside of that sub-array 
and .property accesses a value in that object.
 */
