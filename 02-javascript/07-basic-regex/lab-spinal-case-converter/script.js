const spinalCase = (str) => {
  return str
    .replace(/(?<!^)(?=[A-Z])/g, " ")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
};

console.log(spinalCase("This Is Spinal Tap")); //this-is-spinal-tap
console.log(spinalCase("AllThe-small Things")); // all-the-small-things
console.log(spinalCase("Teletubbies say Eh-oh")); //teletubbies-say-eh-oh
console.log(spinalCase("The_Andy_Griffith_Show")); //the-andy-griffith-show
console.log(spinalCase("ProductLanding page")); //product-landing-page

//node 02-javascript\07-basic-regex\lab-spinal-case-converter\script.js
