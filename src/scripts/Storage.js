
export class Storage {
    #key;

    constructor(key) {
        this.#key = key;
    }

    set(todoList){
        localStorage.setItem(this.#key, JSON.stringify(todoList));
    }

    get(){
        return JSON.parse(localStorage.getItem(this.#key));
    }
}