// declare vars as global variables
var ms = 0;
var sec = 0;
// declare var, eventually will be an object that holds stopWatch() and runs it
var clock = 0

// what happens if i declare that as a var.  
stopWatch = function() { 
   clearTimeout(clock);   
    ms+=10;
    if (ms >= 999) {
      ms = 0;
      sec++;
     }  
    // assign var clock to run stopWatch on a 10 millisecond delay with setTimeout()   
    clock = setTimeout("stopWatch()", 10);  
    // write it into the html using jquery
    $('#wutTime').text("Seconds: " + sec + "                Milliseconds: " + ms)    
};


$(document).ready(function() {
    var random = Math.round(Math.random() * (3000-500)) + 500;
    $('#appear').click(function() {
        $('#on').slideToggle('fast');
        $('#on').addClass('visible');
        
        setTimeout(function() {
            $('#zombie').slideToggle('fast');
            $('#zombie').addClass('visible');
            stopWatch();    
        }, random);
        
    }); 
    
    // when clicking the "pause" button
    $('#pause').click(function() {
        $('#on').effect('explode', 'fast');
        $('#on').removeClass('visible'); 
        
        if ( $('#zombie').hasClass('visible') ) {
            pause();
            $('#zombie').effect('explode', 'fast');
            $('#zombie').removeClass('visible');
        } else { 
            alert("There are no zombies yet!");
        };
    });
});

var record = new Array();

pause = function() {
clearTimeout(clock);
    if (sec > 1) {
        $('#rec').text("You are too SLOW!  You're lucky to be alive!"); 
    } else {
     record.push(ms)
    var lowest = 1000;
    for (var i = 0; i < record.length; i++ ) {
        if (record[i] < lowest) {
        lowest = record[i];
        };
    };
    $('#rec').text("Best score: " + lowest + " milliseconds");       
};
    sec = 0;
    ms = 0;
};
