var request = require('request');
var cheerio = require('cheerio');
var fs      = require('fs');
var scraper = require('./scraper.js');
var _       = require('lodash');
var argv    = require('yargs').argv;

var urls = fs.readFileSync('/dev/stdin').toString().split('\n');

function scrape(index) {

	// get the next url
	var url = urls[index];

	request(url, function(error, response, body) {

		if (!error && response.statusCode == 200) {
			$ = cheerio.load(body);

			var datum = scraper.scraper($);
			datum.index = index;

			if (argv.flatten) {

				// print out results
				_.each(datum, function(value, index, array) {
					console.log(JSON.stringify(value, null, 4));

					if (index < (array.length - 1)) {
						console.log(',');
					}
				});

			} else {
				console.log(JSON.stringify(_.flatten(datum), null, 4));
			}

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