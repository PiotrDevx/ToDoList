//Selectors
const taskInput = document.querySelector('.task-input');
const taskButton = document.querySelector('.task-button');
const taskList = document.querySelector('.task-list');
const filterOption = document.querySelector('.filter-task');


//EventListeners
taskButton.addEventListener('click', addTask);
taskList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTask);


//Functions
function addTask (event){
    event.preventDefault();
    //Div
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    //List
    const newTask = document.createElement('li');
    newTask.classList.add('task-item');
    newTask.innerText = taskInput.value;
    taskDiv.appendChild(newTask);
    //LOCALSTORAGE
    localTasks(taskInput.value);
    //Buttons
    const completeButton = document.createElement('button');
    completeButton.innerHTML= '<i class = "fas fa-check"> </i>';
    completeButton.classList.add('complete-btn');
    taskDiv.appendChild(completeButton);

    const removeButton = document.createElement('button');
    removeButton.innerHTML= '<i class = "fas fa-trash"> </i>';
    removeButton.classList.add('remove-btn');
    taskDiv.appendChild(removeButton);

    //Add to List
    taskList.appendChild(taskDiv); 

    //Clear task value
    taskInput.value = '';

}

function deleteCheck(e) {
    const item = e.target;
    //delete
    if(item.classList[0] === 'remove-btn' ){
        const task = item.parentElement;
        task.classList.add('fall')
        task.addEventListener('transitionend', function(){
            task.remove();
        });

    }

    if(item.classList[0] === 'complete-btn'){
        const task = item.parentElement;
        task.classList.toggle('completed');
    }

}

function filterTask(e){
    const tasker = taskList.childNodes;
    tasker.forEach(function(task){
        switch(e.target.value){
            case 'all':
                task.style.display = 'flex';
                break;
            case 'completed':
                if(task.classList.contains("completed")){
                    task.style.display = 'flex';
                } else {
                    task.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (!task.classList.contains('completed')){
                    task.style.display = 'flex';
                } else {
                    task.style.display = 'none';
                }
                break;
            
        }
    });
}

function localTasks(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else { 
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
