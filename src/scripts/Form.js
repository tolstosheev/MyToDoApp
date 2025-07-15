import {Dom} from './Dom';

export class Form {
    constructor(selector, selectorClass) {
        this.dom = new Dom();

        this.element = this.dom.query(selector);
        this.selectorClass = selectorClass;

        this.titleInput = this.dom.query('[data-form-title-input]');
        this.participantInput = this.dom.query('[data-form-participant-input]');
        this.levelSelect = this.dom.query('[data-form-level-select]');
        this.addToDoBtn = this.dom.query('[data-form-add-button]');

        this.level = '';
        this.title = '';
        this.participant = '';

        this.onSubmitCallBack = null;
        this.bindEvents();
    }

    open() {
        this.element.classList.remove(this.selectorClass + '--close');
        this.element.classList.add(this.selectorClass);
        this.dom.query('body').style.overflow = 'hidden';
    }

    get() {
        if (this.title !== '' && this.participant !== '' && this.level !== '') {
            return [this.title, this.level, this.participant];
        }
    }

    setOnSubmit(callback) {
        this.onSubmitCallBack = callback;
    }

    bindEvents() {
        this.addToDoBtn.addEventListener('click', () => {
            this.level = this.levelSelect.value;
            this.title = this.titleInput.value.trim();
            this.participant = this.participantInput.value.trim();

            if (this.onSubmitCallBack) {
                this.onSubmitCallBack(this.get());
            }
        });

        this.addToDoBtn.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.level = this.levelSelect.value;
                this.title = this.titleInput.value.trim();
                this.participant = this.participantInput.value.trim();

                if (this.onSubmitCallBack) {
                    this.onSubmitCallBack(this.get());
                }
            }
        })


    }
}