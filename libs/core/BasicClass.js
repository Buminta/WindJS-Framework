//Basic class for all Class need method basic like event, init, render layout,...

BasicClass = Class.extend({
	_listeners: [],
	init: function(config){
		this.config = config;
	},
	//add Events and listen dispatch from this.
	addEventListener: function(type, listener){
		this._listeners[type] = listener;
	},
	//remove Events.
	removeEventListener: function(type){
		this._listeners[type] = undefined;
	},
	//dispatch Events to any from this when it listen event type
	dispatchEvent: function(type, config){
		if(this._listeners[type])
			this._listeners[type](config);
	}
})

PopupPrompt = Class.extend({
    init : function(config) {
        this.config = config;
        document.body.innerHTML += config.content || "<div id='prompt'><div class='pop' id='promptPop'></div></div>";
        document.getElementById("prompt").style.display = "none";
        document.getElementById("prompt").className = "hide";
    },
    showPopup : function(config) {
        this._flagShow = true;
        this.config = config;
        document.getElementById("promptPop").innerHTML = config.content ? config.content : document.getElementById("promptPop").innerHTML;
        if (config.effect)
            this.showEffect();
        else
            this.show();
        this.eventListent(config.stopPropagation);
    },
    refresh : function() {
        if (!this._flagLOAD) {
            var dom = document.getElementById("prompt");
            dom.style.width = _SCREENWIDTH + "px";
            dom.style.height = _SCREENHEIGHT + "px";
            var borderTable = document.getElementById("borderTable");
            if (borderTable)
                borderTable.style.maxHeight = (_SCREENHEIGHT - 200) + "px";
            var pop = document.getElementById("promptPop");
            pop.style.marginTop = ((_SCREENHEIGHT - pop.offsetHeight) / 2) + 'px';
        } else {
            var loading = document.getElementById("loadingPrompt");
            loading.style.marginTop = ((_SCREENHEIGHT - loading.offsetHeight) / 2) + 'px';
        }
    },
    show : function() {
        document.getElementById("prompt").className = "show";
        document.getElementById("prompt").style.display = "block";
        return true;
    },
    showEffect : function() {
        document.getElementById("prompt").style.display = "block";
        var t = setTimeout(function() {
            document.getElementById("prompt").className = "show";
            clearTimeout(t);
        }, 1)
    },
    hideEffect : function() {
        document.getElementById("prompt").className = "hide";
        var t = setTimeout(function() {
            document.getElementById("prompt").style.display = "none";
            clearTimeout(t);
        }, 300)
    },
    hide : function() {
        document.getElementById("prompt").style.display = "none";
        document.getElementById("prompt").className = "hide";
    },
    hidePopup : function(effect) {
        this._flagShow = false;
        if (effect)
            this.hideEffect();
        else
            this.hide();
    },
    eventListent : function() {
        this.refresh();
        var _self = this;
        if (document.getElementById("promptPop")) {
            document.getElementById("promptPop").addEventListener("touchend", function(e) {
                if (!_self.config.stopPropagation)
                    e.stopPropagation();
            });
        }
        if (document.getElementById("prompt")) {
            document.getElementById("prompt").addEventListener("touchend", function(e) {
                if (!_self.config.stopPropagation) {
                    e.stopPropagation();
                    if (_self.config.hidePop)
                        _self.hidePopup();
                }
            });
        }
        if (document.getElementById("promtBtn")) {
            document.getElementById("promtBtn").addEventListener("touchend", function(e) {
                e.stopPropagation();
                if (_self.config._callback)
                    _self.config._callback();
            });
        }
    }
});

