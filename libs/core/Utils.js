// Class Utils work for all method need process signer

Utils = {
	
	//dispath event to all, if every object listener event, it do work.
	generateEvents: function(){
		even = arguments[0];
		//if even is "RequestRouter" then request portlet with config from arguments
		if(even=="RequestRouter"){
			//Save Location old for history
			window.history.pushState(null, null, window.location.href);
			arguments[1].gotoPortlet(arguments[2],arguments[3]);
		}
		else CustomEvents.fire("UtilsEvents", {name: even, data: arguments[1]});
	}
}