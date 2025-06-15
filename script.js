// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when the page loads
    loadTasks();

    // Function to add a new task to the list
    function addTask() {
        // Retrieve and trim the input value
        const taskText = taskInput.value.trim();

        // If the input is empty, alert the user
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new li element. Set its textContent to taskText.
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a new button element for removing the task.
        // Set its textContent to "Remove", and give it a class name of 'remove-btn'.
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');  // ✅ using classList.add

        // Assign an onclick event to the remove button that, when triggered,
        // removes the li element from taskList and Local Storage.
        removeButton.onclick = () => {
            taskList.removeChild(li);
            removeTaskFromStorage(taskText);
        };

        // Append the remove button to the li element
        li.appendChild(removeButton);

        // Then append the li to taskList
        taskList.appendChild(li);

        // Save the task to Local Storage
        saveTaskToStorage(taskText);

        // Clear the task input field by setting taskInput.value to an empty string.
        taskInput.value = "";
    }

    // Function to save a task to Local Storage
    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Function to remove a task from Local Storage
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Function to load tasks from Local Storage when the page loads
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            // Create a new li element
            const li = document.createElement('li');
            li.textContent = taskText;

            // Create a new "Remove" button
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('remove-btn');

            // When remove button is clicked, remove the li from the task list and Local Storage
            removeButton.onclick = () => {
                taskList.removeChild(li);
                removeTaskFromStorage(taskText);
            };

            // Append the remove button to the li
            li.appendChild(removeButton);

            // Append the li to the task list
            taskList.appendChild(li);
        });
    }

    // Add event listener to the "Add Task" button
    addButton.addEventListener('click', addTask);

    // Add event listener for the "Enter" keypress inside the input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(); // Call addTask if Enter key is pressed
        }
    });
});
