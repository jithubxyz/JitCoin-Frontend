export const titleProp = Symbol("title");
export const showProp = Symbol("show");
const viewProp = Symbol("view");
const toggle = Symbol("toggle");

export class Toggleable extends HTMLElement {
    public static readonly template = (document.createElement("template").innerHTML = `
    <style>
        h2 {
            cursor: pointer;
            padding: 1rem;
            margin-bottom: 0;
            transition: background-cplor ease-out 250ms;
            box-shadow: 0px -6px 12px -7px;
        }

        h2:hover {
            background-color: #eee;
        }
    </style>
    <h2 class="title">Hello</h2>
    <div class="content">
        <slot >
        </slot>
    </div>
    `);
    public static readonly is = "test-component";

    private [viewProp]: {
        title: HTMLElement,
        content: HTMLElement,
    };

    private [titleProp] = "No title provided";
    set title(value: string) {
        this[titleProp] = value;
        this.render();
    }
    get title() {
        return this[titleProp];
    }

    private [showProp] = false;
    set show(value: boolean) {
        this[showProp] = value;
        this.render();
    }
    get show() {
        return this[showProp];
    }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: "open"});
        shadowRoot.innerHTML = Toggleable.template;

        this[viewProp] = {
            title: shadowRoot.querySelector(".title") as HTMLElement,
            // tslint:disable-next-line:object-literal-sort-keys
            content: shadowRoot.querySelector(".content") as HTMLElement,
        };
    }

    private connectedCallback() {
        this.render();
        this.addEventListener("click", this[toggle]);
    }
    private render() {
        this[viewProp].title.textContent = this.title;
        this[viewProp].content.hidden = this.show;
    }
    private disconnectedCallback() {
        this.removeEventListener("click", this[toggle]);
    }

    private [toggle] = (event: Event) => {
        event.preventDefault();
        this.show = !this.show;
    }
}


customElements.define(Toggleable.is, Toggleable);
