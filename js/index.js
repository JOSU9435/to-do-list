const handleDelete=(id) => {
    const data =JSON.parse(localStorage.getItem('list'));

    const updatedData=data.filter((elem,idx) => {
        return id!=idx;
    });

    localStorage.setItem('list',JSON.stringify(updatedData));
    render();
};

const handleTaskDone= (id) => {

    let data =JSON.parse(localStorage.getItem('list'));

    data.forEach((elem,idx) => {
        if(id==idx){
            elem.status='completed';
        }
    });

    localStorage.setItem('list',JSON.stringify(data));
    render();
};

const render=() => {

    let temp='';

    const data=JSON.parse(localStorage.getItem('list'));

    const select=document.getElementById('completionStatus').value;
    
    if(data){
        data.forEach((task,idx) => {

            let doneTask=`<div class="taskDone"><i class="fas fa-check" id="${idx}"></i></div>`
            if(task.status=='completed'){
                doneTask='';
            }

            temp+=`<div class="task">
                    <h2>${task.info}</h2>
                    <div class="buttons">
                        ${doneTask}
                        <div class="deleteButton"><i class="fas fa-trash-alt" id="${idx}"></i></div>
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

        if(select!='all' && select!=data[idx].status){
            elem.style.display="none";
        }
        
        if(data[idx].status=='completed'){
            elem.style.opacity="0.6";  
        }
    });
};

window.addEventListener('DOMContentLoaded',render);

// form.addEventListener('submit',addNewTask);

// console.log(localStorage);
// console.log(localStorage.getItem('list'));
// localStorage.clear();

document.getElementById('allClear').addEventListener('click',() => {
    const data=[];
    localStorage.setItem('list',JSON.stringify(data));
    window.location.reload();
});

document.getElementById('completionStatus').addEventListener('change',render);
