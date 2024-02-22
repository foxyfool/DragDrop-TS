
import * as prjstate from "../models/project.js";

    type Listener<T> = (items:T[]) => void;

    class State<T>{
        protected listeners: Listener<T>[] = [];
        addListener(listenerFn:Listener<T>){
            this.listeners.push(listenerFn);
        }
    }
    
    // class that manages the projects or state of our application - set listeners 
    export class ProjectState extends State<prjstate.Project>{
        // array of fx when something chnages 
        private projects: prjstate.Project[] = [];
        private static instance : ProjectState
    
        //singleton class
        private constructor(){
            super();
        }
    
        static getInstance(){
            if(this.instance){
                return this.instance;
            }
            this.instance = new ProjectState();
            return this.instance;
        }
        addProject(title:string,description:string,numOfPeople:number){
            const newProject = new prjstate.Project(Math.random().toString(),title,description,numOfPeople,prjstate.ProjectStatus.Active);
            this.projects.push(newProject);
            this.UpdateListeners();
        }
    
        moveProject(projectId:string,newStatus:prjstate.ProjectStatus){
           const project =  this.projects.find(prj=>prj.id=== projectId);
           if(project && project.status !== newStatus){
            project.status = newStatus;
            this.UpdateListeners();
           }
        }
    
        private UpdateListeners(){
            for(const listenerFn of this.listeners){
                listenerFn(this.projects.slice());
            }
        }
    }
    export const projectstate = ProjectState.getInstance();


