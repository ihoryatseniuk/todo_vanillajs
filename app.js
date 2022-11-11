//Variables
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const selectBtn = document.querySelector(".select-btn");
const filterOption = document.querySelector(".options");
const selectBtnText = document.querySelector(".filter");

//Functions
const addTodo = (e) => {
  e.preventDefault();
  //Creating list Container
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Creating new todo element
  const newTodo = document.createElement("li");
  newTodo.classList.add("todo-item");
  newTodo.innerText = todoInput.value;
  saveLocalTodos(todoInput.value);
  todoDiv.appendChild(newTodo);
  //Reset input form
  todoInput.value = "";

  //Creating complete button
  const completedButton = document.createElement("button");
  completedButton.classList.add("complete-btn");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  todoDiv.appendChild(completedButton);
  //Creating trash button
  const trashButton = document.createElement("button");
  trashButton.classList.add("trash-btn");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  todoDiv.appendChild(trashButton);
  //Attach todoDiv to todoList
  todoList.appendChild(todoDiv);
};

const deleteTodo = (e) => {
  const item = e.target;
  if (item.classList[0] === "trash-btn") {
    item.parentElement.classList.add("trashed");
    removeLocalsTodos(item.parentElement);
    item.parentElement.addEventListener("transitionend", () => {
      item.parentElement.remove();
    });
  }
  if (item.classList[0] === "complete-btn") {
    item.parentElement.classList.toggle("completed");
  }
};

const openList = () => {
  let content = document.querySelector(".content");
  content.classList.toggle("active");

  let selectBtn = document.querySelector(".select-btn");
  selectBtn.classList.toggle("active");
};

const filterTodo = (e) => {
  document.querySelector(".content").classList.toggle("active");
  selectBtnText.innerText = e.target.innerText;
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.innerText) {
      case "All":
        todo.style.display = "flex";

        break;
      case "Completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "Uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
};

const saveLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const removeLocalsTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const getTodos = () => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    console.log(todos);
  }

  todos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    console.log("dera");

    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";

    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
  });
};

//Event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
selectBtn.addEventListener("click", openList);
filterOption.addEventListener("click", filterTodo);
