/*
 * JavaScript Boilerplate for To-Do List Assignment
 * 
 * This JavaScript file is part of the DOM Manipulation assignment. 
 * Your task is to complete the functions with appropriate DOM manipulation techniques
 * as instructed.
 * 
 * Follow the TODO prompts and complete each section to ensure the to-do list application works as expected.
 */

document.getElementById('addTaskForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Add code to add a new task
    let taskTitle = document.getElementById('taskTitle');

    if (taskTitle.value.trim() !== '') {
        addTask(taskTitle.value);
        taskTitle.value = '';
    }
});

// Function: Add New Task
function addTask(title) {
    const newTask = {
        id: Date.now(), // Use current timestamp as task ID
        title: title,
        completed: false
    };
    tasks.push(newTask);
    renderTasks(document.getElementById('filterTasks').value);
}

// Function: Edit Task
function editTask(id, newTitle) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.title = newTitle;
        renderTasks(document.getElementById('filterTasks').value);
    }
}

// Function: Remove Task
function removeTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks(document.getElementById('filterTasks').value);
}

// Function: Toggle Task Completion
function toggleTaskCompletion(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        renderTasks(document.getElementById('filterTasks').value);
    }
}

// Function: Render Tasks
function renderTasks(filter = 'all') {
    // Clear the current content of the task list.
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    let filteredTasks = tasks;
    if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (filter === 'pending') {
        filteredTasks = tasks.filter(task => task.completed === false)
    }

    filteredTasks.forEach(task => {
        // For each task, create a new list item (li) element.
        const taskItem = document.createElement('li');
        // Set the class of the list item to 'text-decoration-line-through' if the task is completed.
        taskItem.className = `list-group-item ${task.completed ? 'text-decoration-line-through' : ''}`;
        // Add task title as text to list item.
        taskItem.textContent = task.title;

        // Create Edit Button
        const editButton = document.createElement('button');
        // Add button text
        editButton.textContent = 'Edit';
        // Add css style classes
        editButton.className = 'btn btn-secondary btn-sm float-end';
        // Add event listener for Edit button click
        editButton.addEventListener('click', () => {
            // Create prompt dialog for task edit
            const newTitle = prompt('Enter new title:', task.title);
            // Update the task title in the tasks array if not empty
            if (newTitle && newTitle.trim() !== '') {
                editTask(task.id, newTitle);
            }
        });

        // Create Remove Button
        const removeButton = document.createElement('button');
        // Add button text
        removeButton.textContent = 'Remove';
        // Add css style classes
        removeButton.className = 'btn btn-danger btn-sm float-end me-2';
        // Add event listener for Remove button click
        removeButton.addEventListener('click', () => removeTask(task.id));

        // Add Edit button to the task item
        taskItem.appendChild(editButton);
        
        taskItem.appendChild(removeButton);
        
        taskItem.addEventListener('click', function(event) {
            if (event.target.tagName === 'LI') {
                toggleTaskCompletion(task.id);
            }
        });
        // Update taskList item in UI
        taskList.appendChild(taskItem);
    });
}

// Initial Load
let tasks = [];
renderTasks();

// Event Listener for Task Filtering
document.getElementById('filterTasks').addEventListener('change', function (event) {
    renderTasks(event.target.value);
});
