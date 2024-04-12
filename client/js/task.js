const baseURL = 'http://localhost:3000/tasks';

async function fetchTasks() {
  try {
    const response = await fetch(baseURL);
    let tasks = await response.json();
    tasks = tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort tasks by createdAt in descending order
    displayTasks(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
}


async function toggleTaskStatus(taskId, completed) {
  try {
      const response = await fetch(`${baseURL}/${taskId}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ completed })
      });
      const updatedTask = await response.json();
      fetchTasks();
  } catch (error) {
      console.error('Error updating task status:', error);
  }
}

async function deleteTask(taskId) {
  try {
      const response = await fetch(`${baseURL}/${taskId}`, {
          method: 'DELETE'
      });
      const data = await response.json();
      console.log(data.message); // Log the message from the server
      fetchTasks(); // Refresh the task list after deletion
  } catch (error) {
      console.error('Error deleting task:', error);
  }
}

function displayTasks(tasks) {
  const tasksList = document.getElementById('tasksList');
  tasksList.innerHTML = '';

  tasks.forEach(task => {
      const taskCard = document.createElement('div');
      taskCard.classList.add('task-card');

      // Checkbox and task name elements...

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('delete');
      deleteButton.addEventListener('click', () => {
          deleteTask(task._id); // Call deleteTask function when delete button is clicked
      });
      taskButtons.appendChild(deleteButton);

      taskCard.appendChild(taskButtons);

      tasksList.appendChild(taskCard);
  });
}

function displayTasks(tasks) {
  const tasksList = document.getElementById('tasksList');
  tasksList.innerHTML = '';

  tasks.forEach(task => {
      const taskCard = document.createElement('div');
      taskCard.classList.add('task-card');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', () => {
          toggleTaskStatus(task._id, checkbox.checked);
      });
      taskCard.appendChild(checkbox);

      const taskName = document.createElement('div');
      taskName.classList.add('task-name');
      taskName.textContent = task.name;
      if (task.completed) {
          taskName.style.textDecoration = 'line-through';
      }
      taskCard.appendChild(taskName);

      const taskButtons = document.createElement('div');
      taskButtons.classList.add('task-buttons');

      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      taskButtons.appendChild(editButton);

 const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', () => {
            deleteTask(task._id); // Call deleteTask function when delete button is clicked
        });
        taskButtons.appendChild(deleteButton);

      taskCard.appendChild(taskButtons);

      tasksList.appendChild(taskCard);
  });
}





async function addTask(event) {
    event.preventDefault();
    const taskName = document.getElementById('taskName').value;
    try {
      const response = await fetch(baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ taskName: taskName })
      });
      const newTask = await response.json();
      fetchTasks();
      document.getElementById('taskName').value = ''; // Clear the input field
    } catch (error) {
      console.error('Error adding task:', error);
    }
  }

document.getElementById('addTaskForm').addEventListener('submit', addTask);

fetchTasks();
