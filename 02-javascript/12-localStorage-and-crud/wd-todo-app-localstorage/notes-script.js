const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");

// used to store tasks with associated data (incl. title, due date, description).
// will enable to keep track of tasks, display them on page and save them to localStorage
// If you add, update, or remove a task, it should reflect in the UI. However, that's not happening now because you have yet to retrieve the tasks. To do this, you need to modify your initial taskData to load data from localStorage. If there is nothing in localStorage it should be assigned an empty array.
// Set taskData to the retrieval of data from local storage or an empty array. Make sure you parse the data coming with JSON.parse() because you saved it as a string.
const taskData = JSON.parse(localStorage.getItem("data")) || [];

// currentTask will be able to track the state when editing and discarding tasks.
let currentTask = {};

// It is time to work on the final issue. If there is a to-do task with a special character like a quote inside of the name or description of the item, the application breaks. While it appears otherwise, the correct item will appear missing.
//In order to fix this, we need to create a function called removeSpecialChars that takes a string as input and removes all special characters.
const removeSpecialChars = (str) => str.replace(/[^a-zA-Z0-9\s]/g, ""); // used on the id: in task object in addOrUpdate function input fields.

const addOrUpdateTask = () => {
  // There are two bugs left to fix. First, if you create a task with only spaces for the title, an empty task will be created even though the title is required.
  //Fix that by adding a check at the beginning of the function for if !titleInput.value.trim(). If there's no title, show an alert with the text Please provide a title and return after that.
  if (!titleInput.value.trim()) {
    alert("Please provide a title");
    return;
  }
  /*You will need to determine whether the task being added to the taskData array already
exists or not. If the task does not exist, you will add it to the array. 
If it does exist, you will update it. 
To accomplish this, you can use the findIndex() method.*/
  const dataArrIndex = taskData.findIndex((item) => {
    item.id === currentTask.id;
  });
  // When a user creates a task, it should be saved in an object.
  const taskObj = {
    // it will save the input inside object to store later.
    // to save in id (user should to use all cases) must be saved in lowercase.
    // final result should be a hyphenated string. split(" ").join("-").
    // Make id unique by using template literals and embedded expression. Make id unique using Date.now()
    // Finally, it is time to call the removeSpecialChars function on the id property in your taskObj.
    // This will help prevent issues caused by special characters in HTML element IDs.
    id: `${removeSpecialChars(titleInput.value).toLowerCase().split(" ").join("-")}-${Date.now()}`,
    title: titleInput.value,
    date: dateInput.value,
    description: descriptionInput.value,
  };
  console.log(taskObj); // for testing purposes only. can remove
  /*you want to add them to your taskData array to keep track of each task. 
     However, you should only do this if the task is new.
     If the task already exists, you will set it up for editing. dataArrIndex var index of each task*/
  if (dataArrIndex === -1) {
    taskData.unshift(taskObj); //shift the input data into taskData array for storage
  } else {
    taskData[dataArrIndex] = taskObj; // updates new edited content.
  }

  //Now you should save the task items to local storage when the user adds, updates, or removes a task.
  localStorage.setItem("data", JSON.stringify(taskData));
  // ADD HELPER FUNCTIONS TO ONLY ADD ADDORUPDATETASK FUNCTION TO THE SUMBIT EVENT LISTENER.
  updateTaskContainer();
  reset();
};

const updateTaskContainer = () => {
  tasksContainer.innerHTML = ""; // makes duplicates if trying to add new task. setting "" help reset
  /*Now that you have saved the task in the taskData array,
      you should display the task on the page by looping through it. */
  taskData.forEach(({ id, title, date, description }) => {
    // object destructioning as parameters - then with innerHTML adding input content to todo list.
    tasksContainer.innerHTML += `
        <div class="task" id="${id}">
          <p><strong>Title:</strong> ${title}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Description:</strong> ${description}</p>
          <button onclick="editTask(this)" type="button" class="btn">Edit</button>
          <button onclick="deleteTask(this)" type="button" class="btn">Delete</button          
        </div> 
    `; /*this is a keyword that refers to the current context. In this case, this points to the element that triggers the event – the buttons.*/
  });
};

//helper function for delete and edit buttons in above updateTaskContainer functi9on isnide taskData forEach innerHTML content buttons.
const deleteTask = (buttonEl) => {
  const dataArrIndex = taskData.findIndex((item) => {
    return item.id === buttonEl.parentElement.id;
  });
  // You need to remove the task from the DOM using remove() and from the taskData array using splice().
  buttonEl.parentElement.remove();
  taskData.splice(dataArrIndex, 1);
  // You also want a deleted task to be removed from local storage. For this, you don't need the removeItem() or clear() methods. Since you already use splice() to remove the deleted task from taskData, all you need to do now is save taskData to local storage again.
  // Use setItem() to save the taskData array again. Pass in data as the key and ensure that taskData is stringified before saving.
  localStorage.setItem("data", JSON.stringify(taskData));
};

const editTask = (buttonEl) => {
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id,
  );

  currentTask = taskData[dataArrIndex]; // retrieve the task and store in currentTask to be eidted.
  // stage the data retrieved to be edited into the input field:
  titleInput.value = currentTask.title;
  dateInput.value = currentTask.date;
  descriptionInput.value = currentTask.description;

  addOrUpdateTaskBtn.innerText = "Update Task";

  taskForm.classList.toggle("hidden");
};

