// works
/* $(document).ready(function() {
    $('#button').click(function() {
    var toAdd = $('input[name=checkListItem]').val();
    $('.list').append('<div class="item">' + '<input type="checkbox" class="chkb"></input>' + '<img id="pin" src="pin3.png">'+ toAdd + '</div>');
    $(".item").draggable();
    });
    $(document).on('click', '.chkb', function() {
        $(this).parent('.item').remove();
    });
}); */

// experiment 
$(document).ready(function() {
    $('#button').click(function() {
    var toAdd = $('input[name=checkListItem]').val();
    $('.list').append('<div class="item">' + '<input type="checkbox" class="chkb"></input>' + '<img id="pin" src="images/pin.png">'+ toAdd + '</div>');
    $('.item').draggable();
    });
    $(document).on('click', '.chkb', function() {
        $(this).parent('.item').remove();
    });
});