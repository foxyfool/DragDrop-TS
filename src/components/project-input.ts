
import cmp from "./base-component.js";
import * as Validation from "../utility/validation.js";
import { autoBind } from "../decorators/autobind.js";
import { projectstate } from "../state/project-state.js";

    //project input class 
export class ProjectInput extends cmp<HTMLDivElement,HTMLFormElement>{
    titleInputElement:HTMLInputElement;
    descriptionInputElement:HTMLInputElement;
    peopleInputElement:HTMLInputElement;
    constructor(){
        super('project-input','app',true,'user-input');
                        //form element
                        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
                        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
                        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;
        this.configure();

    }
        // event listener
        configure(){
            this.element.addEventListener('submit',this.submitHandler); // this reffers to submithandler this can also use a decorator 
        }
        renderContent() {}
    // tuple with 3 elements string,string,number
    // returning nothing will be equal to void
    private gatherUserInput():[string,string,number] | void {
        const enteredTitle = this.titleInputElement.value;
        const  enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
        const titleValidatable : Validation.Validatable = {
            value:enteredTitle,
            required:true
        }
        const descriptonValidatable : Validation.Validatable = {
            value:enteredDescription,
            required:true,
            minLength: 5
        }
        const peopleValidatable : Validation.Validatable = {
            value:+enteredPeople,
            required:true,
            min: 1
        }
        // enteredTitle.trim().length === 0||
        // enteredDescription.trim().length === 0||
        // enteredPeople.trim().length === 0
        if(
            !Validation.validate(titleValidatable) ||
            !Validation.validate(descriptonValidatable) ||
            !Validation.validate(peopleValidatable)

        ){
            alert("Invalid Input");
            return;
        }else{
            //+ converts into a number 
            return[enteredTitle,enteredDescription,+enteredPeople]
        }
    }
    // empty inputs 
    private clearInputs (){
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';

    }
    // bind listener
    @autoBind
    private submitHandler(event:Event){
        event.preventDefault();
        const userInput = this.gatherUserInput()
        // tuples are just arrays 
        if(Array.isArray(userInput) ){
            // destructuring here 
            const [title,desc,people] = userInput;
            projectstate.addProject(title,desc,people);
            this.clearInputs();
        }
    }
}
