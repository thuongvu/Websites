
$(document).ready(function(){
    $('#convert').click(function() {
        var str = $('#inText').val();  
        var re = /\w\S*/g;
        var myArray = str.match(re);
        var changed = moveText(str);
        $('#outText').val(changed);
    });
});


function moveText(str) {
    return str.replace(/\w\S*/g, function(txt){ 
        return txt.substr(0,1) + txt.substr(2,1) + txt.substr(1,1)  + txt.substr(3,1) + txt.substr(4,1) + txt.substr(6,1) + txt.substr(5,1)  + txt.substr(7,1) + txt.substr(8,1) + txt.substr(9,1) + txt.substr(10,1) ;
    });
}

    