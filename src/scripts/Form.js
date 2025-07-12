
export class Form {
    constructor(selector, selectorClass) {
        this.element = document.querySelector(selector);
        this.selectorClass = selectorClass;
        this.titleInput = document.querySelector('[data-form-title-input]');
        this.participantInput = document.querySelector('[data-form-participant-input]');
        this.levelSelect = document.querySelector('[data-form-level-select]');
        this.addBtn = document.querySelector('[data-form-add-button]');
        this.level = '';
        this.title = '';
        this.participant = '';

        this.onSubmitCallBack = null;
        this.bindEvents();
    }

    open() {
        this.element.classList.remove(this.selectorClass + '--close');
        this.element.classList.add(this.selectorClass);
        document.querySelector('body').style.overflow = 'hidden';
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
        this.addBtn.addEventListener('click', () => {
            this.level = this.levelSelect.value;
            this.title = this.titleInput.value.trim();
            this.participant = this.participantInput.value.trim();

            if (this.onSubmitCallBack) {
                this.onSubmitCallBack(this.get());
            }
        })
    }

}