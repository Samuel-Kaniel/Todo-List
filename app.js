// selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

const filterOption = document.querySelector(".filter-todo");

//Event listeners 

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// functions

function addTodo(e){
    e.preventDefault();
    // console.log('hello');

    // todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo)

    // Add todo to localstorage
    saveLocalTodos(todoInput.value)
    // check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);


    // append to list
    todoList.appendChild(todoDiv);


    // clear todo input value
    todoInput.value = "";
}

function deleteCheck(e){
    // console.log(e.target)
    const item = e.target;

    // delete todo
    if(item.classList[0] === "trash-btn"){
        // item.remove();
        const todo = item.parentElement;
        // animation
        todo.classList.add('fall');
        removeLocalTodos();
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })

        // todo.remove();
    }

    // check mark
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed")
    }
}


// fliter todo
function filterTodo(e){
    const todos = todoList.childNodes;
    // console.log(todos)
    todos.forEach(function(todo){
        const TodoStyle = todo.style;
        if(TodoStyle != undefined && TodoStyle != null){
            switch(e.target.value){
                case "all":
                    // todo.style.display = "flex";
                    todo.style.display = "flex";
                    break;
                case "completed":
                    if(todo.classList.contains("completed")){
                        todo.style.display = "flex";
                    }
                    else{
                        todo.style.display = 'none';
                    }
                    break;

                case "uncompleted":
                    if(!todo.classList.contains("completed")){
                        TodoStyle.display = "flex";
                    }
                    else{
                        TodoStyle.display = "none";
                    }
                    break;
            }

        }
        
    })
}


// stored in local storage

function saveLocalTodos(todo){
    // check
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos))
}


function getTodos(){
    let todos;
    // still check in the local storage
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo){
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        // create li
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo)
    
        // Add todo to localstorage
        // saveLocalTodos(todoInput.value)
        // check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
    
        // trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
    
    
        // append to list
        todoList.appendChild(todoDiv);
    })
}

// remove the todo list from local storage

function removeLocalTodos(todo){
    console.log("hey");
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    // const todoIndex = todo.children[0].innerText;
    // const todoIndex = Array.from(todoList.childNodes).indexOf(todo);
    // // todos.splice(todos.indexOf(todoIndex), 1);
    // todos.splice(todoIndex, 1);
    // localStorage.setItem("todos", JSON.stringify(todos))

    const itemIndex = todos.findIndex((element, index) => {
        if (element.text === todo){
            return true;
        }
    })
    if (itemIndex != -1){
        todos.splice(itemIndex, 1);
    }
    localStorage.setItem("todos", JSON.stringify(todos))
}





