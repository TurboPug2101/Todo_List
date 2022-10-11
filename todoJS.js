const form=document.querySelector('#task-form');
// task list is ul
const taskList=document.querySelector('.collection');
const clearbtn=document.querySelector('.clear-tasks');
const filter=document.querySelector('#filter');
const taskinput=document.querySelector('#task');

// load all event listeners
loadEventListerners();

function loadEventListerners(){
                // DOM LOAD EVENT
                document.addEventListener('DOMContentLoaded',getTasks);
            // add task event
            form.addEventListener('submit',addTask);

            taskList.addEventListener('click',removeTask);
            clearbtn.addEventListener('click',clearTask);
            filter.addEventListener('keyup',filtertask);
    }

// getting tasks from local storage
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
    const li=document.createElement('li');
    li.className='collection-item';
//  create text node and added to li
    li.appendChild(document.createTextNode(task));

// new link element
    const link=document.createElement('a');

    link.className='delete-item secondary-content';
// anything which has to come on the right of list item has to have "sec-content" class in materialize
// adding x icon
    link.innerHTML='<i class="fa fa-remove"></i>';
 
    li.appendChild(link);
    taskList.appendChild(li);
    });
}

// add task
function addTask(e){
if(taskinput.value===''){
    alert('Add A Task');
}
// create li element
 const li=document.createElement('li');
 li.className='collection-item';
//  create text node and added to li
 li.appendChild(document.createTextNode(taskinput.value));

// new link element
const link=document.createElement('a');

link.className='delete-item secondary-content';
// anything which has to come on the right of list item has to have "sec-content" class in materialize
// adding x icon
link.innerHTML='<i class="fa fa-remove"></i>';
 
li.appendChild(link);
//console.log(li);
taskList.appendChild(li);
// appending li to ul
// console.log(taskList);
storeTaskInLocalStorage(taskinput.value);

taskinput.value='';

    e.preventDefault();
}
// ADD TO LOCAL STORAGE
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    // local storage always 
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

// remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        // if(confirm('Are You Sure ?'))
        e.target.parentElement.parentElement.remove();

        // removig from localstorage
        removeTaskFromLocalSorage(e.target.parentElement.parentElement);

    }

}
function  removeTaskFromLocalSorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){
        if(taskItem.textContent===task){
            tasks.splice(index,1);
            // delete 1 from the index
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function clearTask(e){
    // taskList.innerHTML='';

    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    clearTasksFromLocalStorage();
}
function clearTasksFrofmLocalStorage()
{
    localStorage.clear();
}
function filtertask(e){
    const text=e.target.value.toLowerCase();
    // queryselALL gives array oof node items so we can use forEach
    document.querySelectorAll('.collection-item').forEach(function(task){
            const item=task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text)==0){
                task.style.display='block';
            }
            else{
                task.style.display='none';
            }
    });
}

 
