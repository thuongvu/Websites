// 2:07PM
$(document).ready(function(){
    // bootstrap nav bar
    $('#flashcards a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
    })
    $('#quiz1 a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
    })

    // declaring the state object
    function state(name, capitol){
        this.name = name;
        this.capitol = capitol;
    };

    // declaring the display method for the state object on its prototype
    state.prototype.display = function() {
        var displayState = "<br><div='state' id='"+this.name+"'>" + this.name + "</div><div><img src='images/" +this.name+ ".gif' height='150'></img></div>";
        var displayCapitol = "<div class='caps' id='"+this.capitol+"'>" + this.capitol + "</div><div><img src='images/" +this.name+ ".gif' height='150'></img></div>";
        $('#display').append(displayState);
        console.log(displayState);
        $("#"+this.name).click(function(){
            $(this).toggleClass().toggleClass('caps').html(displayCapitol);
        })
    };
    // declaring an array of the 50 states
    var allStates = [
        Alabama = new state("Alabama", "Montgomery"),
        new state("Alaska", "Juneau"),
        new state("Arizona", "Phoenix"),
        new state("Arkansas", "Little_Rock"),
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
        new state("Iowa", "Des_Moines"),
        new state("Kansas", "Frankfort"),
        new state("Kentucky", "Dover"),
        new state("Louisiana", "Baton_Rouge"),
        new state("Maine","Augusta"),              
        new state("Maryland", "Annapolis"),
        new state("Massachusetts", "Boston"),
        new state("Michigan", "Lansing"),
        new state("Minnesota", "Saint_Paul"),
        new state("Mississippi","Jackson"),
        new state("Missouri", "Jefferson_City"),
        new state("Montana", "Helena"),
        new state("Nebraska", "Lincoln"),
        new state("Nevada", "Carson City"),
        new state("New_Hampshire","Concord"),     
        new state("New_Jersey", "Trenton"),
        new state("New_Mexico", "Santa_Fe"),
        new state("New_York", "Albany"),
        new state("North_Carolina", "Raleigh"),
        new state("North_Dakota","Bismarck"),
        new state("Ohio", "Columbus"),
        new state("Oklahoma", "Oklahoma_City"),
        new state("Oregon", "Salem"),
        new state("Pennsylvania", "Harrisburg"),
        new state("Rhode_Island","Providence"),   
        new state("Nevada", "Carson City"),
        new state("South_Carolina","Columbia"),     
        new state("South_Dakota", "Pierre"),
        new state("Tennessee", "Nashville"),
        new state("Texas", "Austin"),
        new state("Utah", "Salt_Lake_City"),
        new state("Vermont","Montpelier"),
        new state("Virginia", "Richmond"),
        new state("Washington", "Olympia"),
        new state("West Virginia", "Charleston"),
        new state("Wisconsin", "Madison"),
        new state("Wyoming","Cheyenne")     
     ]
   
    // declaring the question method for the state object   
    state.prototype.question = function() {
        // a function that chooses a random state out of the array, allStates
        function randomize() {
            var random = allStates[Math.floor(Math.random()*allStates.length)];
            return random.capitol;
        }

        // an array that invokes randomize() 3 times, and shows the specific state instance's this.capitol, and adds that as a class
        // added as a class so later i can make a jquery .click function.  if you click this one, blah blah
        choicesArray = [
            "<button>"+randomize()+"</button>",
            "<button>"+randomize()+"</button>",
            "<button class='"+this.capitol+"'>"+this.capitol+"</button>",
            "<button>"+randomize()+"</button>",
        ];

        // a function that takes an array as an argument, and shuffles the items within it, and returns it as another array
        //+ Jonas Raoni Soares Silva
        //@ http://jsfromhell.com/array/shuffle [v1.0]
        function shuffle(o){ //v1.0
            for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        };

        // invoke the shuffle function with choicesArray as the param, it outputs choicesArrayShuffled
        choicesArrayShuffled = shuffle(choicesArray);

        // this object's question is...
        this.question = "<div class='question' id='"+this.name+"'> What is the capitol of " +this.name+ " ?</div><ul><li>" +choicesArrayShuffled[0] + "</li><li>" + choicesArrayShuffled[1] +"</li><li>"+ choicesArrayShuffled[2] +"</li><li>"+ choicesArrayShuffled[3] +"</li></ul>";

        // append this.question to #quiz id
        console.log(this.question);
        $('#quiz').append(this.question);

        // if the user clicks the element which has a class with the capitol name of the object, then alert correct
        $("."+this.capitol).click(function(){
            alert("Correct!");
        });
    }
        
    // for the array allStates, for each item within the array, DO THIS
     allStates.forEach(function (eachState) {
        eachState.display(); 
        eachState.question(); 
    }) 


});




