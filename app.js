// Define UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-task");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners
loadEventListeners();

// load all event listeners
function loadEventListeners() {
  // Dom load event
  document.addEventListener("DOMContentLoaded", getTasks);

  // add task event
  form.addEventListener("submit", addTask);
  // Remove task Event
  taskList.addEventListener("click", removeTask);
  // Clear task event
  clearBtn.addEventListener("click", clearTasks);
  // filter tasks event
  filter.addEventListener("keyup", filterTasks);
}

// get tasks From ls
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((task) => {
    //   Create li element
    const li = document.createElement("li");
    //  add class
    li.className = "collection-item";
    // create text node and append to li
    li.appendChild(document.createTextNode(task));
    //    Create new link element
    const link = document.createElement("a");
    // add class
    link.className = "delete-item secondary-content";
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //   append the link to li
    li.appendChild(link);

    // append li to ul
    if (li.textContent !== "") {
      taskList.appendChild(li);
    }
  });
}

// add Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  }

  //   Create li element
  const li = document.createElement("li");
  //  add class
  li.className = "collection-item";
  // create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  //    Create new link element
  const link = document.createElement("a");
  // add class
  link.className = "delete-item secondary-content";
  // add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //   append the link to li
  li.appendChild(link);

  // append li to ul
  if (li.textContent !== "") {
    taskList.appendChild(li);
    // Store in LS

    storeTaskInLocalStorage(taskInput.value);
  }

  // cleat input
  taskInput.value = "";

  e.preventDefault();
}

// store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// remove task

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure ?")) {
      e.target.parentElement.parentElement.remove();

      // Remove from Ls
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}
// remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// clear tasks
function clearTasks() {
  //  taskList.innerhtml = '';
  if (confirm("Are You Sure ?")) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }

  // Clear from ls
  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;

    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
