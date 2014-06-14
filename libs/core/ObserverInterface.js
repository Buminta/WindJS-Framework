ObserverInterface = Class.extend({
	registerObserver: function(){
		var _self = this;
		this.eventsID = CustomEvents.addListener("UtilsEvents", function(e){
			_self.toAction(e);
		});
	},
	toAction: function(e){
		var _self = this;
		if(typeof(_self['on'+e.config.name])!=undefined&&typeof(_self['on'+e.config.name])=='function')
		{
			_self['on'+e.config.name](e.config.data);
		}
	},
	unregisterObserver: function(e){
		console.log(e);
		CustomEvents.removeListener("UtilsEvents", this.eventsID);
	}
})