import * as prjstate from "../models/project.js";
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
// class that manages the projects or state of our application - set listeners 
export class ProjectState extends State {
    //singleton class
    constructor() {
        super();
        // array of fx when something chnages 
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addProject(title, description, numOfPeople) {
        const newProject = new prjstate.Project(Math.random().toString(), title, description, numOfPeople, prjstate.ProjectStatus.Active);
        this.projects.push(newProject);
        this.UpdateListeners();
    }
    moveProject(projectId, newStatus) {
        const project = this.projects.find(prj => prj.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.UpdateListeners();
        }
    }
    UpdateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}
export const projectstate = ProjectState.getInstance();
//# sourceMappingURL=project-state.js.map