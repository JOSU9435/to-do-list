const data=[
    {
        heading:'alksdjf',
        description:'asdfasdf',
    },
    {
        heading:'alksdjf',
        description:'asdfasdf',
    },
]

const render=() => {

    let temp=document.getElementById('container').innerHTML;
    data.forEach(task => {
        temp+=`<div class="task">${task.heading}</div>`;
    });

    document.getElementById('container').innerHTML=temp;
};

window.addEventListener('DOMContentLoaded',() => render());