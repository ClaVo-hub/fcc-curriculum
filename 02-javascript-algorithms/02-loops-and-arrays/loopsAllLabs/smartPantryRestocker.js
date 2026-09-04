// node loopsAllLabs\smartPantryRestocker.js
// small pantry management program using basic JavaScript concepts like:
// arrays, objects, loops, and conditionals.
/* You will simulate receiving a shipment of pantry items, 
deciding what to do with each item, and organizing the results for storage. 
The rawData array contains pipe-separated strings with the format sku|name|qty|expires|zone, 
where zone is optional.*/

const pantry = [
  {
    sku: "A10",
    name: "Tomatoes",
    qty: 4,
    expires: "2027-01-01",
    zone: "fridge",
  },
  {
    sku: "D43",
    name: "Pineapples",
    qty: 2,
    expires: "2020-01-01",
    zone: "general",
  },
];

const rawData = [
  "A10|Tomatoes|5|2027-01-01",
  "B21|Bananas|10|2027-01-01",
  "C32|Eggs|3|2027-01-01|fridge",
  "C32|Eggs|3|2027-01-01",
  "D43|Pineapples|0|2027-01-01",
  "E54|Peppers|-1|2027-01-01|fridge",
];

/*Recommended Function Structure 
Initialize an empty output array result = [].
Initialize a way to track used SKUs (e.g., const seenSkus = new Set()).
Loop through rawData:
Split the current string by |.
Destructure [sku, name, qty, expires, zone = "general"].
Check for duplicate sku: If already seen, skip to the next iteration.
Track sku: Mark this sku as seen.
Create object: { sku, name, qty: Number(qty), expires, zone }.
Push object into result.
Return result after the loop finishes.*/

function parseShipment(rawData) {
  const result = [];
  const seenSkus = new Set();
  for (const entry of rawData) {
    const [sku, name, qty, expires, zone = "general"] = entry.split("|");
    if (seenSkus.has(sku)) {
      continue;
    } else {
      seenSkus.add(sku);
    }
    result.push({ sku, name, qty: parseInt(qty), expires, zone });
  }
  return result;
}

console.log(parseShipment(rawData));

/*You should implement a planRestock(pantry, shipment) function that compares the current pantry with the incoming shipment and returns an array of actions in the form { type, item }, where type is one of "restock", "discard", or "donate", and item is the parsed shipment object.

The pantry parameter is an array of objects with the same shape as a parsed shipment item ({ sku, name, qty, expires, zone }).

If a shipment item has a qty of 0 or less, the action type should be "discard", regardless of whether the item exists in the pantry.
Otherwise, if the shipment item's sku already exists in the pantry, the action type should be "restock".
Otherwise (the shipment item's sku does not exist in the pantry), the action type should be "donate".
 */
function planRestock(pantry, shipment) {
  const actions = [];
  for (const item of shipment) {
    let actionType = "";
    if (item.qty <= 0) {
      actionType = "discard";
    } else if (pantry.some((itemP) => itemP.sku === item.sku)) {
      actionType = "restock";
    } else {
      actionType = "donate";
    }
    actions.push({ type: actionType, item: item });
  }
  return actions;
}

/* You should implement a groupByZone(actions) function that groups the actions into storage zones based on each item's zone property. 
The function should return an object where each key is a zone name and the value is an array of actions belonging to that zone. 
For example, if actions contain items with zones "fridge" and "pantry", the result should be 
{ fridge: [...], pantry: [...] }.*/

function groupByZone(actions) {
  const grouped = {};
  for (const action of actions) {
    const zone = action.item.zone;
    if (!grouped[zone]) {
      grouped[zone] = [];
    }
    grouped.zone.push(action);
  }
  return grouped;
}

/*You should implement a clonePantry(pantry) function that 
returns a deep copy of the pantry so planning changes do not affect the original list. 
A deep copy means creating a new array with new objects, 
so modifying the copy does not change the original pantry.
 */

function clonePantry(pantry) {
  return JSON.parse(JSON.stringify(pantry));
}
