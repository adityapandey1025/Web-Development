let input=document.getElementById("input-text");
let btn=document.getElementById("input-button");
let view=document.querySelector(".view");

function addTask(){
    let taskText=input.value.trim();
    if(taskText=== "") return;

    // creating a wrapper
    let task=document.createElement('div');
    task.classList.add("task-item");

    // creating checkbox buttons
    let check=document.createElement('input');
    check.type="checkbox";

    // text content

    let content=document.createElement('span');
    content.innerText=taskText;

    // dlt button

    let dlt_btn=document.createElement('button');
    dlt_btn.innerText="X";
    dlt_btn.classList.add("dlt-button");

    task.appendChild(check);
    task.appendChild(content);
    task.appendChild(dlt_btn);

    view.appendChild(task);

    check.addEventListener('click',()=>{
        content.classList.toggle("completed");
    })

    dlt_btn.addEventListener('click',()=>{
        task.remove();
    })

    input.value="";

}
btn.addEventListener('click',addTask);