// 435 pm -------------------------------------------------------------------------------------------------//
$(document).ready(function(){
    // bootstrap nav bar
    $('#flashcards a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
    })
    $('#quiz1 a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
    })

    // declaring the state object
    function state(name, capitol){
        this.name = name;
        this.capitol = capitol;
        this.display = function() {
        var displayState = "<br><div='state' id='"+this.name+"'>" + this.name + "</div><div><img src='images/" +this.name+ ".gif' height='150'></img></div>";
        var displayCapitol = "<div class='caps' id='"+this.capitol+"'>" + this.capitol + "</div><div><img src='images/" +this.name+ ".gif' height='150'></img></div>";
        $('#display').append(displayState);
        console.log(displayState);
        $("#"+this.name).click(function(){
            $(this).toggleClass().toggleClass('caps').html(displayCapitol);
        })
    };
    };

    // declaring the display method for the state object on its prototype



    // declaring an array of the 50 states
    var allStates = [
        Alabama = new questionType("Alabama", "Montgomery"),
        new questionType("Alaska", "Juneau"),
        new questionType("Arizona", "Phoenix"),
        new questionType("Arkansas", "Little_Rock"),
        new questionType("California","Sacramento"),
        new questionType("Colorado", "Denver"),
        new questionType("Connecticut", "Hartford"),
        new questionType("Delaware", "Dover"),
        new questionType("Florida", "Tallahassee"),
        new questionType("Georgia","Atlanta"),     
        new questionType("Hawaii", "Honolulu"),
        new questionType("Idaho", "Boise"),
        new questionType("Illinois", "Springfield"),
        new questionType("Indiana","Indianapolis"),
        new questionType("Iowa", "Des_Moines"),
        new questionType("Kansas", "Frankfort"),
        new questionType("Kentucky", "Dover"),
        new questionType("Louisiana", "Baton_Rouge"),
        new questionType("Maine","Augusta"),              
        new questionType("Maryland", "Annapolis"),
        new questionType("Massachusetts", "Boston"),
        new questionType("Michigan", "Lansing"),
        new questionType("Minnesota", "Saint_Paul"),
        new questionType("Mississippi","Jackson"),
        new questionType("Missouri", "Jefferson_City"),
        new questionType("Montana", "Helena"),
        new questionType("Nebraska", "Lincoln"),
        new questionType("Nevada", "Carson City"),
        new questionType("New_Hampshire","Concord"),     
        new questionType("New_Jersey", "Trenton"),
        new questionType("New_Mexico", "Santa_Fe"),
        new questionType("New_York", "Albany"),
        new questionType("North_Carolina", "Raleigh"),
        new questionType("North_Dakota","Bismarck"),
        new questionType("Ohio", "Columbus"),
        new questionType("Oklahoma", "Oklahoma_City"),
        new questionType("Oregon", "Salem"),
        new questionType("Pennsylvania", "Harrisburg"),
        new questionType("Rhode_Island","Providence"),   
        new questionType("Nevada", "Carson City"),
        new questionType("South_Carolina","Columbia"),     
        new questionType("South_Dakota", "Pierre"),
        new questionType("Tennessee", "Nashville"),
        new questionType("Texas", "Austin"),
        new questionType("Utah", "Salt_Lake_City"),
        new questionType("Vermont","Montpelier"),
        new questionType("Virginia", "Richmond"),
        new questionType("Washington", "Olympia"),
        new questionType("West Virginia", "Charleston"),
        new questionType("Wisconsin", "Madison"),
        new questionType("Wyoming","Cheyenne")     
     ]

    /* var randomState = allStates[Math.floor(Math.random()*allStates.length)];
    console.log(randomState.capitol); */
      //  randomState.display(); 

