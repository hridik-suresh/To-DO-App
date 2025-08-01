document.addEventListener("DOMContentLoaded",() =>{
    const taskInput = document.querySelector('#task-input');
    const addTaskBtn = document.querySelector('#add-task-btn');
    const taskList = document.querySelector('#task-list');
    const emptyImg = document.querySelector('.empty-img');
    const todocontainer = document.querySelector('.todo-container');
    const progressBar = document.querySelector('#progress');
    const progressNuumber = document.querySelector('#numbers');

    const updateProgress = () => {
        const totalTasks = taskList.children.length;
        const completedTasks = taskList.querySelectorAll('input.checkbox:checked').length;
        const percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
        progressBar.style.width = `${percentage}%`;
        progressNuumber.textContent = `${completedTasks}/${totalTasks}`;

        if(totalTasks>0 && completedTasks === totalTasks){
            Confetti();
        }
    };
    
    //text for test
    const addTask = (evt, text, completed=false) =>  {  

        evt.preventDefault();

        const taskText = text || taskInput.value.trim();
        if (!taskText){
            return;
        };

        const li = document.createElement('li');
        li.innerHTML= `
        <input type='checkbox' class="checkbox" ${completed ? 'checked':''} >
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

        //For test-----
        if(completed){ 
            li.classList.add('completed');
            editBtn.disabled = true;
            editBtn.style.opacity = "0.5";
            editBtn.style.pointerEvents = "none";
        }

        checkbox.addEventListener('change', ()=>{
            const isChecked = checkbox.checked  //return true or false
            li.classList.toggle('completed', isChecked);
            editBtn.disabled = isChecked;
            editBtn.style.opacity = isChecked ? '0.5':'1';
            editBtn.style.pointerEvents = isChecked ? 'none':'auto';

            updateProgress();
        })

        editBtn.addEventListener("click", () =>{
            if(!checkbox.checked){
                taskInput.value = li.querySelector("span").innerText;
                li.remove();
                toggleEmptyState();
                updateProgress();
            };
        })


        li.querySelector(".delete-btn").addEventListener('click', ()=>{
            li.remove();
            toggleEmptyState();
            updateProgress();
        });

        taskList.appendChild(li);
        taskInput.value = '';

        toggleEmptyState()
        updateProgress();
    }

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) =>{
        if(e.key == 'Enter'){
            addTask(e);
        }
    });

    function toggleEmptyState(){
        emptyImg.style.display = taskList.children.length === 0 ? "block" : "none";

        todocontainer.style.width = taskList.children.length > 0 ? "100%" : "50%";

    }

    function Confetti(){
        const defaults = {
  spread: 360,
  ticks: 50,
  gravity: 0,
  decay: 0.94,
  startVelocity: 30,
  shapes: ["star"],
  colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
};

function shoot() {
  confetti({
    ...defaults,
    particleCount: 40,
    scalar: 1.2,
    shapes: ["star"],
  });

  confetti({
    ...defaults,
    particleCount: 10,
    scalar: 0.75,
    shapes: ["circle"],
  });
}

setTimeout(shoot, 0);
setTimeout(shoot, 100);
setTimeout(shoot, 200);
    }

})