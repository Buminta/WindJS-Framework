try{
var xhReq = new XMLHttpRequest();

xhReq.open("POST", "libs/engines/kineticjs.js", false);
xhReq.send(null);

eval(xhReq.responseText);
}
catch(e){
	console.log(e);
}
xhReq.open("POST", "libs/core/Class.js", false);
xhReq.send(null);

eval(xhReq.responseText);

xhReq.open("POST", "libs/core/CustomEvents.js", false);
xhReq.send(null);

eval(xhReq.responseText);

xhReq.open("POST", "libs/core/Request.js", false);
xhReq.send(null);

eval(xhReq.responseText);

xhReq.open("POST", "libs/core/Bootstrap.js", false);
xhReq.send(null);

eval(xhReq.responseText);

xhReq.open("POST", "libs/core/ExtFunctions.js", false);
xhReq.send(null);

eval(xhReq.responseText);

xhReq.open("POST", "libs/core/Utils.js", false);
xhReq.send(null);

eval(xhReq.responseText);

xhReq.open("POST", "libs/core/ObserverInterface.js", false);
xhReq.send(null);

eval(xhReq.responseText);

xhReq.open("POST", "libs/core/BasicClass.js", false);
xhReq.send(null);

eval(xhReq.responseText);
HomePortlet = BasicClass.extend({
	init: function(config){
		this._super(config);
		//console.log(config);
		Utils.generateEvents("RequestRouter",new Request("Second"),{id:1,count:2,round:0});
	}
});
SecondPortlet = BasicClass.extend({
	init: function(config){
		console.log(config);
	}
})
function init(){
	_CACHEHASH = window.location.hash;
	window.onpopstate = function(){
		if(_CACHEHASH!=window.location.hash){
			var arguments = ExtFunctions.getHashData(window.location.hash);
			Utils.generateEvents("RequestRouter",new Request(arguments.page||"Home"),arguments);
		}
		_CACHEHASH = window.location.hash;
	}
	var boot = new Bootstrap();
	boot.run();
}
