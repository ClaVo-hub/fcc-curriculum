/* node practice\index.js */

/* What is objects and how to create properties in objects */
/* an object is a data structure that allows you to store & organize related data & functionality*/
/* Its versatile, because you can store all primitive data type within even arrays, functions, statements and other objects */
const personalDetails = {
  "1stName": "Alice", // this property name is not a valid JS identifier. start with number, has spaces.
  lastName: "Bogga",
  age: 32,
  city: "JHB",
};

/*Access data 2 ways: dot notation and bracket notation*/
/*dot notation*/
console.log(personalDetails.lastName); // dot notation, use when u know the property name and its a valid JS id property name

/*bracket notation and its advantages*/
console.log(personalDetails["age"]);
console.log(personalDetails["1stName"]); // 1stName is not valid JS id, so bracket notation lets you access invalid property id's
let propertyName = "city"; // Bracket Notation allows to use variables to access properties dynamically.
console.log(personalDetails[propertyName]); // using variable name to access property value.

/* How to delete Properties in Objects? */

/* delete operator */
const person = {
  name: "Ally",
  age: 20,
  city: "JHB",
  job: "Designer",
  address: "N/A",
};

console.log(person.address);
delete person.address;
console.log(person.address);

/* Second methods is using destructing assigment with rest parameters */
/* This methods doesnt delete the properties with its values, it creates a new object and 
without specified properties, basically extracting the properties that you want to removed into a new object */
const { job, city, ...newObject } = person; //doesnt actually deletes the properties, stays in orginal object.
console.log(newObject);
console.log(person.city);
console.log(person.age);
console.log(person);

/* Check if property is in object
   There are 4 methods. 
    hasOwnProperty() Method - return boolean to check if property exists inside obejct
    Object.hasOwn() Methods - returns boolean, does not check value inside property for falsy values. Most safe way to check.
    in operator
    using inquality operator with undefined.
   Choosing your method is based on your codes specific requirements and need, each have its limitations. 
 */

/* hasOwnProperty() Method */
const cars = {
  brand: "Toyota",
  make: "Corolla",
  year: 2020,
  test: null,
  test1: undefined,
  test2: false,
};
console.log("check if hasOwnProperty() is case-sensitive");
console.log(cars.hasOwnProperty("brand")); // true
console.log(cars.hasOwnProperty("manufacturer")); //false
console.log("Test false values with hasOwnProperty()");
console.log("null value:" + cars.hasOwnProperty("test")); // true
console.log("undefined value:" + cars.hasOwnProperty("test1")); // true
console.log("false value:" + cars.hasOwnProperty("test2")); // true

/* Object.hasOwn() Method Syntax: Object.hasOwn("objectName", "PropetyName") */
console.log("check if Object.hasOwn() is case-sensitive");
console.log(Object.hasOwn(cars, "brand")); //true
console.log(Object.hasOwn(cars, "manufacturer")); //false
// does not check value of property or if property value is a falsy values. Example:
const userScore = {
  user: "code123",
  score: 0, //falsy value
  isActive: false, //falsy value
  nickname: null, // false value
};

console.log(Object.hasOwn(userScore, "score"));
console.log(Object.hasOwn(userScore, "isActive"));
console.log(Object.hasOwn(userScore, "nickname"));
// using if() directly will give wrong results for falsy values.
if (userScore.score) {
  console.log("Has score"); //nothing will display, because 0 is falsy value.
}
if (Object.hasOwn(userScore, "score")) {
  console.log("Has Score: ", userScore.score); // Has score: 0 . will display, because Object.hasOwn does not check for falsy values.
}

/* in operator */
console.log("brand" in cars); // true
console.log("maufacture" in cars); // false

/* check if property is undefined */
console.log(cars.brand !== undefined); // true - brand property does exist is not equal to undefined (meaning it doesnt exists)
console.log(cars.color !== undefined); // false - color property does not exist which equals to undefined and then not equal to undefined = false. its is equal to undefined.
// this method can give false negatives, if a property has the value undefined.
const fruitCount = {
  grape: 0,
  kiwi: undefined,
  orange: 10,
  mango: 5,
};
console.log(
  "Check undefined property value with inequality giving false negatives:",
);
console.log(fruitCount.kiwi !== undefined); // Should be true, cuz kiwi property does exists, says false property does not exist. which is a false negative. The property does exists, just have undefined value.
console.log(fruitCount.orange !== undefined); // true, property does exists.

/* -- Access Properties from Nested Ojects & Arrays in Objects */
// in JS often encounter complex data structures that involves nested objects and arrays within objects.
// dot notation and bracket notation is still used. chain these accessors to access the nested object property or array property (key).

