const taskOl = document.querySelector('#tasks');
const taskInput = document.querySelector('#new-task');
const addTaskButton = document.querySelector('#add-task');
const taskTemplate = document.querySelector('#task-template');

renderTaskFromLocalStorage();

addTaskButton.addEventListener('click', () => {
    const newTask = taskInput.value;

    addTask(newTask);
});

function renderTask(newTask){
    const taskTemplateClone = taskTemplate.content.cloneNode(true);
    const newTaskElement = taskTemplateClone.querySelector('.task')
    const taskText = newTaskElement.querySelector('.task-text');

    const deleteButton = taskTemplateClone.querySelector('#delete-button');
    deleteButton.addEventListener("click", () => deleteTask(newTask.id));

    newTaskElement.id = newTask.id;
    taskText.textContent = newTask.text;
   

    taskOl.appendChild(taskTemplateClone);
}

function saveTaskToLocalStorage(newTask){
    const tasks = localStorage.getItem('tasks');
    const parsedTasks = JSON.parse(tasks) || [];

    parsedTasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(parsedTasks));
}

function renderTaskFromLocalStorage(){
    taskOl.innerHTML = "";

    const tasks = localStorage.getItem("tasks");
    const parsedTasks = JSON.parse(tasks) || [];

    parsedTasks.forEach((task) => renderTask(task));
}

function addTask(task){
     const newTask = {
        id: Math.random().toString(16).slice(2),
        text: task
     }

    renderTask(newTask);
    saveTaskToLocalStorage(newTask);
}

function deleteTask(taskId){
    const taskToDelete = document.getElementById(taskId);

    taskToDelete.remove();

    const tasks = localStorage.getItem('tasks');
    const parsedTasks = JSON.parse(tasks) || [];

    const filteredTasks = parsedTasks.filter(task => task.id != taskId);
    localStorage.setItem('tasks', JSON.stringify(filteredTasks));
}

