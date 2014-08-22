module.exports.scraper = function ($) {

	var title = $("#listing_name").map(function() {
		return $(this).text().trim();
	}).get()[0];

	var price = $('#price_amount').map(function() {
		return +$(this).text().trim().replace('$', '');
	}).get()[0];

	var who = $('[href="#host-profile"].link-reset').map(function() {
		return $(this).text().trim();
	}).get()[0];

	var profileLink = $('#host-profile .media-photo').attr('href');

	function extractProperties(section) {

		var theSpace = $('#details .text-muted').filter(function() {
			return $(this).text().trim() === section;
		});

		var theSpaceDetails = theSpace.parent().siblings('.col-9');

		var properties = $('.col-6 > div', theSpaceDetails).map(function() {

			var propertyAndValue = $(this).text().split(':');
			var property = propertyAndValue[0].trim();
			propertyAndValue.shift();
			var value = propertyAndValue.join(':');

			return {
				property: property,
				value: value
			};

		}).get();

		return properties;
	}

	var descriptionDetails = $('#details .text-muted').filter(function() {
		return $(this).text().trim() === 'Description';
	}).parent().siblings('.col-9');

	var description = $('.expandable-content-long', descriptionDetails).text().trim();

	var numberOfReviews = $('#reviews .row-space-4');
	var numberOfStars = $('.star-rating .icon-beach.icon-star', numberOfReviews).length;

	return {
		title: title,
		price: price,
		who: who,
		profileLink: profileLink,
		spaceProperties: extractProperties('The Space'),
		priceProperties: extractProperties('Prices'),
		description: description,
		numberOfReviews: +numberOfReviews.text().trim().split(' ')[0],
		numberOfStars: numberOfStars,
		neighborhood: $('#hover-card .title a').text().trim(),
		address: $('#hover-card .panel-body:last-child').text().trim()
	};
}