ExtFunctions = {
	//Make Arguments from hashData
	getHashData: function(hashData){
		var arguments = {};
		var stringHash = hashData.replace(/#/g,"")
		var hashDataArr = stringHash.split("/");
		for(var i = 0; i < hashDataArr.length; i+=2){
			if(hashDataArr[i+1]) arguments[hashDataArr[i].toLowerCase()] = hashDataArr[i+1];
		}
		return arguments;
	},
}
