
/* ---------------------------------------------------
   DATA STORE
   Each task: { id: number, text: string, completed: boolean }
--------------------------------------------------- */
let tasks = [];
let nextId = 1;

/* ---------------------------------------------------
   DOM REFERENCES
--------------------------------------------------- */
const taskInput    = document.getElementById('taskInput');
const taskListEl   = document.getElementById('taskList');
const countLabel   = document.getElementById('countLabel');
const statusMessage = document.getElementById('statusMessage');

/* ---------------------------------------------------
   CORE FUNCTIONS
--------------------------------------------------- */

// Add a new task to the END of the array
function addTask() {
  const value = taskInput.value.trim();
  if (value === '') {
    flashInput();
    return;
  }
  tasks.push({ id: nextId++, text: value, completed: false });
  taskInput.value = '';
  taskInput.focus();
  DisplayTasks();
}

// Add a new task to the BEGINNING of the array
function addTaskToBeginning() {
  const value = taskInput.value.trim();
  if (value === '') {
    flashInput();
    return;
  }
  tasks.unshift({ id: nextId++, text: value, completed: false });
  taskInput.value = '';
  taskInput.focus();
  DisplayTasks();
}

// Remove the FIRST task in the array
function deleteFirstTask() {
  if (tasks.length === 0) return;
  tasks.shift();
  DisplayTasks();
}

// Remove the LAST task in the array
function deleteLastTask() {
  if (tasks.length === 0) return;
  tasks.pop();
  DisplayTasks();
}

// Remove a single task by its unique id (used by the per-row delete button)
function deleteTaskById(id) {
  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });
  DisplayTasks();
}

// Toggle a task's completed state by its unique id
function toggleComplete(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks[i].completed = !tasks[i].completed;
      break;
    }
  }
  DisplayTasks();
}

// Remove every task
function clearAllTasks() {
  if (tasks.length === 0) return;
  const confirmed = confirm('Clear all ' + tasks.length + ' task(s)? This cannot be undone.');
  if (!confirmed) return;
  tasks = [];
  DisplayTasks();
}

// Count total tasks and completed tasks
function countTasks() {
  let completedCount = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].completed) completedCount++;
  }
  return { total: tasks.length, completed: completedCount };
}

// Build and return the message shown depending on how many tasks exist
function getStatusMessage(total, completed) {
  if (total === 0) {
    return "A clean slate — add your first task above.";
  }
  if (completed === total) {
    return "Everything's done. Nicely handled.";
  }
  if (total === 1) {
    return "One task on the list — you've got this.";
  }
  if (total >= 8) {
    return "That's a full plate (" + total + " tasks) — maybe tackle the top one first.";
  }
  return (total - completed) + " of " + total + " still open.";
}

// Render the entire task list from the array, using a loop to build each row
function DisplayTasks() {
  // Clear current list
  taskListEl.innerHTML = '';

  if (tasks.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'empty-state';
    empty.innerHTML = '<span class="doodle">nothing here yet</span>Add a task to get your list started.';
    taskListEl.appendChild(empty);
  } else {
    // Loop through the tasks array and generate a list item for each one
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];

      const li = document.createElement('li');
      li.className = 'task-row';

      const indexSpan = document.createElement('span');
      indexSpan.className = 'task-index';
      indexSpan.textContent = (i + 1) + '.';

      const checkBtn = document.createElement('button');
      checkBtn.className = 'task-check' + (task.completed ? ' done' : '');
      checkBtn.setAttribute('aria-label', 'Toggle complete');
      checkBtn.textContent = task.completed ? '✓' : '';
      checkBtn.addEventListener('click', function () {
        toggleComplete(task.id);
      });

      const textSpan = document.createElement('span');
      textSpan.className = 'task-text' + (task.completed ? ' done' : '');
      textSpan.textContent = task.text;
      textSpan.addEventListener('click', function () {
        toggleComplete(task.id);
      });

      const removeBtn = document.createElement('button');
      removeBtn.className = 'task-remove';
      removeBtn.innerHTML = '&times;';
      removeBtn.setAttribute('aria-label', 'Delete task');
      removeBtn.addEventListener('click', function () {
        deleteTaskById(task.id);
      });

      li.appendChild(indexSpan);
      li.appendChild(checkBtn);
      li.appendChild(textSpan);
      li.appendChild(removeBtn);
      taskListEl.appendChild(li);
    }
  }

  updateSummary();
}

// Update the count pill and the status message
function updateSummary() {
  const { total, completed } = countTasks();
  countLabel.textContent = total === 1 ? '1 task' : total + ' tasks';
  statusMessage.textContent = getStatusMessage(total, completed);
}

// Small visual nudge when the input is empty and a button is pressed
function flashInput() {
  taskInput.classList.add('is-invalid');
  taskInput.placeholder = 'Type something first…';
  setTimeout(function () {
    taskInput.classList.remove('is-invalid');
    taskInput.placeholder = 'e.g. Finish Chapter 4 problem set';
  }, 900);
  taskInput.focus();
}

/* ---------------------------------------------------
   EVENT LISTENERS
--------------------------------------------------- */
document.getElementById('addTaskBtn').addEventListener('click', addTask);
document.getElementById('addBeginningBtn').addEventListener('click', addTaskToBeginning);
document.getElementById('deleteFirstBtn').addEventListener('click', deleteFirstTask);
document.getElementById('deleteLastBtn').addEventListener('click', deleteLastTask);
document.getElementById('clearAllBtn').addEventListener('click', clearAllTasks);

taskInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    addTask();
  }
});

/* ---------------------------------------------------
   INITIAL TASK DISPLAY
--------------------------------------------------- */
DisplayTasks();





// //Array
// let David = [ "male", "13" ]

// //Object
//   let david = {
//   name: "David",
//   age: 13
// }

// console.log(tasks)
