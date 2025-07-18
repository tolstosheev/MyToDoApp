import {Dom} from './Dom';

export class Dialog {
    constructor(selectors) {
        this.dom = new Dom();

        this.dialogElement = this.dom.query(selectors[0]);
        this.formElement = this.dom.query(selectors[1]);
        this.onSubmitCallBack = null;

        this.bindEvents();
    }

    openDialog() {
        this.dialogElement.showModal();
    }

    setOnSubmit(callback) {
        this.onSubmitCallBack = callback;
    }

    closeDialog() {
        this.dialogElement.close();
    }

    bindEvents() {
        this.formElement.addEventListener('submit', (e) => {
            e.preventDefault();

            const dialogData = new FormData(this.formElement);
            const dialogToDoData = Object.fromEntries(dialogData);
            if (this.onSubmitCallBack) {
                this.onSubmitCallBack = this.onSubmitCallBack({
                    text: dialogToDoData.title,
                    level: dialogToDoData.level,
                    participant: dialogToDoData.participant,
                });
            }
            this.formElement.reset();
            this.closeDialog()
        });
    }
}
