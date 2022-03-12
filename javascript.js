const form = document.querySelector('.form')
const input = document.querySelector('.input')
const todosUL = document.querySelector('.todos')
const smallLeft = document.querySelector('.small_left_click')
const smallRight = document.querySelector('.small_right_click')

const todos = JSON.parse(localStorage.getItem('todos'))

if(todos) {
    todos.forEach(todo=> {
        AddToDo(todo)
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    AddToDo()
})

function AddToDo(todo) {
    let todoText = input.value 

    if(todo) {
        todoText = todo.text
    } 

    

    if(todoText) {
        const todoEl = document.createElement('li')

        if(todo && todo.completed){
            todoEl.classList.add('completed')
        }
            
        todoEl.innerText = todoText

        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed')
            
            UpdateLS()
        })

        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault()
            todoEl.remove()
            if(todosUL.childElementCount === 0) {
                smallLeft.style.display = 'none'
                smallRight.style.display = 'none'
            }
            UpdateLS()
        })

        todosUL.appendChild(todoEl)
        smallLeft.style.display = 'block'
        smallRight.style.display = 'block'
        input.value  = ''

        UpdateLS()
    } 
}

function UpdateLS(){
    const todosEl = document.querySelectorAll('li')

    const todos = []

    todosEl.forEach((todoEl) => {
        todos.push({
            text:todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        })
    })

    localStorage.setItem('todos', JSON.stringify(todos))
}