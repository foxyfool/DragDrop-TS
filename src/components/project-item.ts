import {Draggable} from '../models/drag-drop.js'
import { Project } from '../models/project.js';
import cmp from './base-component.js';
import { autoBind } from '../decorators/autobind.js';


    // project Item Class - for rendering single project item !
export class ProjectItem extends cmp<HTMLUListElement,HTMLLIElement> implements Draggable{
    private project:Project;
    get persons(){
        if(this.project.people === 1){
            return '1 Person'
        }else{
            return `${this.project.people} Persons`;
        }
    }
    constructor(hostId:string,project:Project){
        // false = wheather the item is to be rendered at start
        super('single-project',hostId,false,project.id);
        this.project = project;

        this.configure();
        this.renderContent();
    }
    @autoBind
    dragStartHandler(event: DragEvent) {
        event.dataTransfer!.setData('text/plain',this.project.id)
        event.dataTransfer!.effectAllowed = 'move';
    }
    
    dragEndHandler(_: DragEvent) {
        console.log('DragEnd');
    }
    configure(){
        this.element.addEventListener('dragstart',this.dragStartHandler);
        this.element.addEventListener('dragend',this.dragEndHandler)
    }

    renderContent(){
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.persons + ' Assigned';
        this.element.querySelector('p')!.textContent = this.project.description;
    }
}
