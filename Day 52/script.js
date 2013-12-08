
   var windowWidth = $(window).width() - 10;
   var windowHeight = $(window).height() - 10;

	var random = Math.round(Math.random() * 50) + 10;
	var randomRange = d3.range(random);
	// var colorScale = d3.scale.category20();

	var colorScale = d3.scale.linear()
		.domain([d3.min(randomRange),d3.max(randomRange)])
		.interpolate(d3.interpolateHsl)
		.range(["#ff0000",
				 "#00F0CA"])

	var image = d3.select("body")
						.append("svg")
						.attr("width", windowWidth)
						.attr("height", windowHeight)


image.selectAll("rect") // select all rects in image, even if not existing
			.data(randomRange) // calls data on number of items in randomRange
			.enter() // iterates across array, returns placeholder selection for every item
			.append("rect") // inserts rect into dom with these attrs
			.attr({ 
		  		width: random,
		 		height: windowHeight,
		 		y: 0,
		  		x: function(d,i) {
		  		return i * (windowWidth / randomRange.length)
		  		},
		  		fill: function(d,i) {
				return colorScale(i)
				}
			})