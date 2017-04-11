var fetch = require("node-fetch");
var cheerio = require("cheerio");


function scrapper(url, fn){
	return{
		scrape: function() {
			return fetch(url).then(function(response){
				return response.text();
			}).then(fn);
		}
	};
}


function dopopocoScrapper(text){
	var $ = cheerio.load(text);
	var listItems = Array.from($("#tiles").children("li"));
	
	return listItems.map(function(li){
		var prices = $(li).find(".pret").find(".pretVal");
		return 	{
			title: $(li).find(".title").text().trim(),
			ingredients: $(li).find(".ingrediente").text().trim(),
			price:$(prices[0]).text(),
		 	_price:$(prices[1]).text(),
		    iamgelink: "http://dopopoco.ro"+$(li).find("img").attr("src")
		};
	});
}


function urlMapper(endpoint){
	return endpoints.map(function(endpoint){
		return scrapper(endpoint.url, endpoint.scrapeFunction).scrape();
	});
}


module.exports = {
	urlMapper : urlMapper,
	dopopocoScrapper: dopopocoScrapper
}