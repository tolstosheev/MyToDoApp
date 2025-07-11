
export class ToDoItem {

    constructor(text, level, participant, container) {
        this.text = text;
        this.level = level;
        this.participant = participant;
        this.data = this.formatedDate(new Date());
        this.container = container;
    }

    formatedDate(data){
        return data.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).replace(/\./g, '/');
    }
}