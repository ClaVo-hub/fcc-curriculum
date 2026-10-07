const instrumentsArr = [
  { category: "woodwinds", instrument: "Flute", price: 500 },
  { category: "woodwinds", instrument: "Clarinet", price: 200 },
  { category: "woodwinds", instrument: "Oboe", price: 4000 },
  { category: "brass", instrument: "Trumpet", price: 200 },
  { category: "brass", instrument: "Trombone", price: 300 },
  { category: "brass", instrument: "French Horn", price: 4300 },
  { category: "percussion", instrument: "Drum Set", price: 500 },
  { category: "percussion", instrument: "Xylophone", price: 3000 },
  { category: "percussion", instrument: "Cymbals", price: 200 },
  { category: "percussion", instrument: "Marimba", price: 3000 },
];

const selectContainer = document.querySelector(".select-container");
const productsContainer = document.querySelector(".products-container");

/*Within your new function, you need to filter the instruments depending on the selected category.

Filter out items from instrumentsArr and make your function return an array containing the instrument 
objects with the same category of instrumentCategory. If instrumentCategory is equal to all, return 
the whole instrumentsArr array.

Then, remove the console.log from the callback of your event listener and log the result of calling
 instrumentCards with the selected option from the dropdown menu as argument so you can test your 
function selecting different category options.*/

function instrumentCards(instrumentCategory) {
  //FCC clean code solution
  const instruments =
    instrumentCategory === "all"
      ? instrumentsArr
      : instrumentsArr.filter(
          ({ category }) => category === instrumentCategory,
        );
  /*My orginal for filtering via selected item solution above FCC uses tenary operator.
  if (instrumentCategory === "all") {
    return instrumentsArr;
  } else {
    return instrumentsArr.filter(
      (instrument) => instrument.category === instrumentCategory,
    );
  }
*/
  /*Currently, your instrumentCards function returns an array with instrument objects, 
so you'll need another couple of steps before you can display your instrument cards on the page.
Modify your function so that it returns an array of strings containing the HTML code to display 
the instrument cards, each string corresponding to an object in the instruments array. 
The strings should have this format <div class="card"><h2>[instrument]</h2><p>$[price]</p></div> */

  return instruments
    .map(
      (card) =>
        `<div class="card"><h2>${card.instrument}</h2><p>$${card.price}</p></div>`,
    )
    .join("");

  /*When you select a category from the dropdown menu, the instrument cards are correctly filtered and displayed on the page, but you have to get rid of those commas in between the cards.

Do it by joining the array returned by instrumentCards. With that, your music instrument filter is complete. */
}

/*=================================================================
   testing function with change event object in event listener 
  ================================================================= */
/*As you learned in previous lessons, the change event is triggered when
 the user modifies the value of certain input elements. You want to be able
 to update your page any time that a new value is picked from the dropdown menu.
 For that, add an event listener for the change event to selectContainer.
*/
selectContainer.addEventListener("change", (event) => {
  // console.log(`${selectContainer.value}`); // learned to use .value property from the select element in HTML.
  // console.log(instrumentCards(selectContainer.value)); // testing if filter function works in console.
  productsContainer.innerHTML = instrumentCards(selectContainer.value);
});
