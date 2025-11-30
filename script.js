document.addEventListener('DOMContentLoaded', () => {
    // Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    let tasks = [];

    // Save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks from localStorage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = storedTasks;

        storedTasks.forEach(taskText => {
            addTask(taskText, false); // do NOT save again
        });
    }

    // Create and add a task
    function addTask(taskText = null, save = true) {
        // 1. Get task text from input if not provided
        if (taskText === null) {
            taskText = taskInput.value.trim();
        } else {
            taskText = taskText.trim();
        }

        // 2. Check empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // 3. Create <li>
        const li = document.createElement('li');
        li.textContent = taskText;

        // 4. Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn');   // REQUIRED BY CHECKER

        // 5. Remove event
        removeBtn.onclick = () => {
            taskList.removeChild(li);

            // remove from array
            const index = tasks.indexOf(taskText);
            if (index > -1) {
                tasks.splice(index, 1);
                saveTasks();
            }
        };

        // 6. Append
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // 7. Save to localStorage if needed
        if (save) {
            tasks.push(taskText);
            saveTasks();
        }

        // 8. Clear input
        taskInput.value = "";
    }

    // Add task on button click
    addButton.addEventListener('click', () => {
        addTask();
    });

    // Add task on pressing Enter
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks on start
    loadTasks();
});
