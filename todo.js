document.addEventListener('DOMContentLoaded',()=>{
    const taskinput = document.getElementById('task-input')
    const addtaskbtn = document.getElementById('add-task-btn')
    const tasklist = document.getElementById('task-list')
    const emptyimg = document.querySelector('.empty-image')
    const todocontainer = document.querySelector('.todo-container')
    const progressbar = document.getElementById('progress')
    const progressnum = document.getElementById('numbers')

const img=()=>{
    emptyimg.style.display=tasklist.children.length===0 ? 'block':'none'
    todocontainer.style.width=tasklist.children.length >0 ? '100%' : '50%'
}
const updateprogress = (checkcompletion = true) => {
    const totaltask = tasklist.children.length
    const completedtasks = tasklist.querySelectorAll('.checkbox:checked').length

    progressbar.style.width = totaltask ? `${(completedtasks / totaltask) * 100}%`:'0%'
    progressnum.textContent = `${completedtasks} / ${totaltask}`

    if(checkcompletion && totaltask > 0 && completedtasks === totaltask){
        confetti()
    }
}
const savelocal = () => {
    const tasks = Array.from(tasklist.querySelectorAll('li')).map(li =>({
        text: li.querySelector('span').textContent,completed: li.querySelector('.checkbox').checked
    }))
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
const loadtask = () => {
    const savetask = JSON.parse(localStorage.getItem('tasks')) || []
    savetask.forEach(({
        text, completed
    }) => addtask(text, completed, false))
    img()
}

    const addtask =(text, completed = false) =>{
        const tasktext = text || taskinput.value.trim()
        if(!tasktext){
            return
        }
        const li=document.createElement('li')
        li.innerHTML=` 
        <input type="checkbox" class="checkbox" ${completed ? 'checked': ''}>
        <span>${tasktext}</span>
        <div class="task-btns">
        <button class="edit"><i class="bi bi-pen"></i></button>
        <button class="delete"><i class="bi bi-trash-fill"></i></button>
        </div>
        `
        const checkbox = li.querySelector('.checkbox')
        const editbtn = li.querySelector('.edit')
if(completed){
    li.classList.add('completed');
    editbtn.disabled = true
    editbtn.style.opacity = '0.5'
    editbtn.style.pointerEvents = 'none'
}

checkbox.addEventListener('change', () => {
    const isChecked = checkbox.checked
    li.classList.toggle('completed', isChecked)
    editbtn.disabled = isChecked
    editbtn.style.opacity = isChecked ? '0.5' : '1'
    editbtn.style.pointerEvents = isChecked ? 'none' : 'auto'
    updateprogress()
    savelocal()
})
        editbtn.addEventListener('click',()=> {
            if(!checkbox.checked){
                taskinput.value = li.querySelector('span').textContent
                li.remove()
                updateprogress(false)
                savelocal()
            }
        })
        
        li.querySelector('.delete').addEventListener('click', ()=> {
            li.remove()
            img()
            updateprogress()
            savelocal()
        })

        tasklist.appendChild(li)
        taskinput.value=''
        img()
        updateprogress()
        savelocal()
    }

    addtaskbtn.addEventListener('click',() => addtask())
    addtaskbtn.addEventListener('click', (e) => {
    e.preventDefault()
    addtask()
})
    taskinput.addEventListener('keypress',(e) => {
        if(e.key==='Enter'){
            e.preventDefault()
            addtask()
        }
    })
    loadtask()
})
const launchConfetti = () => {
  const count = 200;
  const defaults = { origin: { y: 0.7 } };

  function fire(particleRatio, opts) {
    window.confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }

  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
};
