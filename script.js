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

function generateSingleTodoItem(todo) {
  const todoItem = `
        <div class="input-group mb-1">
            <input
              disabled
              type="text"
              class="form-control"
              value="${todo.text}"
            />
            <button type="button" class="btn btn-danger">Delete</button>
          </div>
    `;

  ulTodoList.innerHTML += todoItem;
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
      id: "",
      text: inputValue,
      completed: false,
    };

    todos.push(newTodo);
    generateTodoListView();
  } else {
    alert("Please enter a text.");
  }

  newTodoInput.value = "";
}
