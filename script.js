const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", addTask);

function addTask() {
    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement("li");

    li.innerHTML = `
        <label>
            <input type="checkbox">
            <span>${taskInput.value}</span>
        </label>
        <button class="delete">X</button>
    `;

    const checkbox = li.querySelector("input");
    checkbox.addEventListener("change", () => {
        li.classList.toggle("completed");
        saveTasks();
    });

    li.querySelector(".delete").addEventListener("click", () => {
        li.remove();
        saveTasks();
    });

    taskList.appendChild(li);
    taskInput.value = "";
    saveTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", taskList.innerHTML);
}

function loadTasks() {
    taskList.innerHTML = localStorage.getItem("tasks") || "";
}

loadTasks();
