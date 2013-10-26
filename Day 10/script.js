
// function get_random_color returns color
function get_random_color() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * letters.length)];
    }
    return color;
} 

window.setInterval(function() {
    $('.colorbox').css('background-color', get_random_color()); 
    $('this').effect('pulsate', {times:1}, 'slow', 'easeInOutBack');
},  2000);


                


