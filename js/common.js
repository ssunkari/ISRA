// JavaScript Document
/* jQuery Code For Header Slogan And Testimonials Fader */

$(document).ready(
	function(){
		if ($('ul#testimonials').length) {
			$('ul#testimonials').innerfade({
				speed: 1000,
				timeout: 10000,
				type: 'sequence',
				containerheight: '130px'
			});
			$(".testi").show();
		}
		
		if ($('ul#slogans').length) {
			$('ul#slogans').innerfade({
				speed: 1000,
				timeout: 8000,
				type: 'sequence',
				containerheight: '150px'
			});
			$(".banner_slogan").show();
		}
		
		if ($('ul#facts').length) {
			$('ul#facts').innerfade({
				speed: 1000,
				timeout: 8000,
				type: 'sequence',
				containerheight: '105px'
			});
			$(".facts_container").show();		
		}
});

/* Code For Top Navagation */
ddsmoothmenu.init({
	mainmenuid: "smoothmenu1", //menu DIV id
	orientation: 'h', //Horizontal or vertical menu: Set to "h" or "v"
	classname: 'ddsmoothmenu', //class added to menu's outer DIV
	//customtheme: ["#1c5a80", "#18374a"],
	contentsource: "markup" //"markup" or ["container_id", "path_to_menu_file"]
})

/* Code For Go To Country Specific Page */
$(function() {       // bind change event to select
	$('#dd_countries').bind('change', function () {
		var url = $(this).val(); // get selected value
		if (url)
		{
			window.location = url; // redirect
		}
		return false;
	});
});


window.openRegister = function (url, caption) {
    postToUrl(url, { cid: "0", ids: "0" });
}


function postToUrl(url, params, newWindow) {
    var form = $('<form>');
    form.attr('action', url);
    form.attr('method', 'POST');
    if (newWindow) { form.attr('target', '_blank'); }

    var addParam = function (paramName, paramValue) {
        var input = $('<input type="hidden">');
        input.attr({ 'id': paramName,
            'name': paramName,
            'value': paramValue
        });
        form.append(input);
    };

    // Params is an Array.
    if (params instanceof Array) {
        for (var i = 0; i < params.length; i++) {
            addParam(i, params[i]);
        }
    }

    // Params is an Associative array or Object.
    if (params instanceof Object) {
        for (var key in params) {
            addParam(key, params[key]);
        }
    }

    // Submit the form, then remove it from the page
    form.appendTo(document.body);
    form.submit();
}