$(document).ready(function(){

    function state(name, capitol){
        this.name = name;
        this.capitol = capitol;
    };

    state.prototype.display = function() {
        var displayState = "<br><div='state' id='"+this.name+"'>" + this.name + "</div><div><img src='images/" +this.name+ ".gif' height='150'></img></div>";
        var displayCapitol = "<div class='caps' id='"+this.capitol+"'>" + this.capitol + "</div><div><img src='images/" +this.name+ ".gif' height='150'></img></div>";
        $('#display').append(displayState);
        console.log(displayState);
        $("#"+this.name).click(function(){
            $(this).toggleClass().toggleClass('caps').html(displayCapitol);
        })
    };

    var allStates = [
        new state("Alabama", "Montgomery"),
        new state("Alaska", "Juneau"),
        new state("Arizona", "Phoenix"),
        new state("Arkansas", "Little Rock"),
        new state("California","Sacramento"),
        new state("Colorado", "Denver"),
        new state("Connecticut", "Hartford"),
        new state("Delaware", "Dover"),
        new state("Florida", "Tallahassee"),
        new state("Georgia","Atlanta"),     
        new state("Hawaii", "Honolulu"),
        new state("Idaho", "Boise"),
        new state("Illinois", "Springfield"),
        new state("Indiana","Indianapolis"),
        new state("Iowa", "Des Moines"),
        new state("Kansas", "Frankfort"),
        new state("Kentucky", "Dover"),
        new state("Louisiana", "Baton Rouge"),
        new state("Maine","Augusta"),              
        new state("Maryland", "Annapolis"),
        new state("Massachusetts", "Boston"),
        new state("Michigan", "Lansing"),
        new state("Minnesota", "Saint Paul"),
        new state("Mississippi","Jackson"),
        new state("Missouri", "Jefferson City"),
        new state("Montana", "Helena"),
        new state("Nebraska", "Lincoln"),
        new state("Nevada", "Carson City"),
        new state("New Hampshire","Concord"),     
        new state("New Jersey", "Trenton"),
        new state("New Mexico", "Santa Fe"),
        new state("New York", "Albany"),
        new state("North Carolina", "Raleigh"),
        new state("North Dakota","Bismarck"),
        new state("Ohio", "Columbus"),
        new state("Oklahoma", "Oklahoma City"),
        new state("Oregon", "Salem"),
        new state("Pennsylvania", "Harrisburg"),
        new state("Rhode Island","Providence"),   
        new state("Nevada", "Carson City"),
        new state("South Carolina","Columbia"),     
        new state("South Dakota", "Pierre"),
        new state("Tennessee", "Nashville"),
        new state("Texas", "Austin"),
        new state("Utah", "Salt Lake City"),
        new state("Vermont","Montpelier"),
        new state("Virginia", "Richmond"),
        new state("Washington", "Olympia"),
        new state("West Virginia", "Charleston"),
        new state("Wisconsin", "Madison"),
        new state("Wyoming","Cheyenne")     
    ]

    var randomState = allStates[Math.floor(Math.random()*allStates.length)];
    console.log(randomState);
        randomState.display();

})