/*access nested objects property */
const user = {
  name: "Ally",
  age: 20,
  contact: {
    //first nested object
    email: "ally@example.com",
    phone: {
      //second nested object within 2 objects.
      home: "123-456-7890",
      work: "051-542-5862",
    },
  },
};
console.log(user.contact.phone.home);
//when working with variables or property name has spaces or start with number , bracket notation is best
console.log(user["contact"]["phone"]["work"]);

/*access nested array properties in objects */
const newUser = {
  name: "Wally",
  age: 40,
  addresses: [
    // nested array in object
    { type: "home", street: "0 example drive", city: "Wonderland" }, // nested object in nested array in object
    { type: "work", street: "1 Market Street", city: "MoneyLand" },
  ],
};

console.log(newUser.addresses[1] /*row index number of array*/.city); // MoneyLand

/*----------------------------------*/
// Primitive & Non-Primitive Data Types

//Primitive data types.
//simplest form of data in JS.
//Include: Boolean, string, number, bigint, null, undefined and symbol.
// called primitive because represennt single values and are not an object
// primitive data types are immutable, once value is assigned cannot change. You can reassign a new value.
// when working with primitive data types, ur working directly with their values. create a variable with primitive data type, the value is stored directly inside variable.
let num1 = 5;
let num2 = num1; // assign variable to new variable.
num1 = 10; //re-assign a primitive data type to variable.
console.log(num2); // 5 assigning before reassigning, stores original value of 5 to variable num2.
console.log(num1); // 10

//Non-Primitive data type.
//These are more complex. which are objects.
//Include: regular objects, arrays and functions.
// Non-primitive data types can hold multiple values as properties or elements (unlike primitive ones).
// when creating a variable with a non-primitive value: whats stored in the variable is actually a reference to the location in memory where the object is stored, not the object itself.
const orginalUser = { name: "John", age: 20 };
const copyUser = orginalUser;
orginalUser.age = 21;
console.log(orginalUser.age); // 21.
console.log(copyUser.age); // 21 (it shows the updated value, this occurs because both originalUser and copyUser are referencing the same object in memory.
// in JS. when you assign an object to another variable
// you're copying the reference to the object, not the object itself. // AKA shallow copying by reference.
// as a result: any changes made to the object through one reference (property) are reflected in all references (properties) to that object.
/* What is object methods. What's the difference between Object Methods and Functions? */
// Both Object Methods and functions are ways for recapsulate reusable code.
// There are key differences from the two like how they are defines, calles and .....

// Functions are reusable code that performs a specific task
// we call a function by simply referencing the function followed by the parameter parathesis.

//Object Methods are functions that are an object property within a object.
// ......??
// we call a Object method by dot notation and the function name.
const phone = {
  name: "John",
  age: 32,
  objectMethod: function () {
    // the function name is a property and becomes a reference inside the object.
    console.log("My name is " + this.name);
    console.log("I am " + this.age + " years old.");
  },
};
phone.objectMethod();

//using function or object methods depends.
// Object Methods are used storing and organizing logical objects and data???....
// Functions are used for more general purpose and reusable code.

// Obect() Constructor. When to use it?
// object() constructor is a special type of function
// invoked with the new keyword u can create & initialize objects.
//can be used without new keyword, but then its called as an function and will behave differently depending on data type of value passed to it.
// basically turning primitive data type values into objects.

//node practice\objects.js

/*=================================
   What is JSON?
  ================================= */
/* JSON : JavaScript Object Notation.
   - lightweight, text-based data format, that is commonly used to exchange data between a server and a web application.
   - JSON is popular cuz: It's both machine parseable and human-readable.
   - JSON is language-independent. Means: can easily send JSON data from Java apps to Python apps or from JS apps to C# apps.
   - JSON supports many data types: Including: objects, arrays, strings, booleans, null and numbers.
*/
/* example of JSON Object - saved in manifestCargoValidator\json.json
{
"name": "Alice", //note property key is enclosed with WRAPPED WITH DOUBLE QUOTES (Otherwise you will get an error)
"age": 30,
"isStudent": false,
"list of courses": ["Math", "Physics", "Computer Science"]
}
*/

// node manifestCargoValidator\objects.js
//To access data from a JSON object:
import data from "./json.json" with { type: "json" };
console.log(data.age); // can use bracket notation or dot notation.
console.log(data["list of courses"]); // to access arrays in object key, use bracket notation, otherwise it will trow error with dot notation

/*============================================================
    JSON.stringify() : conevert js objects into JSON string.
  ============================================================ */
