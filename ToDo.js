
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
   const todoELement = document.querySelectorAll('.todo-item')[index];
   const todoELementCopy = todoELement.innerHTML; //

   const newNameInput = `<input type="text" value=${todoItem.todoName} class="new-name-input"> `;
   const newDateInput = `<input type="date" value=${todoItem.todoDueDate} class="new-duedate-input"> `;
   const newSaveButton = `<button class="save-edit-button" data-index="${index}">Save</button>`;
   const newCancelButton = `<button class="cancel-edit-button" data-index="${index}">Cancel</button>`;

   todoELement.innerHTML = `
      ${newNameInput}
      ${newDateInput}
      <div class="new-edit-button-container">
         ${newSaveButton}
         ${newCancelButton}
      </div>
   `;

   document.querySelectorAll('.cancel-edit-button')[index].addEventListener('click', () => {
      todoELement.innerHTML = todoELementCopy;

      attachEventListeners();
   });

   document.querySelectorAll('.save-edit-button')[index].addEventListener('click', () => {
      const newName = document.querySelector('.new-name-input').value.trim();
      const newDueDate = document.querySelector('.new-duedate-input').value.trim();

      if (newName && newDueDate) {
         todoItem.todoName = newName;
         todoItem.todoDueDate = newDueDate;
         saveTodoListToLocalStorage();
         renderTodoHTML();
      }
      else {
         alert("Please fill out both fields before saving the changes.");
      }
   })

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
   //! checkbox handler.
   document.querySelectorAll('.checkbox').forEach(checkbox => {
      checkbox.addEventListener('change', (event) => {
         const index = event.target.getAttribute('data-index');
         todoList[index].completed = event.target.checked;
         saveTodoListToLocalStorage();
         renderTodoHTML();
      });
   });


   //! edit button handler
   document.querySelectorAll('.edit-todo-button').forEach(editButton => {
      editButton.addEventListener('click', (event) => {
         const index = event.target.getAttribute('data-index');
         editTodo(index);
      });
   });


   //! delete button handler
   document.querySelectorAll('.delete-todo-button').forEach(deleteButton => {
      deleteButton.addEventListener('click', (event) => {
         const index = event.target.getAttribute('data-index');
         deleteTodo(index);
      });
   });
};

