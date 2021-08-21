const handleDelete=(id) => {

    const data =JSON.parse(localStorage.getItem('list'));
    console.log('kdkd');

    // const updatedData=data.filter((elem,idx) => {
    //     return id!=idx;
    // });
    
    // localStorage.setItem('list',JSON.stringify(updatedData));
};

const render=() => {

    let temp='';

    const data=JSON.parse(localStorage.getItem('list'));

    if(data){
        data.forEach((task,idx) => {
            temp+=`<div class="task">
                    <h2>${task.info}</h2>
                    <button class="deleteButton" id="${idx}">DELETE</button>
                </div>`;
        });
    }
    document.getElementById('container').innerHTML=temp;

    const deleteButtons=document.querySelectorAll('.deleteButton');

    deleteButtons.forEach(elem => {
        elem.addEventListener('click',handleDelete);
    });
};

window.addEventListener('DOMContentLoaded',render);

// ADDING NEW TASK

const form=document.getElementById('addTask');

const addNewTask=(e) => {
    e.preventDefault();

    if(!localStorage.getItem('list')){
        let list=[];
        localStorage.setItem('list',JSON.stringify(list));
    }

    let data=JSON.parse(localStorage.getItem('list'));

    const newTask={
        info: form.newTask.value,
    };

    data.push(newTask);

    localStorage.setItem('list',JSON.stringify(data));

    form.newTask.value='';

    render();
}

form.addEventListener('submit',addNewTask);

// console.log(localStorage);
// console.log(localStorage.getItem('list'));
// localStorage.clear();

