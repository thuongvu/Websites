var foodApp = angular.module('foodApp', [])

foodApp.factory('Food', function() {
	var Food = {};
	Food.list = [
	{
		name: "Apple",
		group: "fruit",
		img: "images/Apple.jpg"

	},
	{
		name: "Celery",
		group: "vegetable",
		img: "images/Celery.jpg"
	},
	{
		name: "Jack In the Box Cheeseburger",
		group: "mixed",
		img: "images/JackInTheBox.jpg"
	},
	{
		name: "Canned Black Beans",
		group: "vegetable",
		img: "images/CannedBlackBeans.jpg"
	},
	{
		name: "Werther's Original Candy",
		group: "sweets",
		img: "images/Werther.jpg"
	},
	{
		name: "Broccoli",
		group: "vegetable",
		img: "images/Broccoli.jpg"
	},
	{
		name: "Glazed Donut",
		group: "grains",
		img: "images/GlazedDonut.jpg"
	},
	{
		name: "French Sandwich Roll",
		group: "grains",
		img: "images/FrenchSandwichRoll.jpg"
	},
	{
		name: "Avocado",
		group: "fruit",
		img: "images/Avocado.jpg"
	},
	{
		name: "Corn",
		group: "vegetable",
		img: "images/Corn.jpg"
	},
	{
		name: "Baby Carrots",
		group: "vegetable",
		img: "images/BabyCarrots.jpg"
	},
	{
		name: "Canned Peas",
		group: "vegetable",
		img: "images/CannedPeas.jpg"
	},
	{
		name: "Canned Pork and Beans",
		group: "vegetable",
		img: "images/CannedPorkAndBeans.jpg"
	},
	{
		name: "Coca Cola",
		group: "sweets",
		img: "images/CocaCola.jpg"
	},
	{
		name: "Doritos",
		group: "sweets",
		img: "images/Doritos.jpg"
	},
	{
		name: "Dried Apricots",
		group: "fruit",
		img: "images/DriedApricots.jpg"
	},
	{
		name: "Jack in the Box French Fries",
		group: "sweets",
		img: "images/FrenchFries.jpg"
	},
	{
		name: "Fried Bacon",
		group: "meat",
		img: "images/FriedBacon.jpg"
	},
	{
		name: "Fruit Loops",
		group: "grains",
		img: "images/FruitLoops.jpg"
	},
	{
		name: "Grapes",
		group: "fruit",
		img: "images/Grapes.jpg"
	},
	{
		name: "Splenda",
		group: "sweets",
		img: "images/Splenda.jpg"
	},
	{
		name: "Gummy Bears",
		group: "sweets",
		img: "images/GummyBears.jpg"
	},
	{
		name: "Hershey Kisses",
		group: "sweets",
		img: "images/HersheyKisses.jpg"
	},
	{
		name: "Mini Peppers",
		group: "vegetable",
		img: "images/MiniPeppers.jpg"
	},
	{
		name: "Honeydew Melon",
		group: "fruit",
		img: "images/HoneydewMelon.jpg"
	},
	{
		name: "Hot Dog",
		group: "meat",
		img: "images/HotDogs.jpg"
	},
	{
		name: "Jelly Beans",
		group: "sweets",
		img: "images/JellyBeans.jpg"
	},
	{
		name: "Ketchup",
		group: "sweets",
		img: "images/Ketchup.jpg"
	},
	{
		name: "Kiwi",
		group: "fruit",
		img: "images/Kiwi.jpg"
	},
	{
		name: "M&M's",
		group: "sweets",
		img: "images/Mms.jpg"
	},
	{
		name: "Onion",
		group: "vegetable",
		img: "images/Onion.jpg"
	},
	{
		name: "Sliced Smoked Turkey",
		group: "meat",
		img: "images/SlicedSmokedTurkey.jpg"
	},
	{
		name: "Eggs",
		group: "meat",
		img: "images/Eggs.jpg"
	},
	{
		name: "Smarties",
		group: "sweets",
		img: "images/Smarties.jpg"
	},
	{
		name: "Tootsie Pops",
		group: "sweets",
		img: "images/TootsiePops.jpg"
	},
	{
		name: "Whole Milk",
		group: "dairy",
		img: "images/WholeMilk.jpg"
	},
	];

	return Food;
})

// injecting Food into the foodController
function foodController($scope, Food) {
	$scope.food = Food;

	$scope.filters = {};
	//initializing the state of the layout prop on this scope to be list
	$scope.layout = 'list';

}