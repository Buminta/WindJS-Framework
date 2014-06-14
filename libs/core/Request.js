Request = Class.extend({
	portlet : "Home",
	init : function(name) {
		this.portlet = name;
		this.page = ApplicationConfig["portlet" + this.portlet];
	},
	//begin create new porlet
	gotoPortlet : function(config) {
		config.page = this.portlet;
		this.makeHash(config);
		try {
			new this.page.portlet(config);
			this.addPlugin();
		} catch(e) {
			throw new Error('Missing Portlet {' + this.portlet + '}');
		}
	},
	
	//Add Plugin with list Plugin register
	addPlugin : function() {
		for (var i = 0; i < this.page.plugins.length; i++) {

		}
	},
	//Make string for Location hash for portlet true
	makeHash: function(config){
		var hashTmp = "";
		for (tag in config) {
			hashTmp += config[tag] != undefined ? tag + "/" + config[tag] + "/" : "";
		}
		window.location.hash = hashTmp;
	}
});
