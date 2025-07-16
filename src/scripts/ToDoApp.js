import {Dom} from './Dom.js';
import {Storage} from './Storage';
import {ToDoItem} from './ToDoItem';
import {Form} from './Form';
import {DragDrop} from './DragDrop';

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
        this.toDoAddBtn = this.dom.query('[data-todo-add-btn]');
        this.toDoRemoveBtn = this.dom.query('[data-todo-remove-btn]');
        this.addFormToDo = new Form('[data-form-todo]', 'form')

        this.render(this.toDoList);
        new DragDrop(['[data-todo-item]', '[data-todo-container]', '[data-container]'], this.handleDrop.bind(this));

        this.bindEvents();
    }

    createTodoItemLayout(todo) {
        const todoElement = this.dom.importNode(this.toDoTemplate);

        const todoItem = this.dom.queryElement(todoElement, '[data-todo-item]');
        todoItem.id = todo.id;

        const todoElementTitle = this.dom.queryElement(todoElement, '[data-todo-title]');
        todoElementTitle.textContent = todo.text;

        const todoElementLevel = this.dom.queryElement(todoElement, '[data-todo-level]');
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

        const todoElementParticipant = this.dom.queryElement(todoElement, '[data-todo-participant]');
        todoElementParticipant.textContent = todo.participant;

        const todoElementData = this.dom.queryElement(todoElement, '[data-todo-data]');
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

    clearContainers(){
        const containers = this.dom.queryAll('[data-todo-container]');
        containers.forEach((container) => {
            let allElements = this.dom.queryElementAll(container, '[data-todo-item');
            allElements.forEach((element) => {element.remove();});
        });
    }

    bindEvents() {
        this.toDoAddBtn.addEventListener('click', () => {
            this.addFormToDo.open();
            this.addFormToDo.setOnSubmit((formData) => {
                if (formData) {
                    this.addToDo(formData);
                    this.addFormToDo.setOnSubmit(null);
                }
            })
        });

        this.toDoRemoveBtn.addEventListener('click', () => {
            const isRemove = confirm('Are you sure you want to remove?');
            if (isRemove) {
                this.toDoList = this.toDoList.filter((todo) => todo.container !== 'Closed');
                this.localStorage.set(this.toDoList);
                this.render(this.toDoList);
            }
        })


    }

    addToDo(formData) {
        const [title, level, participant] = formData;
        const newTodoItem = new ToDoItem(title, level, participant, 'ToDo');

        this.toDoList.push(newTodoItem);
        this.localStorage.set(this.toDoList);
        this.render(this.toDoList);
    }

    handleDrop(ev) {
        const {item, container} = ev;
        const index = this.toDoList.findIndex((todo) => todo.id === Number(item));
        if (index !== -1) {
            const item = this.toDoList[index];
            this.toDoList.splice(index, 1);

            item.container = container;
            this.toDoList.push(item);

            this.localStorage.set(this.toDoList);
            this.render(this.toDoList);
        }

    }

    render(todoList) {
        this.clearContainers();

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