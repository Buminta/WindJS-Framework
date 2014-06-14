var xhReq = new XMLHttpRequest();

xhReq.open("POST", "libs/wind-framework-beta.js", false);
xhReq.send(null);

eval(xhReq.responseText);

xhReq.open("POST", "res/Config.js", false);
xhReq.send(null);

eval(xhReq.responseText);

xhReq.open("POST", "res/Layout.js", false);
xhReq.send(null);

eval(xhReq.responseText);


xhReq.open("POST", "src/MainActivity.js", false);
xhReq.send(null);

eval(xhReq.responseText);