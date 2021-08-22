const handleDelete=(id) => {

    const data =JSON.parse(localStorage.getItem('list'));

    const updatedData=data.filter((elem,idx) => {
        return id!=idx;
    });

    localStorage.setItem('list',JSON.stringify(updatedData));
    render();
};

const handleTaskDone= (id) => {

    console.log(id);

    let data =JSON.parse(localStorage.getItem('list'));

    data.forEach((elem,idx) => {
        if(id==idx){
            elem.status=true;
            const btn = document.getElementsByClassName('taskDone')[id];
        }
    });

    localStorage.setItem('list',JSON.stringify(data));
    render();
};

const render=() => {

    let temp='';

    const data=JSON.parse(localStorage.getItem('list'));

    if(data){
        data.forEach((task,idx) => {

            let doneTask=`<button class="taskDone" id="${idx}">DONE</button>`
            if(task.status){
                doneTask='';
            }
            temp+=`<div class="task">
                    <h2>${task.info}</h2>
                    <div class="buttons">
                        ${doneTask}
                        <button class="deleteButton" id="${idx}">DELETE</button>
                    </div>
                </div>`;
        });
    }
    document.getElementById('container').innerHTML=temp;

    const deleteButtons=document.querySelectorAll('.deleteButton');
    const taskDoneButtons=document.querySelectorAll('.taskDone');
    const tasks=document.querySelectorAll('.task');

    deleteButtons.forEach(elem => {
        elem.addEventListener('click',(e) => handleDelete(e.target.id));
    });

    taskDoneButtons.forEach(elem => {
        elem.addEventListener('click',(e) => handleTaskDone(e.target.id));
    });
    tasks.forEach((elem,idx) => {
        if(data[idx].status){
            elem.style.opacity="0.6";  
        }
    });
};

window.addEventListener('DOMContentLoaded',render);

// form.addEventListener('submit',addNewTask);

// console.log(localStorage);
// console.log(localStorage.getItem('list'));
// localStorage.clear();

