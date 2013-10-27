function calculateTip(subA,subB,tax) {
    if (parseFloat(subA) > 0) {
        var tipA = parseFloat(subA) * .15;
    } else {
        var tipA = 0;
    };
    if (parseFloat(subB) > 0) {
        var tipB = parseFloat(subB) * .15;
    } else {
        var tipB = 0;
    };
    if (parseFloat(subA) > 0 && parseFloat(subB) > 0) {
        var taxSplit = (parseFloat(tax) / 2);
    } else {
        var taxSplit = parseFloat(tax);
    };
    if (parseFloat(subA) > 0) {
        var totalA = parseFloat(subA) + parseFloat(tipA) + parseFloat(taxSplit);
    } else {
        var totalA = 0;
    };
    if (parseFloat(subB) > 0) {
        var totalB  = parseFloat(subB) + parseFloat(tipB) + parseFloat(taxSplit);
    } else {
        var totalB = 0;
    };
    var totalAB = parseFloat(totalA) + parseFloat(totalB);
    return {
        personATip : tipA,
        personBTip : tipB,
        personATotal : totalA,
        personBTotal : totalB,
        totalAll : totalAB
    };
};

 $(document).ready(function() {
    $('#calcButton').click(function() {
        var subTotalA = $('#personASub').val();
        var subTotalB = $('#personBSub').val();
        var taxBreaks = $('#lowerTaxes').val();
        var calculatedTip = calculateTip(subTotalA, subTotalB, taxBreaks);
        var aTip = calculatedTip.personATip;
        var bTip = calculatedTip.personBTip;
        var aTotal = calculatedTip.personATotal;
        var bTotal = calculatedTip.personBTotal;
        var grandTotal = calculatedTip.totalAll;
        $('#personATip').val(aTip);
        $('#personBTip').val(bTip);
        $('#personAOwes').val(aTotal);
        $('#personBOwes').val(bTotal);
        $('#totalCost').val(grandTotal);
        $('.left_invis').slideToggle('slow');
        $('.center_invis').slideToggle('slow');
        $('.right_invis').slideToggle('slow');
    });
});
 