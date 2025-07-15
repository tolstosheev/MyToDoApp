
export class DragDrop {
    constructor(selectors, onDropCallback) {
        const [item, containerItem, container] = selectors;
        this.item = item;
        this.container = container;
        this.containerItem = containerItem;
        this.dragged = null

        this.onDropCallback = onDropCallback;

        this.bindEvents();
    }

    bindEvents() {
        document.addEventListener('dragstart', (e) =>{
            if (e.target.matches(this.item)){
                this.dragged = e.target;
            }
        });

        document.addEventListener('dragover', (e) =>{
            if (e.target.matches(this.container) || e.target.matches(this.containerItem)){
                e.preventDefault();
            }
        });

        document.addEventListener('drop', (e) =>{
            if (e.target.matches(this.containerItem) || e.target.matches(this.container)){
                this.dragged.parentNode.removeChild(this.dragged);

                let container = null;

                if (e.target.matches(this.containerItem)){
                    e.target.appendChild(this.dragged);
                    container = e.target.id;
                }
                else{
                    e.target.querySelector(this.containerItem).appendChild(this.dragged);
                    container = e.target.querySelector(this.containerItem).id;
                }

                if (this.onDropCallback){
                    this.onDropCallback({
                        item: this.dragged.id,
                        container: container,
                    });
                }
            }
        })
    }
}