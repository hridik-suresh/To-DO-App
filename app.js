document.addEventListener("DOMContentLoaded",() =>{
    const taskInput = document.querySelector('#task-input');
    const addTaskBtn = document.querySelector('#add-task-btn');
    const taskList = document.querySelector('#task-list');
    const emptyImg = document.querySelector('.empty-img');
    const todocontainer = document.querySelector('.todo-container');

    
    const addTask = (evt) =>  {
        evt.preventDefault();

        const taskText = taskInput.value.trim();
        if (!taskText){
            return;
        };

        const li = document.createElement('li');
        li.innerHTML= `
        <input type='checkbox' class="checkbox">
        <span>${taskText}</span>
        <div class="task-buttons">
            <button class="edit-btn">
                <i class="fa-solid fa-pen"></i>
            </button>
            <button class="delete-btn">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
        `

        const editBtn = li.querySelector('.edit-btn');
        const checkbox = li.querySelector('.checkbox');
        editBtn.addEventListener("click", () =>{
            if(!checkbox.checked){
                taskInput.value = li.querySelector("span").innerText;
                li.remove();
                toggleEmptyState();
            };
        })


        li.querySelector(".delete-btn").addEventListener('click', ()=>{
            li.remove();
            toggleEmptyState();
        });

        taskList.appendChild(li);
        taskInput.value = '';

        toggleEmptyState()
    }



    addTaskBtn.addEventListener("click", addTask);

    taskInput.addEventListener("keypress", (e) =>{
        if(e.key === "enter"){
            addTask(e);
        }
    })

    function toggleEmptyState(){
        emptyImg.style.display = taskList.children.length === 0 ? "block" : "none";

        todocontainer.style.width = taskList.children.length > 0 ? "100%" : "50%";

    }

})