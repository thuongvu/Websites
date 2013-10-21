$(document).ready(function() {
    $('#button').click(function() {
    var toAdd = $('input[name=checkListItem]').val();
    $('.list').append('<div class="item">' + '<input type="checkbox" class="chkb"></input>' + toAdd + '</div>');
    });
    $(document).on('click', '.chkb', function() {
        $(this).parent('.item').remove();
        $(".purpleBalloon").addClass("showPurple");
        $(".blueBalloon").addClass("showBlue");
    });
});

// adapted from Eric Weinstein - codecademy.com // 