/* when the document loads, the for loop calls addDiv x number of times */
$(document).ready(function(){
    for (var i = 0; i < 576; i++) {
     addDiv();
    };
});
             
/* add a div function */
function addDiv () {
   // create a new div element
    var newDiv = document.createElement("div");
    // finds dynamicDiv and assigns it to variable mainDiv
    mainDiv = document.getElementById("dynamicDivs");
    // inserts the JS-created div before dynamicDiv in html
    document.body.insertBefore(newDiv, mainDiv);
};

/* on mouseover over divs, this function toggles the "green" class */
  $(function() {
    $( "div" ).mouseover(function(){
      $( this ).toggleClass("opacity", "easeInElastic");
    });
  });

/* on hover over divs, this function will toggle the "highlight" class */
  $(function() {
    $( "div" ).hover(function(){
      $( this ).toggleClass("highlight", "easeInElastic");
    });
  });


