function GetEle(){
	this.tag = function (tag){
		return document.getElementsByTagName(tag);
	}
	this.cls = function (cls){
		return document.getElementsByClassName(cls);
	}
	this.id = function (id){
		return document.getElementById(id);
	}
}
var ele = new GetEle();


SetImg.prototype = ele;
function SetImg (){
	this.done = function (){
		setImg();
	}
}
var imgs = new SetImg();
imgs.done();

function setImg(){
	var liBox = imgs.cls("fined_main")[0],
		lis = liBox.getElementsByTagName("li"),
		alla = liBox.getElementsByTagName("a"),
		len = lis.length;
	for(var i = 0; i < len; i++){
		var span = document.createElement("span");
			span.className = "ficon";
			span.style.backgroundImage = "url(image/fined_icon/fIcon"+ (i+1) +".png)";
			lis[i].insertBefore(span, alla[i]);
	
	}
}
