let tasks = [];
let id = 1;

function addTask() {
    const taskName = document.getElementById("taskName").value;
    const priority = document.getElementById("priority").value;

    if (taskName.trim() === "") {
        alert("O nome da tarefa não pode estar vazio.");
        return;
    }

    const task = {
        id: id++,
        name: taskName,
        priority: priority,
        completed: false
    };

    tasks.push(task);
    document.getElementById("taskName").value = "";
    displayTasks();
}

function displayTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task) => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        if (task.completed) taskDiv.classList.add("completed");

        taskDiv.innerHTML = `
            <p>${task.id}. ${task.name}</p>
            <span class="priority ${task.priority}">${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span>
            <div class="icons">
                <i class="fa fa-check" title="Concluir" onclick="completeTask(${task.id})"></i>
                <i class="fa fa-edit" title="Editar" onclick="editTask(${task.id})"></i>
                <i class="fa fa-trash" title="Excluir" onclick="deleteTask(${task.id})"></i>
            </div>
        `;
        taskList.appendChild(taskDiv);
    });
}

function completeTask(taskId) {
    tasks = tasks.map((task) => {
        if (task.id === taskId) {
            task.completed = !task.completed;
        }
        return task;
    });
    displayTasks();
}

function deleteTask(taskId) {
    tasks = tasks.filter((task) => task.id !== taskId);
    displayTasks();
}

function editTask(taskId) {
    const taskName = prompt("Editar o nome da tarefa:");
    if (taskName === null || taskName.trim() === "") return;

    tasks = tasks.map((task) => {
        if (task.id === taskId) {
            task.name = taskName;
        }
        return task;
    });
    displayTasks();
}

function filterTasks() {
    const search = document.getElementById("search").value.toLowerCase();
    const filteredTasks = tasks.filter((task) =>
        task.name.toLowerCase().includes(search)
    );
    displayFilteredTasks(filteredTasks);
}

function displayFilteredTasks(filteredTasks) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    filteredTasks.forEach((task) => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        if (task.completed) taskDiv.classList.add("completed");

        taskDiv.innerHTML = `
            <p>${task.id}. ${task.name}</p>
            <span class="priority ${task.priority}">${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span>
            <div class="icons">
                <i class="fa fa-check" title="Concluir" onclick="completeTask(${task.id})"></i>
                <i class="fa fa-edit" title="Editar" onclick="editTask(${task.id})"></i>
                <i class="fa fa-trash" title="Excluir" onclick="deleteTask(${task.id})"></i>
            </div>
        `;
        taskList.appendChild(taskDiv);
    });
}
