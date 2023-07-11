

const remainingTodo = (info) => {
     let myTodo = document.createElement('li')
     myTodo.className = 'mytodo-remaining'

     // confirm button
     let confirmBtn = document.createElement('button')
     confirmBtn.className = 'confirmBtn'
     confirmBtn.textContent = 'Confirm'

     // delete button
     let deleteBtn = document.createElement('button')
     deleteBtn.className = 'delete'
     deleteBtn.textContent = 'Delete'

     myTodo.textContent = `${info.Name} ${info.Description}`
     myTodo.appendChild(confirmBtn)
     myTodo.appendChild(deleteBtn)

     let myTodosRemaining = document.getElementsByClassName('remaining')[0]
     myTodosRemaining.appendChild(myTodo)

     // confirm button functionality
     confirmBtn.addEventListener('click', () => {
          myTodosRemaining.removeChild(myTodo);

          let myTodosDone = document.getElementsByClassName('done')[0];
          myTodo.className = '';
          myTodo.removeChild(confirmBtn);
          myTodo.removeChild(deleteBtn);

          myTodosDone.appendChild(myTodo);

          // POST request
          axios.post('https://crudcrud.com/api/441ea58b568a4557b7758bdfbed4f3a3/todoList', {
               name: info.Name,
               description: info.Description
          })
               .then(response => {
                    console.log('Post request successful', response);
               })
               .catch(error => {
                    console.error('Error making POST request', error);
               });
     });

     // delete button functionality
     deleteBtn.addEventListener('click', () => {
          myTodosRemaining.removeChild(myTodo);
     });
}

const handleDetails = () => {
     let todoName = document.getElementsByClassName('todo-name')[0].value.trim()
     let todoDescription = document.getElementsByClassName('todo-description')[0].value.trim()

     remainingTodo({ Name: todoName, Description: todoDescription })
}


const getSavedDetails = () => {
     axios.get('https://crudcrud.com/api/441ea58b568a4557b7758bdfbed4f3a3/todoList')
          .then(response => {
               const savedDetails = response.data;
               savedDetails.forEach(detail => {
                    let myTodo = document.createElement('li');
                    myTodo.textContent = `${detail.name} ${detail.description}`;

                    let myTodosDone = document.getElementsByClassName('done')[0];
                    myTodosDone.appendChild(myTodo);
               });
          })
          .catch(error => {
               console.error('Error fetching saved details', error);
          });
};



document.getElementsByClassName('btn')[0].addEventListener('click', handleDetails)

window.addEventListener('DOMContentLoaded', getSavedDetails);