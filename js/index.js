const handleDelete=(e,id) => {
    e.stopPropagation();
    const data =JSON.parse(localStorage.getItem('list'));

    const updatedData=data.filter((elem,idx) => {
        return id!=idx;
    });

    const tasks=document.querySelectorAll('.task');

    tasks.forEach((elem,idx) => {
        if(idx==id){
            elem.style.transform="translate(-100%,0)";
            elem.style.opacity="0";
        }
    })
    
    setTimeout(() => {
        localStorage.setItem('list',JSON.stringify(updatedData));
        render();
    }, 200);
};

const handleTaskDone= (e,id) => {
    e.stopPropagation();
    let data =JSON.parse(localStorage.getItem('list'));

    data.forEach((elem,idx) => {
        if(id==idx){
            elem.status='completed';
        }
    });

    const tasks=document.querySelectorAll('.task');

    tasks.forEach((elem,idx) => {
        if(idx==id){
            elem.style.transform="scale(0.5)";
            elem.style.opacity="0";
        }
    })

    setTimeout(() => {
        localStorage.setItem('list',JSON.stringify(data));
        render();
    }, 200);
};

const render=() => {

    let temp='';

    const data=JSON.parse(localStorage.getItem('list'));

    const select=document.getElementById('completionStatus').value;

    if(data==null || data.length==0){
        document.getElementById('noTask').style.display="flex";
    }

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
        elem.addEventListener('click',(e) => handleDelete(e,e.target.id));
    });

    taskDoneButtons.forEach(elem => {
        elem.addEventListener('click',(e) => handleTaskDone(e,e.target.id));
    });

    tasks.forEach((elem,idx) => {
        
        elem.addEventListener('click', () => {
            window.location.assign(`/details.html?id=${idx}`);
        });

        if(select!='all' && select!=data[idx].status){
            elem.style.display="none";
        }
        
        if(data[idx].status=='completed'){
            elem.style.opacity="0.6"; 
            elem.style.order="2"; 
        }
    });
};

window.addEventListener('DOMContentLoaded',render);

document.getElementById('allClear').addEventListener('click',() => {
    const data=[];
    if(confirm('do you want to remove all the task')){
        localStorage.setItem('list',JSON.stringify(data));
        window.location.reload();
    }
});

document.getElementById('completionStatus').addEventListener('change',render);
