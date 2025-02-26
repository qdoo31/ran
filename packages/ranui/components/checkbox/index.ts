import { addClassToElement, removeClassToElement } from 'ranuts';
import { HTMLElementSSR, createCustomError, falseList } from '@/utils/index';
import './index.less'


interface Context {
    checked: boolean;
}

export class Checkbox extends (HTMLElementSSR()!) {
    checkInput: HTMLInputElement;
    checkInner: HTMLSpanElement;
    context: Context;
    static get observedAttributes(): string[] {
        return ['disabled', 'checked'];
    }
    constructor() {
        super();
        this.checkInput = document.createElement('input')
        this.checkInput.setAttribute('class', 'ran-checkbox-input')
        this.checkInput.setAttribute('type', 'checkbox')
        this.checkInner = document.createElement('span')
        this.checkInner.setAttribute('class', 'ran-checkbox-inner')
        this.context = {
            checked: false
        }
    }
    get disabled(): string {
        return this.getAttribute('disabled') || ''
    }
    set disabled(value: string) {
        this.setAttribute('disabled', value);
    }
    get checked(): boolean {
        const checked = this.getAttribute('checked')
        if (falseList.includes(checked)) {
            this.context.checked = false
        }
        return this.context.checked
    }
    set checked(value: string) {
        if (falseList.includes(value)) {
            this.setAttribute('checked', "false");
            this.context.checked = false
        } else {
            this.setAttribute('checked', "true");
            this.context.checked = true
        }
        this.updateChecked()
    }
    updateChecked = (): void => {
        const { checked } = this.context
        if (checked) {
            addClassToElement(this, 'ran-checkbox-checked')
        } else {
            removeClassToElement(this, 'ran-checkbox-checked')
        }
    }
    update = (): void => {
        this.updateChecked()
    }
    onChange = (): void => {
        const { checked } = this.context
        this.context.checked = !checked
        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    checked: this.context.checked
                },
            }),
        );
        this.update()
    }
    connectedCallback(): void {
        this.setAttribute('class', 'ran-checkbox')
        this.appendChild(this.checkInput)
        this.appendChild(this.checkInner)
        this.addEventListener('click', this.onChange)
    }
    disconnectCallback(): void {
        this.removeEventListener('click', this.onChange)
    }
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void {

    }
}

function Custom() {
    if (typeof document !== 'undefined' && !customElements.get('r-checkbox')) {
        customElements.define('r-checkbox', Checkbox);
        return Checkbox;
    } else {
        return createCustomError('document is undefined or r-checkbox is exist');
    }
}

export default Custom();