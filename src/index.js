//console.log("Hello world");
var express = require("express");

var app = express();

app.get("/hello",function(req,res){
	res.send("de test");
});

app.listen(3000,function(){
	console.log("Server running on 3000");
})
