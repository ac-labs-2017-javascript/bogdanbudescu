//console.log("Hello world");
var express = require("express");
var fetch = require("node-fetch");
var cheerio = require("cheerio");
var app = express();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

function processText(text){
	var $ = cheerio.load(text);
	var listItems = Array.from($("#tiles").children("li"));
	
	return listItems.map(function(li){
	   
		var prices = $(li).find(".pret").find(".pretVal");
		return 	{
			title: $(li).find(".title").text().trim(),
			ingrediente: $(li).find(".ingrediente").text().trim(),
			pret:$(prices[0]).text(),
		 	pret_1:$(prices[1]).text(),
		    img: "http://dopopoco.ro"+$(li).find("img").attr("src")
		};
	});
}

function storeData(val){

console.log(val.length)
  db.serialize(function() {
 
db.close();
}

app.get("/hello", function(req,res){
	//res.send("de testte");
	fetch("http://dopopoco.ro/meniu-individual-timisoara")
	.then(function(response){
		return response.text();
	}).then(function(text){
		res.send(processText(text));
		storeData(processText(text));
	});
});

app.listen(3000, function(){
	console.log("Server running on 3000");
})

//