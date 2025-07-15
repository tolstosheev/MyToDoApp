
export class Dom {

    constructor() {}

    query(selector) {
        return document.querySelector(selector);
    }

    queryAll(selector) {
        return document.querySelectorAll(selector);
    }

    queryElement(element, selector) {
        return element.querySelector(selector);
    }

    queryElementAll(element, selector) {
        return element.querySelectorAll(selector);
    }

    importNode(selector) {
        return document.importNode(selector.content, true);
    }
}