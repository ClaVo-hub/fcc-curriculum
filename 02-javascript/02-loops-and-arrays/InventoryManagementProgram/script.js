let inventory = [];

function findProductIndex(productName) {
  if (inventory.length === 0) {
    return -1;
  }
  let lower = productName.toLowerCase();
  for (let i = 0; i < inventory.length; i++) {
    if (lower === inventory[i].name) {
      return i;
    }
  }
  return -1;
}

function addProduct(product) {
  let name = product.name.toLowerCase();
  let found = false;
  for (let i = 0; i < inventory.length; i++) {
    if (inventory[i].name === name) {
      inventory[i].quantity += Number(product.quantity);
      found = true;
      console.log(name + " quantity updated");
      break;
    }
  }
  if (!found) {
    product.name = name;
    inventory.push(product);
    console.log(name + " added to inventory");
  }
  return inventory;
}

function removeProduct(name, qty) {
  let found = false;
  let lower = name.toLowerCase();
  let index = -1;
  for (let i = 0; i < inventory.length; i++) {
    if (lower === inventory[i].name) {
      index = i;
      if (inventory[index].quantity - qty > 0) {
        inventory[index].quantity -= qty;
        found = true;
        console.log(`Remaining ${lower} pieces: ${inventory[index].quantity}`);
        break;
      } else if (inventory[index].quantity - qty === 0) {
        inventory.splice(index, 1);
        found = true;
        break;
      } else if (inventory[index].quantity - qty < 0) {
        found = true;
        console.log(
          `Not enough ${lower} available, remaining pieces: ${inventory[index].quantity}`,
        );
        break;
      }
    }
  }
  if (!found) {
    console.log(`${lower} not found`);
  }
}

// Test each function - addProduct Funtion
addProduct({ name: "sony wh-1000xm5", quantity: 12 });
addProduct({ name: "logitech mx master 3s", quantity: 25 });
addProduct({ name: "anker prime 20k powerbank", quantity: 8 });
addProduct({ name: "elgato stream deck mk.2", quantity: 15 });
addProduct({ name: "keychron k2 v2 vmechanical keyboard", quantity: 6 });

// Test findProductIndex Function
// 1. Exact match (Expected output: 1)
console.log(findProductIndex("logitech mx master 3s"));
// 2. Case-insensitive match (Expected output: 0)
console.log(findProductIndex("SONY WH-1000XM5"));
// 3. Match from the bottom of the list (Expected output: 4)
console.log(findProductIndex("keychron k2 v2 vmechanical keyboard"));
// 4. Missing item test (Expected output: -1)
console.log(findProductIndex("apple airpods pro"));
// 5. Empty string edge case (Expected output: -1)
console.log(findProductIndex(""));

// Test addProduct with existing items to update and also add new products.
// 1. Restock existing item (Expected output: "sony wh-1000xm5 quantity updated.")
addProduct({ name: "sony wh-1000xm5", quantity: 5 });
// 2. Add brand new tech item (Expected output: "belkin magsafe 3-in-1 added to inventory.")
addProduct({ name: "belkin magsafe 3-in-1", quantity: 14 });
// 3. Restock item that was low on stock (Expected output: "keychron k2 v2 vmechanical keyboard quantity updated.")
addProduct({ name: "keychron k2 v2 vmechanical keyboard", quantity: 10 });
// 4. Add another unique tech item (Expected output: "razer deathadder v3 added to inventory.")
addProduct({ name: "razer deathadder v3", quantity: 20 });
// 5. Restock the item added in step 2 (Expected output: "belkin magsafe 3-in-1 quantity updated.")
addProduct({ name: "belkin magsafe 3-in-1", quantity: 6 });

// Test removeProduct Function
// 1. Standard reduction (Expected: "Remaining logitech mx master 3s pieces: 20")
removeProduct("logitech mx master 3s", 5);
// 2. Case-insensitive reduction (Expected: "Remaining anker prime 20k powerbank pieces: 6")
removeProduct("ANKER PRIME 20K POWERBANK", 2);
// 3. Over-drafting / Not enough stock (Expected: "Not enough elgato stream deck mk.2 available...")
removeProduct("elgato stream deck mk.2", 40);
// 4. Complete item removal / Buyout (Expected: Item removed entirely from array via splice)
// (Note: Elgato has 15 pieces left. This tests your exact matching branch)
removeProduct("elgato stream deck mk.2", 15);
// 5. Missing product check (Expected: "nintendo switch oled not found")
removeProduct("nintendo switch oled", 1);
