function placeHolder(element, txt) {
    $(element).val(txt).css({ "color": "#adadad" });
    
    $(element).blur(function () {
        var t = $(this).val();
        if ($.trim(t) === "") {
            $(this).val(txt).css({ "color": "#adadad" });
        }
    });

    $(element).focus(function () {
        var t = $(this).val();
        $(this).css({ "color": "#000" });
        if ($.trim(t) === txt) {
            $(this).val('');
        }
    });
}