/*If you attempt to add another task now, you'll notice that the input fields retain the 
values you entered for the previous task. To resolve this, you need to clear the input 
fields after adding a task.
Instead of clearing the input fields one by one, it's a good practice to create a function
 that handles clearing those fields. You can then call this function whenever you need 
to clear the input fields again. */
// helper function to reset inputs fields.
const reset = () => {
  // If you try to add a new task, edit that task, and then click on the Add New Task button, you will notice a bug.
  //The form button will display the incorrect text of "Update Task" instead of "Add Task". To fix this, you will need to assign the string "Add Task" to addOrUpdateTaskBtn.innerText inside your reset function.
  addOrUpdateTaskBtn.innerText = "Add Task";
  titleInput.value = "";
  dateInput.value = "";
  descriptionInput.value = "";
  taskForm.classList.toggle("hidden");
  currentTask = {};
};

//You've retrieved the task item(s) now, but they still don't reflect in the UI when the page loads. However, they appear when you add a new task.
// You can check if there's a task inside taskData using the length of the array. Because 0 is a falsy value all you need for the condition is the array length.
// Check if there's a task inside taskData, then call the updateTaskContainer() inside the if statement block.
if (taskData.length) {
  updateTaskContainer();
}

// Opening and closing the Form dialog modal. (hidden by default)
openTaskFormBtn.addEventListener("click", () => {
  taskForm.classList.toggle("hidden"); // it will allow opening dialog modal. that was hidden.
});

/*--NOTE-- 
A modal is an element that prevents all interaction with 
elements outside it until the modal has been dismissed.
*/
// Show dialog modal message - user confirm make sure they want to close form.
closeTaskFormBtn.addEventListener("click", () => {
  // If the user attempts to edit a task but decides not to make any changes before closing the form, there is no need to display the modal with the Cancel and Discard buttons.
  const formInputsContainValues =
    titleInput.value || dateInput.value || descriptionInput.value;
  const formInputValuesUpdated =
    titleInput.value !== currentTask.title ||
    dateInput.value !== currentTask.date ||
    descriptionInput.value !== currentTask.description;
  // before closing we need to confirm there is no data inside form, if there is show discard dialog modal if not just close form with reset.
  if (formInputsContainValues && formInputValuesUpdated) {
    confirmCloseDialog.showModal();
  } else {
    reset();
  }
});
// cancel button inside confirm dialog modal - when cancel button to close.
cancelBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
}); //returns back to the form.
// discard button of dialog modal. this will erase the data and discard the form and hide it again and return to page
discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
  reset(); // using helper function to discard values and return
});

/* You can enhance code readability and maintainability by refactoring the submit event listener into two separate functions. The first function can be used to add the input values to taskData, while the second function can be responsible for adding the tasks to the DOM.*/
/*---- save data from input fields into empty array taskData var and display them on the page----*/
taskForm.addEventListener("submit", (e) => {
  e.preventDefault(); // to stop the browser from refreshing the page after submitting the form.
  addOrUpdateTask();
});

/* ================= TESTING LOCALSTORAGE PROPERTIES & METHODS ================ */
// ----------  CAN DELETED IF WANT ------------- //
/*As you recall from previous lessons, localStorage is part of the Web Storage API that allows data to persist even after the browser window is closed or the page is refreshed. */
/* const myTaskArr = [
  { task: "Walk the Dog", date: "22-04-2022" },
  { task: "Read some books", date: "02-11-2023" },
  { task: "Watch football", date: "10-08-2021" },
]; */
// A myTaskArr array has been provided for you. Use the setItem() method to save it with a key of data.
/*
To view what's stored in localStorage, open the browser's developer tools and navigate to the local storage section:

Chrome/Edge: Open DevTools (F12), navigate to Application > Storage and expand Local Storage. Click a domain to view its key-value pairs.
Firefox: Open DevTools (F12), navigate to Storage and expand Local Storage. Click a domain to view its key-value pairs.
Safari: Choose Safari > Settings, and click Advanced. At the bottom of the pane, select the Show Develop menu in menu bar checkbox. Once the developer tools are enabled, right-click on the page within browser, select Inspect element, go to the Storage tab, then select Local Storage. Click a domain to view its key-value pairs.
The data stored with the key data should be visible. Examine it and note what the values look like.
 */
/*When you inspect the stored value, you may notice entries that look like [object Object],[object Object],[object Object]. 
This happens because localStorage can only store values as strings.
To fix this, convert data to a string before saving it by using JSON.stringify(). 
After storing it again, recheck localStorage to see how the data now appears.
 */
//localStorage.setItem("data", JSON.stringify(myTaskArr));
/*Now that you have the myTaskArr array saved in localStorage correctly, you can retrieve it with getItem() by specifying the key you used to save the item. */
//const getTaskArr = localStorage.getItem("data");
//console.log(getTaskArr);
/* OUTPUT: [{"task":"Walk the Dog","date":"22-04-2022"},{"task":"Read some books","date":"02-11-2023"},{"task":"Watch football","date":"10-08-2021"}] */

//The item you retrieve is a string, as you saved it with JSON.stringify(). To view it in its original form before saving, you need to use JSON.parse().
//const getTaskArrObj = JSON.parse(localStorage.getItem("data"));
//console.log(getTaskArrObj);
// OUTPUT: [ { task: 'Walk the Dog', date: '22-04-2022' },
// { task: 'Read some books', date: '02-11-2023' },
// { task: 'Watch football', date: '10-08-2021' } ]

//localStorage.removeItem("data"); // null null
