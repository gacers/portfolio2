// var $window = $(window),
// 	dimensions = [];

// function load() {
// 	getDimensions();
// 	windowSize();
// }

// function getDimensions() {
// 	var windowHeight = $window.height(),
// 		windowWidth = $window.width();

// 	dimensions.push(windowHeight, windowWidth);

// 	initialLoad();
// }

// function windowSize() {
// 	var dimensions = getDimensions();

// 	$window.resize(function(){
// 		var windowHeight = dimensions.winHeight,
// 			windowWidth = dimensions.winWidth;

// 		currentSize(windowHeight, windowWidth);
// 	});
// }

// var currentSize = function(windowHeight, windowWidth) {
// 	return {
// 		winHeight: windowHeight,
// 		winWidth: windowWidth
// 	};
// };

// function initialLoad() {

// }

// load();