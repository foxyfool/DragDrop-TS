// Drag and drop interfaces 
    export interface Draggable{
        //2 event listeners and handlers
        dragStartHandler(event: DragEvent) : void;
        dragEndHandler(event: DragEvent) : void;
    }
    
    
    export interface DragTarget{
        // the thing you are dragging something over is a valid target 
        dragOverHandler(event: DragEvent) : void;
        // actual drop and update the data
        dropHandler(event: DragEvent) : void;
        //when drop happens do something 
        dragLeaveHandler(event: DragEvent) : void;
    }

