$(document).ready(function(){
    // bootstrap nav bar
    $('#flashcards a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
    })
    $('#flashcards2 a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
    })    
    $('#quiz1 a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
    })
    $('#quiz2 a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
    })

    // declaring the state object
    function state(name, capitol){
        this.name = name;
        this.capitol = capitol;
        // html for display state + capitol for flashcards
        var displayState = "<br><div class='state' id='"+this.name+"'><br>" + this.name + "<p><img src='images/" +this.name+ ".gif' height='150'></img></p></div>";
        var displayCapitol = "<br><div class='caps' id='"+this.capitol+"'><br>" + this.capitol + "<p><img src='images/" +this.name+ ".gif' height='150'></img></p></div>";
        
        // first flashcard page
        this.flashcard1 = function() {
            // show states
            $('#flashcard1').append(displayState);
            console.log(displayState);
            // when user clicks # name of state, toggle the class, and then show its capitol
            $("#"+this.name).click(function(){
                $(this).toggleClass().html(displayCapitol);
            })
        };
        // 2nd flashcard page
        this.flashcard2 = function() {
            $('#flashcard2').append(displayCapitol);
            console.log(displayCapitol);
            $("#"+this.capitol).click(function(){
                $(this).toggleClass().html(displayState);
            })
        };

    };

    // declaring an array of questionType objects for all the states
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

    shuffle = function shuffle(o){ //v1.0
            for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
    };   

    allStatesShuffled = shuffle(allStates);

// declaring a new object called questionType
function questionType(name, capitol) {
    // calling the state constructor inside the questionType constructor so it can be inherited
    state.call(this, name, capitol);
    // from stackoverflow, shuffles whatever array you pass, returns the shuffled array
    //+ Jonas Raoni Soares Silva@ http://jsfromhell.com/array/shuffle [v1.0] 
};
        
    // declaring the question method for the questionType   
    questionType.prototype.question = function() {
        // a function that chooses a random questionType/state out of the array, allStates, returns a random object's capitol property
        function randomize() {
            var random = allStates[Math.floor(Math.random()*allStates.length)];
            return random.capitol;
        }
        // an array that invokes randomize() 3 times, and shows the specific state instance's this.capitol, and adds that as a class
        // added as a class so later i can make a jquery .click function.
        choicesArray = [
            "<button class='btn-danger'>"+randomize()+"</button>",
            "<button class='btn-danger'>"+randomize()+"</button>",
            "<button class='btn-danger "+this.capitol+"'>"+this.capitol+"</button>",
            "<button class='btn-danger'>"+randomize()+"</button>",
        ];

        // invoke the shuffle function defined in the constructor with choicesArray as the param, it outputs choicesArrayShuffled
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

    questionType.prototype.question2 = function() {
        function randomize() {
            var random = allStates[Math.floor(Math.random()*allStates.length)];
            return random.name;
        }
        choicesArray = [
            "<button class='btn-primary'>"+randomize()+"</button>",
            "<button class='btn-primary'>"+randomize()+"</button>",
            "<button class='btn-primary "+this.name+"'>"+this.name+"</button>",
            "<button class='btn-primary'>"+randomize()+"</button>",
        ];
        choicesArrayShuffled = shuffle(choicesArray);
         this.question = "<div class='question' id='"+this.capitol+"'>" +this.capitol+ " is the capitol of which state?</div><ul><li>" +choicesArrayShuffled[0] + "</li><li>" + choicesArrayShuffled[1] +"</li><li>"+ choicesArrayShuffled[2] +"</li><li>"+ choicesArrayShuffled[3] +"</li></ul>";
        $('#quiz2').append(this.question);
        $("."+this.name).click(function(){
            alert("Correct!");
        });        
    }
//parasitic combination inheritance pattern        
function inheritPrototype(childObject, parentObject) {
    var copyOfParent = Object.create(parentObject.prototype); // pass an object that you want to inherit from into Object.create
    copyOfParent.constructor = childObject; // set the constructor of new object to point to childObject, because it overwrote childObject's constructor when it overwrote childObject's prototype during Object.create
    childObject.prototype = copyOfParent; // set childObject prototype to copyofparent so it can inherit from copyofparent, and thereby, parentobject
}
// invoke it
inheritPrototype(questionType, state);

    // for the array allStates, for each item within the array, DO THIS
     allStatesShuffled.forEach(function (eachState) {
        eachState.flashcard1(); 
        eachState.flashcard2(); 
        eachState.question();
        eachState.question2();
    }) 

});






