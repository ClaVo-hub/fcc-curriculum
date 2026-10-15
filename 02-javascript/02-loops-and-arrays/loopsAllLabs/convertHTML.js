/* ===================================
     HTML Entity Converter
   ===================================
   This lab is about converting special characters in a string with their corresponding HTML entities.

    & should be converted to &amp;.
    < should be converted to &lt;.
    > should be converted to &gt;.
    " should be converted to &quot;.
    ' should be converted to &apos;.
*/

function convertHTML(string) {
  let array = string.split("");
  for (let i = 0; i < array.length; i++) {
    switch (array[i]) {
      case "&":
        array[i] = "&amp;";
        break;
      case "<":
        array[i] = "&lt;";
        break;
      case ">":
        array[i] = "&gt;";
        break;
      case '"':
        array[i] = "&quot;";
        break;
      case "'":
        array[i] = "&apos;";
        break;
    }
  }
  array = array.join("");
  return array;
}

// test
console.log(convertHTML("Dolce & Gabbana")); // Dolce &amp; Gabbana
console.log(convertHTML("Hamburgers < Pizza < Tacos")); // Hamburgers &lt; Pizza &lt; Tacos
console.log(convertHTML("Sixty > twelve")); // Sixty &gt; twelve
console.log(convertHTML("Schindler's List")); // Schindler&apos;s List
console.log(convertHTML("<>")); // &lt;&gt;
console.log(convertHTML("abc")); // abc
