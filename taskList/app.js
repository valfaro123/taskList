//UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//Load all event listeners
loadEventListeners();

//function loadEventListeners
function loadEventListeners(){
    //Load event to add saved items to list
    document.addEventListener('DOMContentLoaded', getTasks);

    // adds a submit event listener to form. calls addTask when heard
    form.addEventListener('submit', addTask);

    //adds a click event listener to taskLsit. calls removeTask when heard
    taskList.addEventListener('click',removeTask);

    //adds click event listener to clearBtn. Calls clearTasks when heard
    clearBtn.addEventListener('click',clearTasks);

    //adds keyup event listener to search. Calls searchTasks when heard
    search.addEventListener('keyup',searchTasks);


}

// Get tasks from local storage 
function getTasks(e){
    let tasks;
    //if local storage does not contains  tasks...
    if(localStorage.getItem('tasks')===null){
        //...then create a new arr for tasks
        tasks = [];
    } else{
        // else grab the tasks and parse them
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        appendTask(task);
    });
}

//function addTask will add task as well as the link to remove task to form
function addTask(e){
    //checks to see if tasks are empty if so alert
    if(taskInput.value === ''){
        alert('Please add a task first!!');
        e.preventDefault();
        return;
    }
    //Save to local storage
    saveTaskInLocalStorage(taskInput.value);
    appendTask();
    
    //clear input for next item
    taskInput.value = '';


    //prevent the default behavior
    e.preventDefault();
}

//function removeTask will remove task when x icon is clicked
function removeTask(e){

    if(e.target.parentElement.classList.contains('delete-item')){
        //get the parent of the parent of the x icon aka list item
        e.target.parentElement.parentElement.remove();

        //remove from local storage 
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }

    e.preventDefault();
}

//function clearTasks removes all tasks from task list
function clearTasks(e){

    //removes child from task list until empty. faster than innerHtml 
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    clearTasksFromLocalStorage();
}

//function searches tasks by text in search box
function searchTasks(e){
    //this will grab the value of what is being targeted and sets it to lowercase
    const text = e.target.value.toLowerCase();

    //will go throguh all 'collection-item'
    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.textContent;
            //will return -1 if not a match so if not = -1...
            if(item.toLocaleLowerCase().indexOf(text) != -1){
                //...then display 
                task.style.display = 'block';
            }else{
                //else dont display
                task.style.display = 'none';
            
            }
        }
    );
}

//function to save task to local storage. This will save list even if session is turned off/reset
function saveTaskInLocalStorage(task){
    let tasks;
    //if local storage does not contains  tasks...
    if(localStorage.getItem('tasks')===null){
        //...then create a new arr for tasks
        tasks=[];
    } else{
        // else grab the tasks and parse them
        tasks= JSON.parse(localStorage.getItem('tasks'));
    }
    //push the task onto the tasks list
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function appendTask(task){
    //Create list element
    const li = document.createElement('li');
    //add a class name. since it is child of collection use collection-item
    li.className='collection-item';
    //this creates a textnode from value in taskInput and appends to list
    if(typeof task !== "undefined"){
        li.appendChild(document.createTextNode(task));
        li.appendChild(document.createTextNode(taskInput.value));
    } else { li.appendChild(document.createTextNode(taskInput.value));}
    //create link for 'x' remove 
 
    const link = document.createElement('a');
    //add class needs sec-content to be to the right bc of materialize 
    link.className= 'delete-item secondary-content';
    //add the 'x' icon
    link.innerHTML = '<i class= "fa fa-remove"></i>';
    //append to list element
    li.appendChild(link);
 
    //append li to the task list
    taskList.appendChild(li);

}

//function to remove individual task
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    //if local storage does not contains  tasks...
    if(localStorage.getItem('tasks')===null){
        //...then create a new arr for tasks
        tasks=[];
    } else{
        // else grab the tasks and parse them
        tasks= JSON.parse(localStorage.getItem('tasks'));
    }
    //loop through each task until matched and splice it out
    tasks.forEach(function(task,index){
        if(taskItem.textContent === task){
            tasks.splice(index,1);
        }
    });
    //then update the list
    localStorage.setItem('tasks',JSON.stringify(tasks));

}
//function to clear all tasks
function clearTasksFromLocalStorage(){
    //clear all local storage
    localStorage.clear();
}