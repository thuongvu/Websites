angular.module('app.controllers', [])
	.controller('mainCtrl', ['$scope', 'socket', 'd3', function ($scope, socket, d3) {
		
		$scope.data = [];

		socket.on('strokesToDraw', function (data) {
		  // console.log(data.data.strokes)
		  var drawTheseStrokes = data.data.strokes;

		  function drawNewObj (obj) {
		      svg.append("circle")
		      .attr("cx", obj.cx)
		      .attr("cy", obj.cy)
		      .attr("r", obj.r)
		      .attr("stroke-width", 1)
		      .attr("fill", obj.fill)
		      .attr("opacity", obj.opacity)
		  }
		
		  drawTheseStrokes.forEach(function (obj) {
		    drawNewObj(obj);
		  })

		});


		$scope.mouseDown = function() {
			  svg.on('mousemove', function () {
			    var coordinates = d3.mouse(this);

			  var drawStrokeObj = svg.append("circle")
			        .attr("cx", coordinates[0])
			        .attr("cy", coordinates[1])
			        .attr("r", size)
			        .attr("stroke-width", 1)
			        .attr("fill", "blue")
			        .attr("opacity", opacity)

			    var obj = {
			      cx: parseInt(drawStrokeObj[0][0].attributes.cx.value),
			      cy: parseInt(drawStrokeObj[0][0].attributes.cy.value),
			      r: drawStrokeObj[0][0].attributes.r.value,
			      fill: drawStrokeObj[0][0].attributes.fill.value,
			      opacity: drawStrokeObj[0][0].attributes.opacity.value
			    }
			    strokesContainer.push(obj)
			    console.log(strokesContainer)
			  })
		}
	}])