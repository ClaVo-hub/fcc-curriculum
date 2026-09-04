/* node loopsAllLabs\libraryCatalogSystem.js */
/*In this workshop, you will build a heritage library catalog system. 
You will parse raw book data, search and group entries, validate data quality, 
and export results to different formats.

Each catalog card is stored as a single string in the 
format "Title | Author | Year | Location", 
with fields separated by the pipe character (|).

You will use an array of these strings throughout the workshop to build 
and test your catalog functions. Create an array named rawCatalogCards 
and add the following two strings to it: 
"From a Buick 8 | King, Stephen | 2002 | Shelf K7",
"The Shining | King, Stephen | 1977 | Shelf K1"
*/
const rawCatalogCards = [
  "From a Buick 8 | King, Stephen | 2002 | Shelf K7",
  "The Shining | King, Stephen | 1977 | Shelf K1",
  "The Stand | King, Stephen | 1978 | Shelf K2",
  "It | King, Stephen | 1986 | Shelf K3",
  "Misery | King, Stephen | 1987 | Shelf K4",
  "Do Androids Dream of Electric Sheep? | Dick, Philip K. | 1968 | Shelf D5",
  "I, Robot | Asimov, Isaac | 1950 | Shelf A8",
  "Foundation | Asimov, Isaac | 1951 | Shelf A9",
  "Dune | Herbert, Frank | 1965 | Shelf H3",
  "Neuromancer | Gibson, William | 1984 | Shelf G8",
  "Snow Crash | Stephenson, Neal | 1992 | Shelf S6",
  "The Martian | Weir, Andy | 2011 | Shelf W5",
  "Ender's Game | Card, Orson Scott | 1985 | Shelf C2",
  "The Hitchhiker's Guide to the Galaxy | Adams, Douglas | 1979 | Shelf A1",
  "Ready Player One | Cline, Ernest | 2011 | Shelf C7",
  "The Dark Tower: The Gunslinger | King, Stephen | 1982 | Shelf K5",
  // edge cases: missing data
  "Unknown Title |  | 1975 | Shelf X1",
  "Mysterious Manuscript | Unknown Author |  | Shelf Z9",
  "Ancient Scroll | Anonymous | 850 | ",
];

/*parseCard will take a raw catalog string and return a structured object with 
four properties: title, author, year, and location. 
For now, create a function parseCard with a parameter named rawString. */

function parseCard(rawString) {
  // first convert string into array
  const parts = rawString.split("|");
  // Then loop through each nested array inside the original array to remove whitespace and push it inside new array.
  const trimmedParts = [];
  for (let i = 0; i < parts.length; i++) {
    trimmedParts.push(parts[i].trim());
  }
  // to convert the trimmedParts array index values into an object with property names relevant to the value of array index no.
  // I used array destructuring, but the workshop declared each array and assigned it the array[indexNo] bracket notation method to assign value to variable
  const title = trimmedParts[0];
  const author = trimmedParts[1];
  const year = trimmedParts[2];
  const location = trimmedParts[3];
  // turning the array into with variables name and it index values into objects where varName become PropName and IndexVal becomes PropValue.
  return {
    title: title || "Unknown", // using OR operator to return a truthy value of "unknown" if the title value is falsy.
    author: author || "Unknown",
    year: year ? parseInt(year) : "Unknown", // using ternary operator to either convert string value into number using parseInt or if string
    // does not contain a number at the beginning of the string - will return false and will display - "unknown"
    location: location || "Unknown",
  };
}

/* test your function during process of writing code:
let cardResult = parseCard(rawCatalogCards[2]);
console.log(cardResult); */

/* helper function to search it by field for main function*/
function parseCatalog(rawCards) {
  const catalog = [];
  // add a for loop inside the function that iterates over rawCards.
  // Inside the loop, call parseCard on each element and push the result into catalog.
  for (let i = 0; i < rawCards.length; i++) {
    catalog.push(parseCard(rawCards[i]));
  }
  return catalog;
}
/* test your function during process: */
const catalog = parseCatalog(rawCatalogCards);
// console.log(catalog.length); // returns the count of cards

