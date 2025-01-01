# ToDo List Application

## Overview

This ToDo List application is a lightweight, interactive tool designed for managing your daily tasks. It allows users to add, edit, mark as completed, and delete tasks efficiently. The app uses `localStorage` to persist data, ensuring tasks are saved even after the browser is closed.

---

## Features

### 1. Add Tasks

* Input task name and due date using dedicated fields.
* Tasks are validated to ensure both fields are filled before submission.

### 2. Edit Tasks

* Update the task name and due date.
* Includes "Save" and "Cancel" options during editing.

### 3. Delete Tasks

* Remove tasks individually with a dedicated delete button.

### 4. Mark Tasks as Completed

* Tasks can be marked as completed via checkboxes.
* Completed tasks are displayed with a strikethrough for visual clarity.

### 5. Persistent Data Storage

* Tasks are saved in `localStorage` for persistence across browser sessions.

---

## Technology Stack

* **HTML** : Structure of the application.
* **CSS** : Styling and layout.
* **JavaScript** : Logic and interactivity.
* **localStorage** : Persistent data storage.

---

## Installation and Usage

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/todolist-app.git
   cd todolist-app
   ```
2. **Open in Browser:**
   * Open the `index.html` file in your browser.
3. **Start Managing Tasks:**
   * Use the provided fields and buttons to manage your tasks.

---

## Code Highlights

### Adding a Task

```javascript
function addTodo() {
   const nameInput = document.querySelector(".name-input");
   const dateInput = document.querySelector(".due-date-input");
   const todoName = nameInput.value.trim();
   const todoDueDate = dateInput.value.trim();

   if (todoName && todoDueDate) {
      todoList.push({ todoName, todoDueDate, completed: false });
      saveTodoListToLocalStorage();
      nameInput.value = '';
      dateInput.value = '';
      renderTodoHTML();
   } else {
      alert("Please fill out both fields before adding a todo.");
   }
}
```

### Editing a Task

```javascript
function editTodo(index) {
   const todoItem = todoList[index];
   const todoElement = document.querySelectorAll('.todo-item')[index];

   const newNameInput = `<input type="text" value="${todoItem.todoName}" class="new-name-input">`;
   const newDateInput = `<input type="date" value="${todoItem.todoDueDate}" class="new-date-input">`;
   const newSaveButton = `<button class="save-edit-button" data-index="${index}">Save</button>`;
   const newCancelButton = `<button class="cancel-edit-button" data-index="${index}">Cancel</button>`;

   todoElement.innerHTML = `${newNameInput}${newDateInput}<div>${newSaveButton}${newCancelButton}</div>`;

   document.querySelector(`.cancel-edit-button[data-index="${index}"]`).addEventListener('click', () => {
      renderTodoHTML();
   });

   document.querySelector(`.save-edit-button[data-index="${index}"]`).addEventListener('click', () => {
      const updatedName = document.querySelector('.new-name-input').value.trim();
      const updatedDate = document.querySelector('.new-date-input').value.trim();

      if (updatedName && updatedDate) {
         todoList[index].todoName = updatedName;
         todoList[index].todoDueDate = updatedDate;
         saveTodoListToLocalStorage();
         renderTodoHTML();
      } else {
         alert("Both fields must be filled out.");
      }
   });
}
```

---

## Styling Highlights

The app features a modern, minimalistic design with hover and active state animations for buttons. The CSS ensures a responsive layout that works on various screen sizes.

### Example CSS

```css
.add-todo-button {
   background-color: #007bff;
   color: white;
   border: none;
   border-radius: 4px;
   padding: 10px 15px;
   font-size: 16px;
   cursor: pointer;
   transition: all 0.3s ease;
}

.add-todo-button:hover {
   background-color: #0056b3;
   transform: scale(1.05);
}

.cross {
   text-decoration: line-through;
   color: gray;
}
```

---

## Contributing

1. Fork the repository.
2. Create a new branch for your feature.
3. Commit your changes.
4. Open a pull request.

## Contact

For questions or support, contact [jm.mahival@gmail.com].
