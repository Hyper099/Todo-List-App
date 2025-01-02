
//! the array to store the name and duedate also certain properties.
let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

renderTodoHTML(); //? rendering if there is something in localStorage.

function saveTodoListToLocalStorage() {
   localStorage.setItem("todoList", JSON.stringify(todoList));
}

document.querySelector(".js-add-button").addEventListener('click', () => { addTodo(); });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//! Functions to handle Button events.

function addTodo() {
   const nameInput = document.querySelector(".name-input");
   const dateInput = document.querySelector(".due-date-input");
   const todoName = nameInput.value.trim();
   const todoDueDate = dateInput.value.trim();

   if (todoName && todoDueDate) {
      todoList.push({ todoName, todoDueDate, completed: false }); //?intially completed set to false which would be later updated in checkbox.
      saveTodoListToLocalStorage();
      nameInput.value = ''; //?resetting fields.
      dateInput.value = '';
      renderTodoHTML();
   } else {
      alert("Please fill out both fields before adding a todo.");
   }
}

function deleteTodo(index) {
   todoList.splice(index, 1); //? deletes from the array at that index and 1 item.
   saveTodoListToLocalStorage();
   renderTodoHTML()
}

function editTodo(index) {
   const todoItem = todoList[index];
   const todoElement = document.querySelectorAll('.todo-item')[index];
   const todoElementCopy = todoElement.innerHTML;

   const newNameInput = `<input type="text" value="${todoItem.todoName}" class="new-name-input">`;
   const newDateInput = `<input type="date" value="${todoItem.todoDueDate}" class="new-duedate-input">`;
   const newSaveButton = `<button class="save-edit-button">Save</button>`;
   const newCancelButton = `<button class="cancel-edit-button">Cancel</button>`;

   todoElement.innerHTML = `
      ${newNameInput}
      ${newDateInput}
      <div class="new-edit-button-container">
         ${newSaveButton}
         ${newCancelButton}
      </div>
   `;

   const cancelButton = todoElement.querySelector('.cancel-edit-button');
   cancelButton.addEventListener('click', () => {
      todoElement.innerHTML = todoElementCopy;
      attachEventListenersForItem(todoElement, index);
   });

   const saveButton = todoElement.querySelector('.save-edit-button');
   saveButton.addEventListener('click', () => {
      const newName = todoElement.querySelector('.new-name-input').value.trim();
      const newDueDate = todoElement.querySelector('.new-duedate-input').value.trim();

      if (newName && newDueDate) {
         todoItem.todoName = newName;
         todoItem.todoDueDate = newDueDate;
         todoItem.completed = false;
         saveTodoListToLocalStorage();

         todoElement.innerHTML = `
            <input type="checkbox" class="checkbox" data-index="${index}" ${todoItem.completed ? 'checked' : ''}>
            
            <div class="todo-name ${todoItem.completed ? 'cross' : ''}">${todoItem.todoName}</div>
            
            <div class="due-date-and-button-container">
               <div class="todo-due-date">${todoItem.todoDueDate}</div>
                  <button class="edit-todo-button" data-index="${index}">Edit</button>
                  <button class="delete-todo-button" data-index="${index}">Delete</button>
            </div>
         `;
         attachEventListenersForItem(todoElement, index);

      } else {
         alert("Please fill out both fields before saving the changes.");
      }
   });
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function renderTodoHTML() {
   let todoListHTML = '';
   todoList.forEach((todo, index) => {
      todoListHTML += `
        <div class="todo-item">
            <input type="checkbox" class="checkbox" data-index="${index}" ${todo.completed ? 'checked' : ''}>
            
            <div class="todo-name ${todo.completed ? 'cross' : ''}">${todo.todoName}</div>
            
            <div class="due-date-and-button-container">
               <div class="todo-due-date">${todo.todoDueDate}</div>
                  <button class="edit-todo-button" data-index="${index}">Edit</button>
                  <button class="delete-todo-button" data-index="${index}">Delete</button>
            </div>
        </div>`;
   });

   document.querySelector(".js-todo-list").innerHTML = todoListHTML;


   attachEventListeners();
}

function attachEventListeners() {
   const todoItems = document.querySelectorAll('.todo-item');
   todoItems.forEach((todoElement, index) => {
      attachEventListenersForItem(todoElement, index);
   });
}



function attachEventListenersForItem(todoElement, index) {

   const checkbox = todoElement.querySelector('.checkbox');
   checkbox.addEventListener('change', () => {
      todoList[index].completed = checkbox.checked;
      saveTodoListToLocalStorage();
      const todoName = todoElement.querySelector('.todo-name');
      todoName.classList.toggle('cross', checkbox.checked);
   });

   const editButton = todoElement.querySelector('.edit-todo-button');
   editButton.addEventListener('click', () => { editTodo(index); });

   const deleteButton = todoElement.querySelector('.delete-todo-button');
   deleteButton.addEventListener('click', () => { deleteTodo(index); });
}


