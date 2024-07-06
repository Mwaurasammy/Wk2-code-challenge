const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
let shoppingList = [];

function addItems() {
  if (inputBox.value === "") {
    alert("You must enter an item!");
  } else {
    let item = {
      name: inputBox.value.trim(),
      checked: false,
    };
    shoppingList.push(item);
    updateList();
    saveData();
  }
  inputBox.value = "";
}

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      let li = e.target;
      let index = Array.from(listContainer.children).indexOf(li);
      shoppingList[index].checked = !shoppingList[index].checked;
      updateList();
      saveData();
    } else if (e.target.tagName === "SPAN") {
      let li = e.target.parentElement;
      let index = Array.from(listContainer.children).indexOf(li);
      shoppingList.splice(index, 1);
      updateList();
      saveData();
    }
  },
  false
);

function clearItems() {
  shoppingList = [];
  updateList();
  saveData();
}

function saveData() {
  localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
}

function showData() {
  shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];
  updateList();
}

function updateList() {
  listContainer.innerHTML = "";
  shoppingList.forEach((item, index) => {
    let li = document.createElement("li");
    li.textContent = item.name;
    if (item.checked) {
      li.classList.add("checked");
    }
    let span = document.createElement("span");
    span.textContent = "\u00d7";
    li.appendChild(span);
    listContainer.appendChild(li);
  });
}

showData();
