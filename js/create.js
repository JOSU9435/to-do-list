console.log(localStorage);

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
        detail: form.detail.value,
        status: 'incomplete',
    };

    data.push(newTask);

    localStorage.setItem('list',JSON.stringify(data));

    form.newTask.value='';

    window.location.replace('/index.html');
}

form.addEventListener('submit',addNewTask);