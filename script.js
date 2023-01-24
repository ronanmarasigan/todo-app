const newTime = document.querySelector('[data-time]');
const listsContainer = document.querySelector('[data-list]')
const newTaskForm = document.querySelector('[data-task')
const newTaskInput = document.querySelector('[data-input]')
const taskTemplate = document.getElementById('task-template')
const deleteTaskButton = document.querySelector('[delete-task]')
const LOCAL_STORAGE_LIST_KEY = 'task.list'
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListsId'
let tasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY)



listsContainer.addEventListener('click', e => {

    if (e.target.tagName.toLowerCase() === 'input') {
        const selectedTask = tasks.find(task => task.id === e.target.id)
        selectedTask.complete = e.target.checked
        save()
      }

  })

deleteTaskButton.addEventListener('click', e => {
    tasks = tasks.filter(task => !task.complete)
    saveAndRender()
  }) 

newTaskForm.addEventListener('submit', e => {
    e.preventDefault()
    const taskName = newTaskInput.value
    if(taskName == null || taskName === '') return
    const taskslist = createTask(taskName)
    newTaskInput.value = null
    tasks.push(taskslist)
    saveAndRender()
})


function renderTasks(){
    tasks.forEach(task => {
        const listElement = document.importNode(taskTemplate.content, true)
        const checkbox = listElement.querySelector('input')
        checkbox.id = task.id
        checkbox.checked = task.complete
        const label = listElement.querySelector('label')
        label.htmlFor = task.id
        label.append(task.name)
        listsContainer.appendChild(listElement)
    })
}

// function renderTasks(tasks){
//     const taskElement = document.importNode(taskTemplate.content, true)
//     const checkbox = taskElement.querySelector('input')
//     checkbox.id = tasks.id
//     checkbox.checked = tasks.complete
//     const label = taskElement.querySelector('label')
//     label.htmlFor = tasks.id
//     label.append(tasks.name)
//     taskContainer.appendChild(taskElement)

// }


function saveAndRender(){
    save()
    render()
}

function save() {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(tasks))
}

function createTask(name) {
    return { id: Date.now().toString(), name: name, complete: false }
  }

function newDate() {
    let date = new Date().toLocaleString();
    newTime.innerText = date
}

function clearElement(element){
    while (element.firstChild){
        element.removeChild(element.firstChild)
    }
}

function render(){
    newDate()
    clearElement(listsContainer)
    renderTasks()

}

render()