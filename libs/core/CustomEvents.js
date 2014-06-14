//Copyright (c) 2010 Nicholas C. Zakas. All rights reserved.
//MIT License
//Change and Develop by Buminta for WindJS Framework

function EventTarget(){
    this._listeners = {};
}

EventTarget.prototype = {
	// transID for any object register event listener
	transID: 0,
    constructor: EventTarget,
    addListener: function(type, listener){
    	this.transID++;
        if (typeof this._listeners[type] == "undefined"){
           this._listeners[type] = [];
        }
        this._listeners[type].push({listener: listener, transID: this.transID});
        return this.transID;
    },
	// dispatch event for type to any object listen it
    fire: function(event,config){
        if (typeof event == "string"){
            event = { type: event, config: config};
        }
        if (!event.target){
            event.target = this;
        }

        if (!event.type){  //falsy
            throw new Error("Event object missing 'type' property.");
        }

        if (this._listeners[event.type] instanceof Array){
            var listeners = this._listeners[event.type];
            for (var i=0;i < listeners.length; i++){
                listeners[i].listener.call(this, event);
            }
        }
    },
	
	// to remove event listener with type for all objects, or with transID for an object
    removeListener: function(type, transID){
        if (this._listeners[type] instanceof Array){
            if(transID){
            	var listeners = this._listeners[type];
	            for (var i=0, len=listeners.length; i < len; i++){
	                if (listeners[i].transID == transID){
	                    listeners.splice(i, 1);
	                    break;
	                }
	            }
            }
            else{
            	this._listeners[type] = [];
            }
        }
    }
};

CustomEvents = new EventTarget(); 