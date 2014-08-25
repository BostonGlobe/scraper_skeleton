# scraper_skeleton

Node scraper boilerplate code. See included **scraper.js** as a starting point.

## Usage

### Input

**stories.txt**
```csv
http://www.bostonglobe.com/business/2014/08/21/arthur-demoulas-profile-personal-touch-that-can-cut-two-ways/IqkmJ1i7A4AFKpLenN8vBM/story.html
http://www.bostonglobe.com/business/2014/08/22/demoulas/MwC4vzWVHhW73nva23dvHO/story.html
```

**scraper.js**
```js
module.exports.scraper = function ($) {

	return {
		title: $('.main-hed').text().trim()
	};

};
```

### Command
```cat stories.txt | node index.js```

### Output
```json
[
  {
    "title": "Arthur T. Demoulas’s personal touch can cut both ways",
    "index": 0
  },
  {
    "title": "Governors express hope that agreement will be reached in Market Basket standoff",
    "index": 1
  }
]
```

### NOTE

If the page is a collection of items, pass in `--flatten`.

## License

MIT © [The Boston Globe](http://github.com/BostonGlobe)