//Syntax: JSON.stringify(objectName, replacer(optional), spacer(optional));

// USE: when u want to store OR transmit data in a format that can easily be SHARED or TRANSFERRED between systems.
const jsonString = JSON.stringify(user);
console.log(jsonString); // {"name":"Ally","age":20,"contact":{"email":"ally@example.com","phone":{"home":"123-456-7890","work":"051-542-5862"}}}

// replacer: stringify can accept an OPTIONAL 2nd parameter: called a 'replacer', which can be a function or an array.
// The 2nd optional parameter allows to EXTRACT specified data from your objects and parse that into a JSON string.
const jsonString1 = JSON.stringify(cars, ["brand", "make"]);
console.log(jsonString1);

// 3rd optional parameter - Spacer parameter.
// allows to control the spacing for the stringified result.
const jsonString2 = JSON.stringify(cars, null, 2); // to skip 2nd replacer parameter you pass null.
console.log(jsonString2);

/*============================================================
    JSON.parse() : converts a JSON string back to a JS object.
  ============================================================ */
// USEFULL: when you RETRIEVE JSON data from a WEB server or from localStorage and you NEED to MANIPULATE the data in your application.
console.log(JSON.parse(jsonString).age); // will return new object from JSON string parsed.

//Will learn more later.

/*==========================================
     (?.) Optional Chaining Operator
  ========================================== */
/*
The optional chaining operator (?.) is a useful tool in JavaScript 
that lets you safely access object properties or call methods without worrying whether they exist. 
It's like a safety net for working with objects that might have missing parts.
*/
// console.log(person.address.street); // will throw an error. if person.address is undefined, we are not able to access the street property.
// this is where the optional chaining operator comes in handy.
console.log(user?.contact?.phone?.home);
console.log(user?.contact?.address?.street);
// by using ?. opetional chaining operator you are telling JS to ONLY CONTINUE with operation:
// IF the object/Value BEFORE the ?. exists and is not NULL or UNDEFINED.
/* If the value before the ?. is null or undefined, JavaScript returns undefined rather than attempting to proceed with the operation and throwing an error. */
// USEFULL: is your not sure if a property or method exists.

/*==========================================
     Object Destructuring
  ========================================== */
// allows to extract values from objects and assign them to variables.
// New JS feature: ES6 (ECMAScript 2015) specification
// at its core,object destructuring is about unpacking values from objects into distinct variables. Instead of accessing object properties one by one, you can extract multiple properties in a single statement.

/* line: 25
const person = {
  name: "Ally",
  age: 20,
  city: "JHB",
  job: "Designer",
  address: "N/A",
};
*/
const {
  name,
  age,
} /*assign a variable name to the object properties name and age */ = person;
console.log(name); // access the object's property value via variable name assigned to the property (without dot notation or bracket notation)
console.log(age);

// Allow to assign the extracted values to variables with different names.
// Useful: when you have object property names that might conflict with EXISTING variables or when you want to use a different name.
let { name: firstName, age: personAge } = person;
console.log(firstName); // call the objects property value by the value referenced variable.
console.log(personAge);

// Allow to SET default values
// If property doesn't exist in the object youre destructuring, you can specify a fallback value.
let { city: personCity, country = "Unknown" } = person;
console.log(country); // country property does not exist in object, so it will default to the "Unknown" property.
console.log(personCity);

// Destructuring NESTED Objects
/*
const user = {
  name: "Ally",
  age: 20,
  contact: {
    //first nested object
    email: "ally@example.com",
    phone: {
      //second nested object within 2 objects.
      home: "123-456-7890",
      work: "051-542-5862",
    },
  },
}; */

let {
  contact: {
    //assign variable to nested object properties with {}
    email: userEmail,
    phone: { home: userPhoneHome },
  },
} = user;

console.log(userEmail);
console.log(userPhoneHome);

/* ====================================
   Shorthand Notation
   ==================================== */
/*
When you're creating objects, especially when the property names match variable names, you can use a shorthand syntax: 

let name = "Bob";
let age = 25;
let personThe = { name, age }; // shorthand notation - used when data is coming from user input, when youre returning objects from functions or creating multiple properties/
console.log(personThe); // { name: "Bob", age: 25 }

shorthand notation - used when data is coming from user input, when youre returning objects from functions or creating multiple properties.
*/

function createPerson(name, age) {
  return { name, age };
}
let person20 = createPerson("Sarah", 25);
console.log(person20); // { name: 'Sarah', age: 25 }

// They're especially useful when working with complex data structures, or when you need to pass multiple parameters to functions.
