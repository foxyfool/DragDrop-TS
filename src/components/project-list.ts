import { DragTarget } from '../models/drag-drop.js'
import { Project , ProjectStatus} from '../models/project.js';
import cmp from './base-component.js';
import { autoBind } from '../decorators/autobind.js';
import { projectstate } from '../state/project-state.js';
import { ProjectItem } from './project-item.js';

//cmp for default exports


    // project list class
export class ProjectList extends cmp<HTMLDivElement,HTMLElement> implements DragTarget{

    assignedProjects:Project[];

    constructor(private type: 'active' | 'finished'){
        super('project-list','app',false,`${type}-projects`);
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }
    @autoBind
    dragOverHandler(event: DragEvent){
        if(event.dataTransfer && event.dataTransfer.types[0] ==='text/plain'){
            event.preventDefault();
            const listEl = this.element.querySelector('ul')!;
            listEl.classList.add('droppable');
        }
    }
    @autoBind
    dropHandler(event: DragEvent){
        const prjId = event.dataTransfer!.getData('text/plain');
        projectstate.moveProject(prjId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
    }
    @autoBind
    dragLeaveHandler(_: DragEvent) {
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.remove('droppable');
    }

    configure(){
        this.element.addEventListener('dragover',this.dragOverHandler);
        this.element.addEventListener('dragleave',this.dragLeaveHandler);
        this.element.addEventListener('drop',this.dropHandler);
        projectstate.addListener((projects: Project[])=>{
            const relevantProjects = projects.filter(prj=>{
                if(this.type === 'active'){
                    return prj.status === ProjectStatus.Active;
                }
                return prj.status === ProjectStatus.Finished;
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }

    renderContent(){
        const listId = `${this.type}-projects-list`
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }

    private renderProjects(){
        const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        listEl.innerHTML = '';
        for(const prjItem of this.assignedProjects){
            new ProjectItem(this.element.querySelector('ul')!.id, prjItem);
        }
    }
    
}