/*With the catalog parsed, you can search it by field. findByAuthor will filter entries whose author contains a search term. */
function findByAuthor(catalog, author) {
  const searchTerm = author.toLowerCase(); //make the search term author parameter case-insensitive
  const results = [];
  for (let i = 0; i < catalog.length; i++) {
    if (catalog[i].author.toLowerCase().includes(searchTerm)) {
      results.push(catalog[i]);
    }
  }
  return results;
}

/*test your function during process: 
const kingBooks = findByAuthor(catalog, "king");
console.log(kingBooks.length);
for (let i = 0; i < kingBooks.length; i++) {
  console.log(`${kingBooks[i].title} (${kingBooks[i].year})`);
} */

/*--- Function Group by Decade ---*/
function groupByDecade(catalog) {
  const grouped = {}; // store all functions inside the grouped variable OBJECT for final result.

  //add all unknown published year in one group before grouping decades
  for (let i = 0; i < catalog.length; i++) {
    const book = catalog[i]; // store each iteration of each book inside the variable and loop for output storage if match is found.
    if (book.year === "Unknown") {
      // confirms if certain book (1 card) property year is unknown. if true below if statement
      if (!grouped["Unknown"]) {
        // search if object named grouped has the property Unknown and if true execute block of code.
        grouped["Unknown"] = []; // creates an Unknown section of books, where year is not available. If already available, if statement will not execute (no truthy value)
      }
      grouped.Unknown.push(book); // and stores all books with no year specified in that property
      continue; // to ensure the loop continues after the Unknown books are grouped in Unknown property?
    }
    const decade = Math.floor(book.year / 10) * 10; // math to set each decade (10years apart) and search for inbetween number of that decade?
    const decadeKey = `${decade}s`;
    if (!grouped[decadeKey]) {
      grouped[decadeKey] = []; // create each inner object array for each decade.
    }
    grouped[decadeKey].push(book); // sort the books into relevant decade.
  }
  return grouped;
}

/* test function */
const byDecade = groupByDecade(catalog);
// console.log(byDecade);

/*--- renderEntry - Library Card (kinda cool) ----*/
function renderEntry(entry) {
  const title = entry.title;
  const author = entry.author;
  const year = entry.year;
  const location = entry.location;
  return `
${"-".repeat(25)}
Title: ${title}
Author: ${author}
Year: ${year}
Location: ${location}
${"-".repeat(25)}`;
}

//console.log(renderEntry(catalog[0])); //test

function validateEntry(entry) {
  let isValid = true;
  if (!("title" in entry) || !entry.title || entry.title === "Unknown") {
    isValid = false;
  }
  if (!("author" in entry) || !entry.author || entry.author === "Unknown") {
    isValid = false;
  }
  if (!("year" in entry) || !entry.year || entry.year === "Unknown") {
    isValid = false;
  }
  if (
    !("location" in entry) ||
    !entry.location ||
    entry.location === "Unknown"
  ) {
    isValid = false;
  }
  return isValid;
}
//console.log(validateEntry(catalog[0])); //test
//console.log(validateEntry(catalog[16])); //test

function exportToJSON(catalog) {
  return JSON.stringify(catalog, null, 2);
}
//return first 2 object properties using JSON function and slice method - test
// console.log(exportToJSON(catalog.slice(0, 2))); //test

function exportToCSV(catalog) {
  const header = "Title,Author,Year,Location";
  const rows = [];
  for (let i = 0; i < catalog.length; i++) {
    const entry = catalog[i];
    rows.push(
      `"${entry.title}","${entry.author}",${entry.year},"${entry.location}"`,
    );
  }
  let csv = header;
  for (let i = 0; i < rows.length; i++) {
    csv = csv + "\n" + rows[i];
  }
  return csv;
}

console.log(exportToCSV(catalog));
