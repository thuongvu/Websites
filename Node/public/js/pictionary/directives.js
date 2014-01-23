angular.module('app.directives', [])
	.directive('draw', function (socket, d3) {
		return {
			restrict: 'EA',
			scope: {
				data: '='
			},
			controller: function ($scope) {

			},
			link: function(scope, element, attrs) {
				var width = 600,
				     height = 300;      

				    svg = d3.select(element[0]).append("svg")
				       .attr("width", width)
				       .attr("height", height)
				       .on("mousedown", mouseDown)
				       .on("mouseup", mouseUp)

				   var strokesContainer = []; // for emitting

				   // setting vars for brush
				   var size = 5
				   var opacity = 0.7
				   
				   // // logic for buttons <--> brush + reset svg
				   // $('#brushSize').change(function () {
				   //     size = $('#brushSize').val()
				   // }) 
				   // $('#opacity').change(function () {
				   //     opacity = $('#opacity').val()
				   // }) 
				   // $('#reset').click(function () { 
				   //     svg.selectAll("*").remove();
				   //     drawSomething_socket.emit('reset');
				   // })

				   // logic for drawing
				   function mouseDown () {
				     svg.on('mousemove', function () {
				       var coordinates = d3.mouse(this);

				     var drawStrokeObj = svg.append("circle")
				           .attr("cx", coordinates[0])
				           .attr("cy", coordinates[1])
				           .attr("r", size)
				           .attr("stroke-width", 1)
				           .attr("fill", '#000')
				           .attr("opacity", opacity)

				       var obj = {
				         cx: parseInt(drawStrokeObj[0][0].attributes.cx.value),
				         cy: parseInt(drawStrokeObj[0][0].attributes.cy.value),
				         r: drawStrokeObj[0][0].attributes.r.value,
				         fill: drawStrokeObj[0][0].attributes.fill.value,
				         opacity: drawStrokeObj[0][0].attributes.opacity.value
				       }
				       strokesContainer.push(obj)
				     })
				   }

				   function mouseUp () {
				     svg.on("mousemove", null)
				     socket.emit('newStroke', {strokes: strokesContainer});
				     strokesContainer = []
				   }

				   // when receiving a socket.io event "strokesToDraw", draw it!
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
				   
				   // when receiving event resetDrawing, svgremove 
				   socket.on('resetDrawing', function () {
				     svg.selectAll("*").remove();
				     // drawSomething_socket.emit('reset');
				   })
			}
		}
	})
	.directive('seedraw', function (socket, d3) {
		return {
			restrict: 'EA',
			scope: {
				data: '='
			},
			controller: function ($scope) {

			},
			link: function(scope, element, attrs) {
				var width = 600,
				     height = 300;      

				    svgSee = d3.select(element[0]).append("svg")
				       .attr("width", width)
				       .attr("height", height)
				       .on("mousedown", mouseDown)
				       .on("mouseup", mouseUp)

				   var strokesContainer = []; // for emitting

				   // setting vars for brush
				   var size = 5
				   var opacity = 0.7
				   
				   // // logic for buttons <--> brush + reset svg
				   // $('#brushSize').change(function () {
				   //     size = $('#brushSize').val()
				   // }) 
				   // $('#opacity').change(function () {
				   //     opacity = $('#opacity').val()
				   // }) 
				   // $('#reset').click(function () { 
				   //     svg.selectAll("*").remove();
				   //     drawSomething_socket.emit('reset');
				   // })

				   // logic for drawing
				   function mouseDown () {
				     svg.on('mousemove', function () {
				       var coordinates = d3.mouse(this);

				     var drawStrokeObj = svg.append("circle")
				           .attr("cx", coordinates[0])
				           .attr("cy", coordinates[1])
				           .attr("r", size)
				           .attr("stroke-width", 1)
				           .attr("fill", '#000')
				           .attr("opacity", opacity)

				       var obj = {
				         cx: parseInt(drawStrokeObj[0][0].attributes.cx.value),
				         cy: parseInt(drawStrokeObj[0][0].attributes.cy.value),
				         r: drawStrokeObj[0][0].attributes.r.value,
				         fill: drawStrokeObj[0][0].attributes.fill.value,
				         opacity: drawStrokeObj[0][0].attributes.opacity.value
				       }
				       strokesContainer.push(obj)
				     })
				   }

				   function mouseUp () {
				     svg.on("mousemove", null)
				     socket.emit('newStroke', {strokes: strokesContainer});
				     strokesContainer = []
				   }

				   // when receiving a socket.io event "strokesToDraw", draw it!
				   socket.on('strokesToDraw', function (data) {
				     // console.log(data.data.strokes)
				     var drawTheseStrokes = data.data.strokes;

				     function drawNewObj (obj) {
				         svgSee.append("circle")
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
				   
				   // when receiving event resetDrawing, svgremove 
				   socket.on('resetDrawing', function () {
				     svgSee.selectAll("*").remove();
				     // drawSomething_socket.emit('reset');
				   })
			}
		}
	})