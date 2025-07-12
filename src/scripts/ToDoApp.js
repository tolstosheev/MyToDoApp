import {Dom} from './Dom.js';
import {Storage} from './Storage';
import {ToDoItem} from './ToDoItem';
import {Form} from './Form';

export class ToDoApp {

    constructor() {
        this.localStorage = new Storage('todos');
        this.dom = new Dom;
        this.toDoList = this.localStorage.get() || [];
        this.toDoTemplate = this.dom.query('[data-todo-template]');
        this.toDoContainerToDo = this.dom.query('#ToDo');
        this.toDoContainerInProgres = this.dom.query('#InProgress');
        this.toDoContainerFrozen = this.dom.query('#Frozen');
        this.toDoContainerClosed = this.dom.query('#Closed');
        this.toDoAddBtns = this.dom.queryAll('[data-todo-add-btn]');
        this.addFormToDo = new Form('[data-form-todo]', 'form')

        this.render(this.toDoList);
        this.bindEvents();
    }

    createTodoItemLayout(todo) {
        const todoElement = document.importNode(this.toDoTemplate.content, true);

        const todoElementTitle = todoElement.querySelector('[data-todo-title]');
        todoElementTitle.textContent = todo.text;

        const todoElementLevel = todoElement.querySelector('[data-todo-level]');
        todoElementLevel.textContent = todo.level;

        switch (todo.level) {
            case 'Low':
                todoElementLevel.parentElement.style.backgroundColor = '#67cb65';
                break;
            case 'High':
                todoElementLevel.parentElement.style.backgroundColor = '#e74444';
                break;
            case 'Medium':
                todoElementLevel.parentElement.style.backgroundColor = '#ff9533';
        }

        const todoElementParticipant = todoElement.querySelector('[data-todo-participant]');
        todoElementParticipant.textContent = todo.participant;

        const todoElementData = todoElement.querySelector('[data-todo-data]');
        todoElementData.textContent = todo.data;
        return todoElement;
    }

    getInfo(){
        const tasks = this.dom.queryAll('[data-todo-info');

        tasks[0].textContent = this.toDoList.length;
        tasks[1].textContent =  this.toDoList.reduce((acc, el) => {
            if (el.container === 'Closed'){
                acc++;
            }
            return acc;
        }, 0);
        tasks[2].textContent =  this.toDoList.reduce((acc, el) => {
            if (el.container === 'Frozen'){
                acc++;
            }
            return acc;
        }, 0);
    }

    clearContainer(container, selector='[data-todo-item]') {
        let allElements = container.querySelectorAll(selector);
        allElements.forEach((element) => element.remove());
    }

    bindEvents() {
        this.toDoAddBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.addFormToDo.open();
                const container = String(btn.id).slice(0, btn.id.length-3);
                this.addFormToDo.setOnSubmit((formData) => {
                    if (formData) {
                        this.addToDo(formData, container);
                        this.addFormToDo.setOnSubmit(null);
                    }
                })
            })
        })
    }

    addToDo(formData, container) {
        const [title, level, participant] = formData;
        const newTodoItem = new ToDoItem(title, level, participant, container);

        this.toDoList.push(newTodoItem);
        this.localStorage.set(this.toDoList);
        this.render(this.toDoList);
    }

    render(todoList) {
        this.clearContainer(this.toDoContainerToDo);
        this.clearContainer(this.toDoContainerClosed);
        this.clearContainer(this.toDoContainerInProgres);
        this.clearContainer(this.toDoContainerFrozen);
        this.getInfo()
        todoList.forEach(todo => {
            const toDoItem = this.createTodoItemLayout(todo);
            switch (todo.container) {
                case 'ToDo':
                    this.toDoContainerToDo.appendChild(toDoItem);
                    break;
                case 'InProgress':
                    this.toDoContainerInProgres.appendChild(toDoItem);
                    break;
                case 'Frozen':
                    this.toDoContainerFrozen.appendChild(toDoItem);
                    break;
                case 'Closed':
                    this.toDoContainerClosed.appendChild(toDoItem);
                    break;
            }
        });
    }
}