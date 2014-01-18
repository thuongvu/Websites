angular.module('app.directives', [])
.directive('graph', function (d3, socket) {
		return {
			restrict: 'EA',
			scope: {
				room: '=',
			},
			controller: function ($scope) {
				// var svg = d3.select(Element[0])
				// 		.append("svg")
				//        .attr("width", width)
				//        .attr("height", height)
				//        .on("mousedown", mouseDown)
				//        .on("mouseup", mouseUp)
			},
			link: function (scope, iElement, iAttrs) {
				// scope.$watch('data', drawNewObj, true);
				var room;
				scope.$watch('room', updateRoomName, true);

				function updateRoomName() {
					room = scope.room;
					console.log("updateRoomName fired")
					console.log(room)

				}
				
				var strokesContainer = scope.data

				var width = 500,
				     height = 300;      

				var svg = d3.select(iElement[0])
						.append("svg")
				       .attr("width", width)
				       .attr("height", height)
				       .on("mousedown", mouseDown)
				       .on("mouseup", mouseUp)

					// var strokesContainer = scope.data
				   var strokesContainer = []; // for emitting

				   // setting vars for brush
				   var size = 5
				   var opacity = 5

				   // logic for drawing
				   function mouseDown () {
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
				       // console.log(strokesContainer)
				     })
				   }

				   function mouseUp () {
				     svg.on("mousemove", null)
				     socket.emit('newStroke', {strokes: strokesContainer, room: room});
				     console.log(strokesContainer)
				     console.log(room)
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

				   function drawNewObj (obj) {
				       svg.append("circle")
				       .attr("cx", obj.cx)
				       .attr("cy", obj.cy)
				       .attr("r", obj.r)
				       .attr("stroke-width", 1)
				       .attr("fill", obj.fill)
				       .attr("opacity", obj.opacity)
				   }

			}
		}
	})