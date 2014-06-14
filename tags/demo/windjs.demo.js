function() {
    var initializing = false, fnTest = /xyz/.test(function() { xyz;
    }) ? /\b_super\b/ : /.*/;
    this.Class = function() {
    };
    Class.extend = function(prop) {
        if ( typeof updateTracker != 'undefined')
            updateTracker(1);
        var _super = this.prototype;
        initializing = true;
        var prototype = new this();
        initializing = false;
        prototype.currentClass = this;
        prototype.ancestors = Array();
        if (this.prototype.ancestors) {
            for (var i in this.prototype.ancestors) {
                prototype.ancestors.push(this.prototype.ancestors[i]);
            }
        }
        prototype.ancestors.push(this);
        for (var name in prop) {
            prototype[name] = typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test(prop[name]) ? (function(name, fn) {
                return function() {
                    var tmp = this._super;
                    this._super = _super[name];
                    var ret = fn.apply(this, arguments);
                    this._super = tmp;
                    return ret;
                };
            })(name, prop[name]) : prop[name];
        }
        Class.implement = function() {
            for (var i = 0; i < arguments.length; i++) {
                var interf = arguments[i];
                if (interf.constructor === Object) {
                    for (prop in interf) {
                        if (interf[prop].constructor === Function) {
                            if (!this.prototype[prop] || this.prototype[prop].constructor !== Function) {
                                throw new Error('Method [' + prop + '] missing from class definition.');
                            }
                        } else {
                            if (this.prototype[prop] === undefined) {
                                throw new Error('Field [' + prop + '] missing from class definition.');
                            }
                        }
                    }
                }
            }
            return this;
        };
        function Class() {
            if (!initializing && this.init) {
                this.init.apply(this, arguments);
                if ( typeof updateTracker != 'undefined')
                    updateTracker(this.tracker || 5, true);
            }
        }


        Class.prototype = prototype;
        Class.constructor = Class;
        Class.extend = arguments.callee;
        return Class;
    };
})();
ObjectBasic = Class.extend({
    init : function(config) {
        this.config = config;
    },
    eventListener : function() {
        this.name = this.name ? this.name : "defaultObject";
        var _self = this;
        if (_self.ontouchmove)
            this.dom.addEventListener('touchmove', _self.ontouchmove);
        if (_self.ontouchstart)
            this.dom.addEventListener('touchstart', _self.ontouchstart);
        if (_self.ontouchend)
            this.dom.addEventListener('touchend', _self.ontouchend);
        CustomEvent.addListener("UtilsEvents", function(e) {
            if ( typeof (_self['on' + e.config.name]) != undefined && typeof (_self['on' + e.config.name]) == 'function')
                _self['on'+e.config.name](e.config.data);
        }, _self.name);
    },
    unregisterEvent : function() {
        CustomEvent.removeListener("UtilsEvents", this.name);
    }
});

Sketch = ObjectBasic.extend({
    init : function(config) {
        this.config = config;
        this.dom = null;
        this._flagMove = false;
        this.id = config.id;
        var cache = document.getElementById(config.id);
        if (cache)
            cache.parentElement.removeChild(cache);
        ;
        this.ontouchmove = config.ontouchmove || false;
        this.ontouchend = config.ontouchend || false;
        this.ontouchstart = config.ontouchstart || false;
        this.content = config.content;
        if (config.span)
            this.serverResponse = "<span id='" + this.id + "' class='" + config.extclasses + "'>" + this.content + "</span>";
        else
            this.serverResponse = "<div id='" + this.id + "' class='" + config.extclasses + "'>" + this.content + "</div>";
    },
    addChild : function(Obj) {
        this.getDom();
        this.dom.innerHTML += Obj.serverResponse;
        Obj.getDom();
    },
    removeChild : function(Obj) {
        this.dom.removeChild(Obj.dom);
    },
    getDom : function() {
        this.dom = document.getElementById(this.id);
    },
    appendTo : function(dom) {
        dom.innerHTML += this.serverResponse;
        this.getDom();
    },
    dependTo : function(dom) {
        dom.innerHTML = this.serverResponse + dom.innerHTML;
        this.getDom();
    },
    onEnd : function() {
        this.unregisterEvent();
    }
}).implement();

ExtPlugin = Sketch.extend({
    init : function(config) {
        this._super(config);
        if (config.layout)
            this.render(config.layout);
        else
            this.serverResponse = config.contentLayout;
    },
    render : function(layout) {
        var _self = this;
        var url = "app/layouts/" + layout + ".htm";
        var xhReq = new XMLHttpRequest();
        xhReq.open("GET", url, false);
        xhReq.send(null);
        this.serverResponse = xhReq.responseText;
    }
}).implement();
Stage = ObjectBasic.extend({
    init : function(config) {
        this._super(config);
        this.main = document.getElementById('main');
        this.h = _SCREENHEIGHT;
        this.w = _SCREENWIDTH;
    },
    run : function(config) {
        this.config = config;
    },
    render : function(layout) {
        var _self = this;
        var url = "app/layouts/" + layout + ".htm";
        var xhReq = new XMLHttpRequest();
        xhReq.open("POST", url, false);
        xhReq.send(null);
        this.serverResponse = xhReq.responseText;
        this.main.innerHTML = this.serverResponse;
        this.dom = document.getElementById('portlet-stage');
    },
    addChild : function(Obj) {
        this.dom.innerHTML += Obj.serverResponse;
        Obj.dom = document.getElementById(Obj.id);
    },
    removeChild : function(Obj) {
        this.dom.removeChild(Obj.dom);
    },
    onEnd : function() {
        this.unregisterEvent();
    }
}).implement();

Utils = {
    generateEvent : function(name, config) {
        CustomEvent.fire("UtilsEvents", {
            name : name,
            data : config
        });
    },
    RequestRouter : function(stage, refresh) {
        this.generateEvent("End");
        var t = setTimeout(function() {
            stage.run(stage.config);
            var main = document.getElementById("main");
            main.style.display = "none";
            main.offsetHieght
            main.style.display = "block";
            clearTimeout(t);
        }, 200);
    },
    StartApp : function(stage) {
        this.RequestRouter(stage);
    }
}
function EventTarget() {
    this._listeners = {};
}

EventTarget.prototype = {
    constructor : EventTarget,
    addListener : function(type, listener, name) {
        if ( typeof this._listeners[type] == "undefined") {
            this._listeners[type] = [];
        }
        this._listeners[type].push({
            listener : listener,
            name : name
        });
    },
    fire : function(event, config) {
        if ( typeof event == "string") {
            event = {
                type : event,
                config : config
            };
        }
        if (!event.target) {
            event.target = this;
        }
        if (!event.type) {
            throw new Error("Event object missing 'type' property.");
        }
        if (this._listeners[event.type] instanceof Array) {
            var listeners = this._listeners[event.type];
            for (var i = 0; i < listeners.length; i++) {
                listeners[i].listener.call(this, event);
            }
        }
    },
    removeListener : function(type, name) {
        if (this._listeners[type] instanceof Array) {
            if (name) {
                var listeners = this._listeners[type];
                for (var i = 0, len = listeners.length; i < len; i++) {
                    if (listeners[i].name == name) {
                        listeners.splice(i, 1);
                        break;
                    }
                }
            } else {
                this._listeners[type] = [];
            }
        }
    }
};