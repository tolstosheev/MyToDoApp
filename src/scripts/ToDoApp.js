import {Dom} from './Dom.js';
import {Storage} from './Storage';
import {ToDoItem} from './ToDoItem';

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
        this.render(this.toDoList);
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

    clearContainer(container, selector='[data-todo-item]') {
        let allElements = container.querySelectorAll(selector);
        allElements.forEach((element) => element.remove());
    }

    render(todoList) {
        this.clearContainer(this.toDoContainerToDo);
        this.clearContainer(this.toDoContainerClosed);
        this.clearContainer(this.toDoContainerInProgres);
        this.clearContainer(this.toDoContainerFrozen);

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