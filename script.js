const addTodoBtn = document.querySelector("#add-new-todo-btn");
const newTodoInput = document.querySelector("#new-todo-input");
const ulTodoList = document.querySelector("main ul");
const clearAllTodosBtn = document.querySelector("footer button");

function getDataFromLocalStorage() {
  const storageTodos = JSON.parse(localStorage.getItem("todos"));
  // if(storageTodos){
  //     return storageTodos
  // } else {
  //     return []
  // }

  // return storageTodos !== null ? storageTodos : []
  return storageTodos || [];
}

let todos = getDataFromLocalStorage(); // []
let editId = null;

clearAllTodosBtn.addEventListener("click", () => {
  todos = [];
  // todos.length = 0
  updateLocalStorage();
  generateTodoListView();
});

// [
//   {
//     id: 1,
//     text: "Todo 1",
//     completed: false,
//   },
//   {
//     id: 2,
//     text: "Todo 2",
//     completed: false,
//   },
// ];

function generateSingleTodoItem(todo) {
  const { id, text, completed } = todo;
  const editMode = editId === id; // 3 === 1,2,3

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
  // Opt 1
  //   const updatedValue = e.target.previousElementSibling.value;

  // Opt 2
  const inputElem = document.querySelector(`#input-${id}`);

  for (const todo of todos) {
    if (todo.id === id) {
      todo.text = inputElem.value;
    }
  }

  editId = null;

  updateLocalStorage();
  generateTodoListView();
}

function checkTodo(e, id) {
  const value = e.target.checked;

  for (const todo of todos) {
    if (todo.id === id) {
      todo.completed = value;
    }
  }

  updateLocalStorage();
  generateTodoListView();
}

function deleteTodo(id) {
  // Opt 1
  const newTodos = [];

  for (const todo of todos) {
    if (todo.id !== id) {
      newTodos.push(todo);
    }
  }

  todos = newTodos;

  // Opt 2
  //   let index;
  //   for (let i = 0; i < todos.length; i++) {
  //     if (todos[i].id === id) {
  //       // 1 === 3
  //       index = i;
  //     }
  //   }

  //   todos.splice(index, 1); // [1,2,4,5,6]

  updateLocalStorage();
  generateTodoListView();
}

function editTodo(id) {
  editId = id;

  generateTodoListView();
}

function generateTodoListView() {
  ulTodoList.innerHTML = "";

  for (let todo of todos) {
    generateSingleTodoItem(todo);
  }
}

generateTodoListView();

addTodoBtn.addEventListener("click", addNewTodoFn);

//
function addNewTodoFn() {
  const inputValue = newTodoInput.value.trim();

  if (inputValue !== "") {
    const newTodo = {
      id: todos.length ? todos[todos.length - 1].id + 1 : 1,
      text: inputValue,
      completed: false,
    };

    todos.push(newTodo);
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
