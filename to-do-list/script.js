const todoValue = document.getElementById("todoText");
const todoAlert = document.getElementById("Alert");
const listItems = document.getElementById("list-items");
const addUpdate = document.getElementById("AddUpdateClick");

let todo = JSON.parse(localStorage.getItem("todo-list")) || [];

function CreateToDoItems() {
  if (todoValue.value === "") {
    todoAlert.innerText = "Please enter your todo text!";
    todoValue.focus();
    return;
  }

  let IsPresent = todo.some((element) => element.item === todoValue.value);
  if (IsPresent) {
    setAlertMessage("This item already present in the list!");
    return;
  }

  let li = document.createElement("li");
  const todoItems = `<div title="Click to Complete" onclick="CompletedToDoItems(this)">${todoValue.value}</div>
        <div>
            <img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="assets/pencil.png" />
            <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="assets/delete.png" />
        </div>`;
  li.innerHTML = todoItems;
  listItems.appendChild(li);

  todo.push({ item: todoValue.value, status: false });
  setLocalStorage();
  todoValue.value = "";
  setAlertMessage("Todo item Created Successfully!");
}

function ReadToDoItems() {
  todo.forEach((element) => {
    let li = document.createElement("li");
    let style = element.status ? "style='text-decoration: line-through'" : "";
    const todoItems = `<div ${style} title="Click to Complete" onclick="CompletedToDoItems(this)">${
      element.item
    }
        ${
          style
            ? '<img class="todo-controls" src="assets/check-mark.png" />'
            : ""
        }</div>
        <div>${
          style
            ? ""
            : '<img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="assets/pencil.png" />'
        }
        <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="assets/delete.png" /></div>`;
    li.innerHTML = todoItems;
    listItems.appendChild(li);
  });
}
ReadToDoItems();

function UpdateToDoItems(e) {
  if (
    e.parentElement.parentElement.querySelector("div").style.textDecoration ===
    ""
  ) {
    todoValue.value =
      e.parentElement.parentElement.querySelector("div").innerText;
    updateText = e.parentElement.parentElement.querySelector("div");
    addUpdate.setAttribute("onclick", "UpdateOnSelectionItems()");
    addUpdate.setAttribute("src", "assets/refresh.png");
    todoValue.focus();
  }
}

function UpdateOnSelectionItems() {
  let IsPresent = todo.some((element) => element.item === todoValue.value);
  if (IsPresent) {
    setAlertMessage("This item already present in the list!");
    return;
  }

  todo.forEach((element) => {
    if (element.item === updateText.innerText.trim()) {
      element.item = todoValue.value;
    }
  });
  setLocalStorage();
  updateText.innerText = todoValue.value;
  addUpdate.setAttribute("onclick", "CreateToDoItems()");
  addUpdate.setAttribute("src", "assets/plus.png");
  todoValue.value = "";
  setAlertMessage("Todo item Updated Successfully!");
}

function DeleteToDoItems(e) {
  let deleteValue =
    e.parentElement.parentElement.querySelector("div").innerText;
  if (confirm(`Are you sure. Due you want to delete this ${deleteValue}!`)) {
    e.parentElement.parentElement.setAttribute("class", "deleted-item");
    todoValue.focus();

    todo = todo.filter((element) => element.item !== deleteValue.trim());
    setLocalStorage();

    setTimeout(() => {
      e.parentElement.parentElement.remove();
    }, 1000);
  }
}

function CompletedToDoItems(e) {
  if (e.style.textDecoration === "") {
    const img = document.createElement("img");
    img.src = "assets/check-mark.png";
    img.className = "todo-controls";
    e.style.textDecoration = "line-through";
    e.appendChild(img);
    e.parentElement.querySelector("img.edit").remove();

    todo.forEach((element) => {
      if (e.innerText.trim() === element.item) {
        element.status = true;
      }
    });
    setLocalStorage();
    setAlertMessage("Todo item Completed Successfully!");
  }
}

function setLocalStorage() {
  localStorage.setItem("todo-list", JSON.stringify(todo));
}

function setAlertMessage(message) {
  todoAlert.removeAttribute("class");
  todoAlert.innerText = message;
  setTimeout(() => {
    todoAlert.classList.add("toggleMe");
  }, 1000);
}
