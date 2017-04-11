var scrapper = require('./scrapper');

var endpoints = [{
	url:"http://dopopoco.ro/meniu-individual-timisoara",
	scrapeFunction:scrapper.dopopocoScrapper
}];


var sqlite3 = require('sqlite3').verbose();
db.serialize(function(){
	db.run("CREATE TABLE IF NOT EXISTS pizza (title TEXT, ingredients TEXT, price TEXT, _price TEXT, imagelink TEXT)");
})


function load(jsonData){
    return db.serialize(function() {
		var stmt = db.prepare("INSERT INTO pizza (title, ingredients, price, _price, imagelink) VALUES (?,?,?,?,?)");

		for (var i = 0; i < jsonData.length; i++) {
			var p = jsonData[i];	  	
			stmt.run(p.title,p.ingrediente,p.pret,p.pret_1,p.img);	
		}
		stmt.finalize();
	});
}


function etl(endpoints){
	Promise.all(scrapper.urlMapper(endpoints)).then(function(results){
		return Promise.all(results.map(load));
	})
}