function questionType(name, capitol) {
    state.call(this, name, capitol);
};
        
    // declaring the question method for the state object   
    questionType.prototype.question = function() {
        // a function that chooses a random state out of the array, allStates
        function randomize() {
            var random = allStates[Math.floor(Math.random()*allStates.length)];
            return random.capitol;
        }

        // an array that invokes randomize() 3 times, and shows the specific state instance's this.capitol, and adds that as a class
        // added as a class so later i can make a jquery .click function.  if you click this one, blah blah
        choicesArray = [
            "<button>"+randomize()+"</button>",
            "<button>"+randomize()+"</button>",
            "<button class='"+this.capitol+"'>"+this.capitol+"</button>",
            "<button>"+randomize()+"</button>",
        ];


        // a function that takes an array as an argument, and shuffles the items within it, and returns it as another array
        //+ Jonas Raoni Soares Silva
        //@ http://jsfromhell.com/array/shuffle [v1.0]
        function shuffle(o){ //v1.0
            for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        };

        // invoke the shuffle function with choicesArray as the param, it outputs choicesArrayShuffled
        choicesArrayShuffled = shuffle(choicesArray);

        // this object's question is...
        this.question = "<div class='question' id='"+this.name+"'> What is the capitol of " +this.name+ " ?</div><ul><li>" +choicesArrayShuffled[0] + "</li><li>" + choicesArrayShuffled[1] +"</li><li>"+ choicesArrayShuffled[2] +"</li><li>"+ choicesArrayShuffled[3] +"</li></ul>";

        // append this.question to #quiz id
        console.log(this.question);
        $('#quiz').append(this.question);

        // if the user clicks the element which has a class with the capitol name of the object, then alert correct
        $("."+this.capitol).click(function(){
            alert("Correct!");
        });
    }
        
function inheritPrototype(childObject, parentObject) {
    var copyOfParent = Object.create(parentObject.prototype);
    copyOfParent.constructor = childObject;
    childObject.prototype = copyOfParent;
}

inheritPrototype(questionType, state);


for (var property in Alabama) {
    console.log("properties of alabama are " + Alabama[property]);
}

    // for the array allStates, for each item within the array, DO THIS
     allStates.forEach(function (eachState) {
        eachState.display(); 
        eachState.question();
    }) 


});






