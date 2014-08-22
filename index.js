var request = require('request');
var cheerio = require('cheerio');
var fs      = require('fs');
var scraper = require('./scraper.js');

var urls = fs.readFileSync('/dev/stdin').toString().split('\r\n');

function scrape(index) {

	// get the next url
	var url = urls[index];

	request(url, function(error, response, body) {

		if (!error && response.statusCode == 200) {
			$ = cheerio.load(body);

			var datum = scraper.scraper($);
			datum.index = index;

			// print out results
			console.log(JSON.stringify(datum, null, 4));

		}

		// advance pointer to next position
		index++;

		// have we scraped all urls?
		if (index >= urls.length) {

			// exit process
			console.log(']');
			process.exit(0);

		} else {

			console.log(',');

			// continue scraping
			scrape(index);
		}

	});

}

// start scraping
console.log('[');
scrape(0);