// BootStrap for startup app, auto render portlet width var for this with hash on location

Bootstrap = Class.extend({
	//Arguments save var from hash string like JSON Object
	arguments: {},
	hashData: window.location.hash,
	init: function(config){
		this.config = config;
		if(this.hashData) this.getHashData();
	},
	//Make Arguments from hashData
	getHashData: function(){
		this.arguments = ExtFunctions.getHashData(this.hashData);
	},
	//Request to Router for render new portlet home or like fixed
	run: function(){
		var page = this.arguments.page?this.arguments.page:"Home";
		Utils.generateEvents("RequestRouter",new Request(page),this.arguments);
	},
});