// --------------- 440pm ----------------------------------------------------------------------------------- //
$(document).ready(function(){
    // bootstrap nav bar
    $('#flashcards a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
    })
    $('#quiz1 a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
    })

    // declaring the state object
    function state(name, capitol){
        this.name = name;
        this.capitol = capitol;
        this.display = function() {
        var displayState = "<br><div='state' id='"+this.name+"'>" + this.name + "</div><div><img src='images/" +this.name+ ".gif' height='150'></img></div>";
        var displayCapitol = "<div class='caps' id='"+this.capitol+"'>" + this.capitol + "</div><div><img src='images/" +this.name+ ".gif' height='150'></img></div>";
        $('#display').append(displayState);
        console.log(displayState);
        $("#"+this.name).click(function(){
            $(this).toggleClass().toggleClass('caps').html(displayCapitol);
        })
    };
    };

    // declaring the display method for the state object on its prototype



    // declaring an array of the 50 states
    var allStates = [
        Alabama = new questionType("Alabama", "Montgomery"),
        new questionType("Alaska", "Juneau"),
        new questionType("Arizona", "Phoenix"),
        new questionType("Arkansas", "Little_Rock"),
        new questionType("California","Sacramento"),
        new questionType("Colorado", "Denver"),
        new questionType("Connecticut", "Hartford"),
        new questionType("Delaware", "Dover"),
        new questionType("Florida", "Tallahassee"),
        new questionType("Georgia","Atlanta"),     
        new questionType("Hawaii", "Honolulu"),
        new questionType("Idaho", "Boise"),
        new questionType("Illinois", "Springfield"),
        new questionType("Indiana","Indianapolis"),
        new questionType("Iowa", "Des_Moines"),
        new questionType("Kansas", "Frankfort"),
        new questionType("Kentucky", "Dover"),
        new questionType("Louisiana", "Baton_Rouge"),
        new questionType("Maine","Augusta"),              
        new questionType("Maryland", "Annapolis"),
        new questionType("Massachusetts", "Boston"),
        new questionType("Michigan", "Lansing"),
        new questionType("Minnesota", "Saint_Paul"),
        new questionType("Mississippi","Jackson"),
        new questionType("Missouri", "Jefferson_City"),
        new questionType("Montana", "Helena"),
        new questionType("Nebraska", "Lincoln"),
        new questionType("Nevada", "Carson City"),
        new questionType("New_Hampshire","Concord"),     
        new questionType("New_Jersey", "Trenton"),
        new questionType("New_Mexico", "Santa_Fe"),
        new questionType("New_York", "Albany"),
        new questionType("North_Carolina", "Raleigh"),
        new questionType("North_Dakota","Bismarck"),
        new questionType("Ohio", "Columbus"),
        new questionType("Oklahoma", "Oklahoma_City"),
        new questionType("Oregon", "Salem"),
        new questionType("Pennsylvania", "Harrisburg"),
        new questionType("Rhode_Island","Providence"),   
        new questionType("Nevada", "Carson City"),
        new questionType("South_Carolina","Columbia"),     
        new questionType("South_Dakota", "Pierre"),
        new questionType("Tennessee", "Nashville"),
        new questionType("Texas", "Austin"),
        new questionType("Utah", "Salt_Lake_City"),
        new questionType("Vermont","Montpelier"),
        new questionType("Virginia", "Richmond"),
        new questionType("Washington", "Olympia"),
        new questionType("West Virginia", "Charleston"),
        new questionType("Wisconsin", "Madison"),
        new questionType("Wyoming","Cheyenne")     
     ]

    /* var randomState = allStates[Math.floor(Math.random()*allStates.length)];
    console.log(randomState.capitol); */
      //  randomState.display(); 

function questionType(name, capitol) {
    state.call(this, name, capitol);
        //+ Jonas Raoni Soares Silva
        //@ http://jsfromhell.com/array/shuffle [v1.0]
    this.shuffle = function(o){ //v1.0
            for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        };    
    this.q = "<div class='question' id='"+this.name+"'> What is the capitol of " +this.name+ " ?</div>";    
};
        
    // declaring the question method for the state object   
    questionType.prototype.question = function() {
        // a function that chooses a random state out of the array, allStates
        function randomize() {
            var random = allStates[Math.floor(Math.random()*allStates.length)];
            return random.capitol;
        }

        // an array that invokes randomize() 3 times, and shows the specific state instance's this.capitol, and adds that as a class
        // added as a class so later i can make a jquery .click function.  if you click this one, blah blah
        choicesArray = [
            "<button>"+randomize()+"</button>",
            "<button>"+randomize()+"</button>",
            "<button class='"+this.capitol+"'>"+this.capitol+"</button>",
            "<button>"+randomize()+"</button>",
        ];

        // invoke the shuffle function with choicesArray as the param, it outputs choicesArrayShuffled
        choicesArrayShuffled = this.shuffle(choicesArray);

        // this object's question is...
        this.q += "<ul><li>" +choicesArrayShuffled[0] + "</li><li>" + choicesArrayShuffled[1] +"</li><li>"+ choicesArrayShuffled[2] +"</li><li>"+ choicesArrayShuffled[3] +"</li></ul>";

        // append this.question to #quiz id
        console.log(this.q);
        $('#quiz').append(this.q);

        // if the user clicks the element which has a class with the capitol name of the object, then alert correct
        $("."+this.capitol).click(function(){
            alert("Correct!");
        });
    }

    
        
function inheritPrototype(childObject, parentObject) {
    var copyOfParent = Object.create(parentObject.prototype);
    copyOfParent.constructor = childObject;
    childObject.prototype = copyOfParent;
}

inheritPrototype(questionType, state);


for (var property in Alabama) {
    console.log("properties of alabama are " + Alabama[property]);
}

    // for the array allStates, for each item within the array, DO THIS
     allStates.forEach(function (eachState) {
        eachState.display(); 
        eachState.question();
    }) 


});










