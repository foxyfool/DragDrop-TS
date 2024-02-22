var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import cmp from "./base-component.js";
import * as Validation from "../utility/validation.js";
import { autoBind } from "../decorators/autobind.js";
import { projectstate } from "../state/project-state.js";
//project input class 
export class ProjectInput extends cmp {
    constructor() {
        super('project-input', 'app', true, 'user-input');
        //form element
        this.titleInputElement = this.element.querySelector('#title');
        this.descriptionInputElement = this.element.querySelector('#description');
        this.peopleInputElement = this.element.querySelector('#people');
        this.configure();
    }
    // event listener
    configure() {
        this.element.addEventListener('submit', this.submitHandler); // this reffers to submithandler this can also use a decorator 
    }
    renderContent() { }
    // tuple with 3 elements string,string,number
    // returning nothing will be equal to void
    gatherUserInput() {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
        const titleValidatable = {
            value: enteredTitle,
            required: true
        };
        const descriptonValidatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };
        const peopleValidatable = {
            value: +enteredPeople,
            required: true,
            min: 1
        };
        // enteredTitle.trim().length === 0||
        // enteredDescription.trim().length === 0||
        // enteredPeople.trim().length === 0
        if (!Validation.validate(titleValidatable) ||
            !Validation.validate(descriptonValidatable) ||
            !Validation.validate(peopleValidatable)) {
            alert("Invalid Input");
            return;
        }
        else {
            //+ converts into a number 
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }
    // empty inputs 
    clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }
    // bind listener
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        // tuples are just arrays 
        if (Array.isArray(userInput)) {
            // destructuring here 
            const [title, desc, people] = userInput;
            projectstate.addProject(title, desc, people);
            this.clearInputs();
        }
    }
}
__decorate([
    autoBind
], ProjectInput.prototype, "submitHandler", null);
//# sourceMappingURL=project-input.js.map