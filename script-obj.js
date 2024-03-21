const addTodoBtn = document.querySelector("#add-new-todo-btn");
const newTodoInput = document.querySelector("#new-todo-input");
const ulTodoList = document.querySelector("main ul");
const clearAllTodosBtn = document.querySelector("footer button");

// {
//   1: {
//     text: "Todo 1",
//     completed: false
//   },
//   2: {
//     text: "Todo 2",
//     completed: false
//   }
// }

function getDataFromLocalStorage() {
  return JSON.parse(localStorage.getItem("todos")) || {};
}

let todos = getDataFromLocalStorage(); // {}
let editId = null;

clearAllTodosBtn.addEventListener("click", () => {
  todos = {};

  updateLocalStorage();
  generateTodoListView();
});

function generateSingleTodoItem(id, todo) {
  const { text, completed } = todo;

  const editMode = editId == id; // 3 === 1,2,3

  const todoItem = `
          <div class="input-group mb-1">
            <span class="input-group-text">
                ${
                  completed
                    ? `<input checked onclick="checkTodo(event, ${id})" type="checkbox" />`
                    : `<input  onclick="checkTodo(event, ${id})" type="checkbox" />`
                }
            </span>
            ${
              editMode
                ? `
                <input id="input-${id}" type="text" class="form-control ${
                    completed ? "cross" : ""
                  }" value="${text}"/>
                <button onclick="saveTodo(event, ${id})" type="button" class="btn btn-primary">Save</button>`
                : `
                <input id="input-${id}" disabled type="text" class="form-control ${
                    completed ? "cross" : ""
                  }" value="${text}"/>
                <button onclick="editTodo(${id})" type="button" class="btn btn-secondary">Edit</button>`
            }
            <button onclick="deleteTodo(${id})" type="button" class="btn btn-danger">Delete</button>
          </div>
    `;

  ulTodoList.innerHTML += todoItem;
}

function saveTodo(e, id) {
  const inputElem = document.querySelector(`#input-${id}`);

  todos[id].text = inputElem.value;

  editId = null;

  updateLocalStorage();
  generateTodoListView();
}

function checkTodo(e, id) {
  const value = e.target.checked;

  todos[id].completed = value;

  updateLocalStorage();
  generateTodoListView();
}

function deleteTodo(id) {
  delete todos[id];

  updateLocalStorage();
  generateTodoListView();
}

function editTodo(id) {
  editId = id;

  generateTodoListView();
}

function generateTodoListView() {
  ulTodoList.innerHTML = "";

  for (let key in todos) {
    generateSingleTodoItem(key, todos[key]);
  }

  // for (const [key, value] of Object.entries(obj1)) {
  //   generateSingleTodoItem(key, value)
  // }
}

generateTodoListView();

addTodoBtn.addEventListener("click", addNewTodoFn);

function addNewTodoFn() {
  const inputValue = newTodoInput.value.trim();

  if (inputValue !== "") {
    const newId = Object.keys(todos).length
      ? Math.max(...Object.keys(todos)) + 1
      : 1;

    const newTodo = {
      text: inputValue,
      completed: false,
    };

    todos[newId] = newTodo;

    updateLocalStorage();
    generateTodoListView();
  } else {
    alert("Please enter a text.");
  }

  newTodoInput.value = "";
}

function updateLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
