module.exports.scraper = function ($) {

	return {
		title: $('.main-hed').text().trim()
	}

};