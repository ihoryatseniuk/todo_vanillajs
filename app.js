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

//Event listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
selectBtn.addEventListener("click", openList);
filterOption.addEventListener("click", filterTodo);
