//Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks  ');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//load All events
loadEventlisteners(); 

//Load all event listeners
function loadEventlisteners(){
    // // Dom load event
    document.addEventListener('DOMContentLoaded', getTasks); 
    //add task event
    form.addEventListener('submit', addTask);
    //remove task
    taskList.addEventListener('click', removeTask);
    //clear task
    clearBtn.addEventListener('click', clearTasks);
    //filter task
    filter.addEventListener('keyup', filterTask);

}

// Get tasks from ls
function getTasks(){
    let tasks;
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks')); 
    }


    tasks.forEach(function(task){
        //create element
        const li = document.createElement('li');
        //add class
        li.className = 'collection-item';
        //create textnode and append to child
        li.appendChild(document.createTextNode(task));
        //create new link element
        const link = document.createElement('a');
        //add class
        link.className = 'delete-item secondary-content';
        //add icon
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //append the link to li
        li.appendChild(link);
        //append li to ul
        taskList.appendChild(li);

    });

}




//add Task
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task')
    }

    //create element
    const li = document.createElement('li');
    //add class
    li.className = 'collection-item';
    //create textnode and append to child
    li.appendChild(document.createTextNode(taskInput.value));
    //create new link element
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';
    //add icon
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append the link to li
    li.appendChild(link);
    //append li to ul
    taskList.appendChild(li);

    //storeTaskInlocalStorage
    storeTaskInLocalStorage(taskInput.value);


    //clear input
    taskInput.value = '';

    e.preventDefault();
}


// store tasks
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks')); 
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}




// Remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('are you sure')){
            e.target.parentElement.parentElement.remove();

            //Remove Task From ls
             removeTaskFromLocalStorage(e.target.parentElement.parentElement)
        }
     
    }
}

//Remove task from ls
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks')); 
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//clear from task
function clearTasks() {
    // taskList.innerHTML = '';

    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    clearTasksFromLocalStorage();
}

//clear from local storage
function clearTasksFromLocalStorage() {
    localStorage.clear();
}


    
function filterTask(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else{
           task.style.display = 'none';
        }
    });
}






































