// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task to the list
    function addTask() {
        // Retrieve and trim the input value
        const taskText = taskInput.value.trim();

        // If the input is empty, alert the user
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new <li> element
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a new "Remove" button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // When remove button is clicked, remove the li from the task list
        removeButton.onclick = () => {
            taskList.removeChild(li);
        };

        // Append the remove button to the li
        li.appendChild(removeButton);

        // Append the li to the task list
        taskList.appendChild(li);

        // Clear the task input field
        taskInput.value = "";
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
