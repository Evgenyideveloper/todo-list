
const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let saveToLocalStorage = function () {
    localStorage.setItem('key', JSON.stringify(todoData));
};

let todoData = [];

const render = function () {

    todoList.innerHTML = '';
    todoCompleted.innerHTML = '';

    todoData.forEach(function (item) {
            const li = document.createElement('li');
            li.classList.add('todo-item');

            li.innerHTML = `
        <span class="text-todo">${item.value}</span>
        <div class="todo-buttons">
            <button class="todo-remove"></button>
            <button class="todo-complete"></button>
        </div>`;

            if (item.completed) {
                todoCompleted.append(li);
            } else {
                todoList.append(li);
            }

            const btnTodoComplete = li.querySelector('.todo-complete');
            btnTodoComplete.addEventListener('click', function () {
                item.completed = !item.completed;
                saveToLocalStorage();
                render();
            });

            const btnRemove = li.querySelector('.todo-remove');
            btnRemove.addEventListener('click', function () {
                let index = todoData.indexOf(item);
                todoData.splice(index, 1);
                saveToLocalStorage();
                render();
            });
    });
};

todoControl.addEventListener('submit', function (event) {
    event.preventDefault();

    const newToDo = {
        value: headerInput.value,
        completed: false,
    };

    if (headerInput.value.trim() !== '') {
        todoData.push(newToDo);
        saveToLocalStorage();
    }

    headerInput.value = '';

    render();
});

if (localStorage.getItem('key')) {
    todoData = JSON.parse(localStorage.getItem('key'));
    render();
}