const id=new URLSearchParams(window.location.search).get('id');

const renderDetails=() => {

    const data= JSON.parse(localStorage.getItem('list'));
    let task;
    data.forEach((elem,idx) => {
        if(id==idx){
            task=elem;
            return;
        }
    });

    let taskDone='<div id="taskDone"><i class="fas fa-check"></i></div>';

    if(task.status=='completed'){
        taskDone='<div id="taskDone">Marked as Done</div>';
    }

    const temp=`<h1 id="info">${task.info}</h1>
                <p id="detail">${task.detail}</p>
                <div id="buttons">
                    ${taskDone}
                    <div id="deleteButton"><i class="fas fa-trash-alt"></i></div>
                </div>`;

    document.getElementById('container').innerHTML=temp;

    if(task.status!='completed')
    document.getElementById('taskDone').addEventListener('click',handleTaskDone);

    document.getElementById('deleteButton').addEventListener('click',handleDelete);

    if(task.status=='completed'){
        const btn=document.getElementById('taskDone');
        btn.style.padding="0.5rem 0.5rem";
        btn.style.backgroundColor="#444554";
        btn.style.cursor="unset";
    }
}

window.addEventListener('DOMContentLoaded',renderDetails);

const handleDelete=() => {
    const data =JSON.parse(localStorage.getItem('list'));

    const updatedData=data.filter((elem,idx) => {
        return id!=idx;
    });

    localStorage.setItem('list',JSON.stringify(updatedData));

    window.location.replace('/');
};

const handleTaskDone= () => {
    let data =JSON.parse(localStorage.getItem('list'));

    data.forEach((elem,idx) => {
        if(id==idx){
            elem.status='completed';
        }
    });

    localStorage.setItem('list',JSON.stringify(data));

    renderDetails();
};