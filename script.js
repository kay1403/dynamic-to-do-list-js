// Dynamic To-Do List with localStorage
// Files: index.html, styles.css, script.js
// Behavior:
// - Add tasks via button or Enter key
// - Remove tasks
// - Persist tasks in localStorage across sessions

document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // In-memory array of tasks (strings)
    let tasks = [];

    /**
     * Save the tasks array to localStorage.
     */
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    /**
     * Create a DOM element for a task and append it to the list.
     * @param {string} text - task text
     */
    function createTaskElement(text) {
        const li = document.createElement('li');
        li.textContent = text;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Remove handler: remove from DOM and update localStorage
        removeBtn.onclick = function () {
            // Remove the li element from DOM
            taskList.removeChild(li);

            // Remove from tasks array (remove first matching entry)
            const index = tasks.indexOf(text);
            if (index > -1) {
                tasks.splice(index, 1);
                saveTasks();
            }
        };

        // Append remove button to list item and append item to the list
        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

    /**
     * Add a new task.
     * If taskText is provided, use it. Otherwise read from input field.
     * The `save` flag indicates whether to persist this addition to localStorage.
     * @param {string} [taskText] - optional task text
     * @param {boolean} [save=true] - whether to save to localStorage
     */
    function addTask(taskText, save = true) {
        // If no taskText passed (user-triggered), get from input field
        if (typeof taskText === 'undefined') {
            taskText = taskInput.value.trim();
        } else {
            // if passed from load, ensure it's trimmed
            taskText = String(taskText).trim();
        }

        if (!taskText) {
            alert('Please enter a task.');
            return;
        }

        // Create DOM element
        createTaskElement(taskText);

        // Update in-memory array and optionally persist
        if (save) {
            tasks.push(taskText);
            saveTasks();
        }

        // Clear input field
        taskInput.value = '';
        taskInput.focus();
    }

    /**
     * Load tasks from localStorage and populate the DOM.
     */
    function loadTasks() {
        const stored = localStorage.getItem('tasks') || '[]';
        try {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) {
                tasks = parsed.slice(); // clone
                tasks.forEach(taskText => {
                    // addTask with save=false to avoid double-saving
                    addTask(taskText, false);
                });
            } else {
                tasks = [];
            }
        } catch (e) {
            // If parsing fails, reset storage
            tasks = [];
            localStorage.setItem('tasks', '[]');
        }
    }

    // Attach event listeners
    addButton.addEventListener('click', () => addTask());

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            addTask();
        }
    });

    // Initialize the app: load tasks from localStorage
    loadTasks();
});
