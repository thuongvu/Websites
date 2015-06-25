// // angular.module('app', ['app.services', 'app.controllers', 'd3', 'app.directives'])

// // angular.module('app.services', [])
// // 	.factory('socket', function ($rootScope) {
// // 	var serverBaseUrl = document.domain;
// // 	var socket = io.connect(serverBaseUrl + '/testdrawsocket');

// // 	return {
// // 		on: function (eventName, callback) {
// // 			socket.on(eventName, function () {
// // 				var args = arguments;
// // 				$rootScope.$apply(function() {
// // 					callback.apply(socket, args);
// // 				});
// // 			});
// // 		},
// // 		emit: function (eventName, data, callback) {
// // 			socket.emit(eventName, data, function () {
// // 				var args = arguments;
// // 				$rootScope.$apply(function() {
// // 					if(callback) {
// // 						callback.apply(socket, args);
// // 					}
// // 				});
// // 			});
// // 		}
// // 	};

// // });

// angular.module('app.directives', [])
// .directive('graph', function (d3, socket) {
// 		return {
// 			restrict: 'EA',
// 			scope: {
// 				data: '='
// 			},
// 			controller: function ($scope) {
// 			},
// 			link: function (scope, iElement, iAttrs) {
				
// 				var width = 1100,
// 				     height = 500;      

// 				    svg = d3.select(iElement[0])
// 				       .attr("width", width)
// 				       .attr("height", height)
// 				       .on("mousedown", mouseDown)
// 				       .on("mouseup", mouseUp)

// 				   var strokesContainer = []; // for emitting

// 				   // setting vars for brush
// 				   var size = 5
// 				   var opacity = 5

// 				   // logic for drawing
// 				   function mouseDown () {
// 				     svg.on('mousemove', function () {
// 				       var coordinates = d3.mouse(this);

// 				     var drawStrokeObj = svg.append("circle")
// 				           .attr("cx", coordinates[0])
// 				           .attr("cy", coordinates[1])
// 				           .attr("r", size)
// 				           .attr("stroke-width", 1)
// 				           .attr("fill", color)
// 				           .attr("opacity", opacity)

// 				       var obj = {
// 				         cx: parseInt(drawStrokeObj[0][0].attributes.cx.value),
// 				         cy: parseInt(drawStrokeObj[0][0].attributes.cy.value),
// 				         r: drawStrokeObj[0][0].attributes.r.value,
// 				         fill: drawStrokeObj[0][0].attributes.fill.value,
// 				         opacity: drawStrokeObj[0][0].attributes.opacity.value
// 				       }
// 				       strokesContainer.push(obj)
// 				     })
// 				   }

// 				   function mouseUp () {
// 				     svg.on("mousemove", null)
// 				     socket.emit('newStroke', {strokes: strokesContainer});
// 				     strokesContainer = []
// 				   }

// 				   // when receiving a socket.io event "strokesToDraw", draw it!
// 				   socket.on('strokesToDraw', function (data) {
// 				     // console.log(data.data.strokes)
// 				     var drawTheseStrokes = data.data.strokes;

// 				     function drawNewObj (obj) {
// 				         svg.append("circle")
// 				         .attr("cx", obj.cx)
// 				         .attr("cy", obj.cy)
// 				         .attr("r", obj.r)
// 				         .attr("stroke-width", 1)
// 				         .attr("fill", obj.fill)
// 				         .attr("opacity", obj.opacity)
// 				     }
				   
// 				     drawTheseStrokes.forEach(function (obj) {
// 				       drawNewObj(obj);
// 				     })

// 				   });
				   
// 				   // when receiving event resetDrawing, svgremove 
// 				   socket.on('resetDrawing', function () {
// 				     svg.selectAll("*").remove();
// 				     // drawSomething_socket.emit('reset');
// 				   })

// 			}
// 		}
// 	})

// 	angular.module('app.controllers', [])
// 		.controller('mainCtrl', ['$scope', 'socket', 'd3' function ($scope, socket, d3) {
			

// 		}])


		
