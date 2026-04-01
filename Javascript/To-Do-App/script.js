const input=document.getElementById("input-text");
const search=document.getElementById("input-button");
const view=document.querySelector(".view");


function getTodos(){
    return JSON.parse(localStorage.getItem("todos")) || [];
}

function saveTodos(todos){
    localStorage.setItem("todos",JSON.stringify(todos));
}

function renderTodos(){
    view.innerHTML="";
    let todos=getTodos();

    todos.forEach((todo,index)=>{
        let task=document.createElement('div');
        task.classList.add("task-items");

        let content=document.createElement('span');
        content.innerText=todo.text.toUpperCase();

        if(todo.completed){
            content.classList.add("completed");
        }

        let btn=document.createElement('button');
        btn.innerText="X";

        let check=document.createElement('input');
        check.type="checkbox";
        check.checked=todo.completed;

        check.addEventListener('click',()=>{
            let todos=getTodos();
            todos[index].completed=!todos[index].completed;
            saveTodos(todos);
            renderTodos();
        })

        btn.addEventListener('click',()=>{
            let todos=getTodos();
            todos.splice(index,1);
            saveTodos(todos);
            renderTodos();
        })

        task.appendChild(content);
        task.appendChild(check);
        task.appendChild(btn);

        view.appendChild(task);

    })


}

function addTask(){
    let inputText=input.value.trim();
    if(!inputText){
        return ;
    }

    let todos=getTodos();
    todos.push({text:inputText,completed:false});
    saveTodos(todos)
    renderTodos();
    input.value="";
}

search.addEventListener('click',addTask);
input.addEventListener('keydown',(e)=>{
    if(e.key=="Enter"){
        addTask();
    }
})

renderTodos();