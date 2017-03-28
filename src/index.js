//console.log("Hello world");
var express = require("express");
var fetch = require("node-fetch");
var cheerio = require("cheerio");
var app = express();

function processText(text){
	var $ = cheerio.load(text);

	var listItems = Array.from($("#tiles").children("li"));
	return listItems.map(function(li){
		return 	{
			title: $(li).find(".title").text()
		};
	});
}

app.get("/hello", function(req,res){
	//res.send("de test");
	fetch("http://dopopoco.ro/meniu-individual-timisoara")
	.then(function(response){
		return response.text();
	}).then(function(text){
		res.send(processText(text));
	});
});

app.listen(3000, function(){
	console.log("Server running on 3000");
})

//