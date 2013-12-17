/*country codes*/
var Countries = new Object();
Countries.Australia = 12;
Countries.NewZealand = 181;
Countries.UK = 240;
Countries.USA = 242;
Countries.Canada = 39;
Countries.All = -1;
/*end country codes*/

/*----IN PRESS----*/
var pageNo = 0;
var totalPages = 0;
var pageSize = 8;
var currentAjaxRequest;
function CreateNewsList(res) {
    var items = [], empty = res.Empty, i, j, k, l, n, item;

    if (empty === "1") {
        items.push('<li><p><strong>no data found</strong></p></li>');
    }
    else {
        var l = res.Items.length, n = 0;
        for (i = 0; i < l; i++) {
            item = res.Items[i];
            items.push('<li style="float:left; width:48%; margin-right:10px;"><a target="_blank" href="' + item.LinkPdf + '"><p class="heading">' + item.PDate + '&nbsp;<span style="font-size: 12px; text-transform: uppercase;">' + item.Publication + '</span></p><p style="height:35px;">' + item.Title + '</p></a></li>');
        }
        //for (i = 0; n < l && i < 5; i += 1) {
//            j = 0;
//            for (k = 0; k < 3 && n < l; k++) {
//                item = res.Items[i + j];
//                items.push('<li style="float:left; width:47%; margin-right:10px;"><a target="_blank" href="' + item.LinkPdf + '"><p class="heading">' + item.PDate + '&nbsp;<span style="font-size: 12px; text-transform: uppercase;">' + item.Publication + '</span></p><p style="height:35px;">' + item.Title + '</p></a></li>');
//                n++;
//                j += 5;
//            }
//        }
        
    }

    totalPages = res.Total * 1;
    pageSize = res.PageSize * 1;

    $('#lstInPress').empty();
    $('#lstInPress').append(items.join(''));
	$('#scrollbar1').tinyscrollbar({ });
    FixButtons();
}

function FetchData(i) {
    pageNo += i;
    if ((pageNo && totalPages && pageSize)
    && (
        (pageNo > Math.ceil(totalPages / pageSize) ||
        pageNo <= 0)
       )) {
        FixButtons();
        if (pageNo <= 0)
            pageNo = 0;
        else if (pageNo > Math.ceil(totalPages / pageSize))
            pageNo = Math.ceil(totalPages / pageSize);
    } else {
        var url = "services/InPressService.ashx?pageNo=" + pageNo;
        callAjax(url, RequestTypePost, ContentTypeJson, DataTypeJson, EmptyJson, CreateNewsList);
    }
}

function FixButtons() {
    if (pageNo > 1)
        $("div#btnPrev1").css({ 'visibility': 'visible' });
    else
        $("div#btnPrev1").css({ 'visibility': 'hidden' });

    if (pageNo > Math.ceil(totalPages / pageSize))
        $("div#btnNext1").hide();
    else
        $("div#btnNext1").show();
}

function setupInPress() {
    $("div#btnPrev1 a").click(function () { FetchData(-1); /*PrevClick();*/ });
    $("div#btnNext1 a").click(function () { FetchData(1); /*NextClick();*/ });
    //NextClick();
    FetchData(1);
}

/*----END IN PRESS----*/


/* ------------INPRESS FOR HOME PAGE------------*/
function FetchDataHome() {
    pageNo = 1;
    var url = "services/InPressService.ashx?pageNo=" + pageNo;
    callAjax(url, RequestTypePost, ContentTypeJson, DataTypeJson, EmptyJson, CreateNewsListHome);
}

function CreateNewsListHome(res) {
    var items = [];
    var empty = res.Empty;
    var cnt = 0;
    if (empty === "1") {
        items.push('<li><p><strong>no data found</strong></p></li>');
    }
    else {
        $.each(res.Items, function (i, item) {
            if (cnt == 2) return;
            items.push('<li><a target="_blank" href="' + item.LinkPdf + '"><p class="heading">' + item.PDate + '' + item.Publication + '</p><br /><span class="title">' + item.Title + '</span></a></li>');
            cnt++;
        });
    }

    $('#lstInPressHome').empty();
    $('#lstInPressHome').append(items.join(''));
}
/*----END OF INPRESS FOR HOME PAGE------------*/

/*----WHATS NEW LIST----*/
var hiddenSpan;
function CreateWhatsNewList(res) {
    var empty = res.Empty;
    var empty = res.Empty;
    var cnt = 0;
    if (empty === "1") {
        items.push('<p><strong>no data found</strong></p>');
    }
    else {
        var items = [], litem = '', t='';
        $.each(res.Items, function (i, item) {
            //@A AmanTur(12Dec2011) - show pdf link if descripti0n is empty. show normal link otherwise
            //@A AmanTur(13Dec2011) - added image for items without any description, but having pdf link
            //@A AmanTur(13Dec2011:1700) will show content of pdf in lightbox. no need for links and description stuff
            /*if (item.Description === "") {
            if (item.LinkPdf && item.LinkPdf !== null && item.LinkPdf !== "")
            litem = '<li> <p>' + item.PubDate + '<a name="' + i + '></a>"<a href="#' + i + '" style="cursor:default">' + item.Title + '</a>&nbsp;<a target="_blank" href="' + item.LinkPdf + '"><img src="/images/view_pdf.jpg" alt="open pdf in new window" style="border:0;height:12px;width:16px;"/>&nbsp;view pdf</a></p></li>';
            else
            litem += '<a name="' + i + '></a>"<a href="#' + i + '" style="cursor:default">' + item.Title + '</a></p></li>'; //don't link with target=_blank if no pdf link @A AmanTur(12Dec20211)
            }
            else {
            litem = '<li class="whatsNewLi"> <p>' + item.PubDate + ' <a href="#">' + item.Title + '<span>&nbsp;...</span></a></p><div class="desc" style="float: left; clear: both; text-align: left; margin:0 0 10px 72px;display:none;">' + item.Description;
            if (item.LinkPdf && item.LinkPdf !== null && item.LinkPdf !== "")
            litem += '&nbsp;&nbsp;<a target="_blank" href="' + item.LinkPdf + '"><img src="/images/view_pdf.jpg" alt="open pdf in new window" style="border:0;height:12px;width:16px;"/>view pdf</a>';

            litem += '</div></li>';

            // items.push('<li class="whatsNewLi"> <p>' + item.PubDate + ' <a href="#">' + item.Title + '<span> ...</span></a></p><div class="desc" style="float: left; clear: both; text-align: left; margin:0 0 10px 72px;display:none;">' + item.Description
            //+ (item.LinkPdf && item.LinkPdf !== null && item.LinkPdf !== "" ? '&nbsp;&nbsp;<a target="_blank" href="' + item.LinkPdf + '"><img src="/images/view_pdf.jpg" alt="open pdf in new window" style="border:0;height:12px;width:16px;"/> view pdf</a>' : '')
            //+ '</div></li>');
            }*/
            t = item.Title;
            if (t.length > 75) {
                t = t.substring(0, 75);
                t = t.substring(0, t.lastIndexOf(' '))+'...';
            }


            items.push('<h3 class="whatsnew"><a href="#"><span class="dateTitle">' + item.PubDate + '</span>' + item.Title + '</a></h3><div class="whatsnew"><p>' + item.Description + '</p></div>');


//            if (item.LinkPdf && item.LinkPdf !== null && item.LinkPdf !== "") {
//                litem = '<li class="whatsNewLi"><p><a href="' + item.LinkPdf + '" title="' + t + '">' + item.PubDate + '<br /><strong>' + item.Title + '</strong><br/>' + item.desc_text + ' ... read more </a></li>';
//            }
//            else {
//                litem = '<li class="whatsNewLi"><p><a href="#" onclick="return false;" title="' + t + '">' + item.PubDate + '<br /><strong>' + item.Title + '</strong><br/>' + item.desc_text + ' ... read more </a></li>';
//            }


            items.push(litem);
        });

        $('#accordion').html(items.join('')); //append(items.join(''));//@C AmanTur(13Dec2011) append causing problems in IE8
		//$('#lstWhatsNew').html(items.join('')); //append(items.join(''));//@C AmanTur(13Dec2011) append causing problems in IE8
		$("#accordion").accordion({ autoHeight: false });
    }

    /*$("li.newsLi > p > a", $("#accordion")).click(function () {
        var $d = $(this).parents("li.newsLi").find("div.desc");
        var showing = $d.css("display");

        if (hiddenSpan && hiddenSpan !== null && (typeof hiddenSpan !== "undefined")) {
            $(hiddenSpan).show();
        }

        hiddenSpan = $d.prev("p").find("span.des1");

        $("div.desc", $("#accordion")).slideUp('slow');

        if (showing !== "block") {
            $d.show('fast');
            $(hiddenSpan).hide();
        }
        else {
            $(hiddenSpan).show();
        }
        return false;
    });*/

//    $("li.whatsNewLi > p > a", $("#lstWhatsNew")).click(function () {
//        var url = $(this).attr("href");
//        if (url === "#") return false;

//        url += "?keepThis=true&width=556&height=397&TB_iframe=true&closeOnEscape=false";
//        var cap = $(this).attr("title");
//        tb_show(cap, url, false);
//        $("#TB_overlay").unbind();
//        return false;
//    });

     //@C AmanTur(13Dec2011) - Not needed anymore. showing contents in lightbox.
  
    /*$("li.whatsNewLi > p > a", $("#lstWhatsNew")).click(function () {
    var $d = $(this).parents("li.whatsNewLi").find("div.desc");
    var showing = $d.css("display");
    $("div.desc", $("#lstWhatsNew")).slideUp('fast');
    $("li.whatsNewLi > p > a > span", $("#lstWhatsNew")).show();
    if (showing !== "block") {
    // $d.slideToggle('slow').effect('highlight',0);
    $d.slideDown('fast');
    $(this).find("span").hide();
    }
    return false;
    });*/

}

function BuildWhatsNewList(cId) {
    var url = "../services/WhatsNewService.ashx?countryId=" + cId;
    callAjax(url, RequestTypePost, ContentTypeJson, DataTypeJson, EmptyJson, CreateWhatsNewList);
}

function BuildWhatsNewList_all(cId) {
    var url = "services/WhatsNewService.ashx?countryId=" + cId;
    callAjax(url, RequestTypePost, ContentTypeJson, DataTypeJson, EmptyJson, CreateWhatsNewList);
}

/*----END OF WHATS NEW LIST----*/


/*----LIST OF INSTITUTES----*/
function CreateInstititeList(res) {
    var items = [];
    $.each(res, function (i, item) {
        items.push('<li><a nohref="' + item.ImageName + '">' + item.InstituteName + '</a></li>');
    });
    $('#instList').append(items.join(''));

    $("ul.whatsnew1 li a").hover(function () {
        var mainImage = $(this).attr("nohref"); //Find Image Name
        $("#main_view img").attr({ src: mainImage });
        return false;
    });
    //$('#scrollbar1').tinyscrollbar({ sizethumb: 60 });
}

function buildInstititeList(cId) {
    var url = "../services/InstituteListService.ashx?countryId=" + cId;
    callAjax(url, RequestTypePost, ContentTypeJson, DataTypeJson, EmptyJson, CreateInstititeList);
}
/*----END LIST OF INSTITUTES----*/

/*----INTERVIEW----*/
function setupInterview(cId, cityid) {
    var dt=$("#interviews").dataTable({
        "aoColumnDefs": [
                    { "bVisible": false, "aTargets": [1, 4, 5, 7] },
                    { "fnRender": function (o) { return "<input type='checkbox' id='chk_" + o.aData[1] + "'style='margin-top:1px; margin-left: 5px;' value='' />"; }, "aTargets": [0] },
                    { "sWidth": "50px", "aTargets": [0] },
                    { "sWidth": "100px", "aTargets": [2] },
                    { "sWidth": "170px", "aTargets": [3] },
                    { "sWidth": "100px", "aTargets": [4] }
                    ],
        "bFilter": false,
        "bSort": false,
        "bInfo": false,
        "bDestroy": true,
        "bPaginate": false,
        "sEmptyTable": "no interviews scheduled in near feature",
        "sZeroRecords": "no interviews scheduled in near feature",
        "sScrollY": "auto",
        "sAjaxSource": "../services/InterviewService.ashx?countryId=" + cId + "&city_fk=" + cityid
    });
    //dt.oSettings.oLanguage.sEmptyTable = "no interviews scheduled in near feature";
    dt.dataTableSettings[0].oLanguage["sEmptyTable"] = "There are no interviews scheduled for the next three weeks. However, you can still register with us and start your journey to study overseas. Click register below to proceed with registration process.";
}

function setupInterview_event(cId,cityid) {
    var dt = $("#interviews").dataTable({
        "aoColumnDefs": [
                    { "bVisible": false, "aTargets": [1, 4, 5, 7] },
                    { "fnRender": function (o) { return "<input type='checkbox' id='chk_" + o.aData[1] + "'style='margin-top:1px; margin-left: 5px;' value='' />"; }, "aTargets": [0] },
                    { "sWidth": "50px", "aTargets": [0] },
                    { "sWidth": "150px", "aTargets": [2] },
                    { "sWidth": "250px", "aTargets": [3] },
                    { "sWidth": "150px", "aTargets": [4] }
                    ],
        "bFilter": false,
        "bSort": false,
        "bInfo": false,
        "bPaginate": false,
        "bDestroy":true,
        "sEmptyTable": "no interviews scheduled in near feature",
        "sZeroRecords": "no interviews scheduled in near feature",
        "sScrollY": "auto",
        "sAjaxSource": "../services/InterviewService.ashx?countryId=" + cId + "&city_fk=" + cityid
    });
    //dt.oSettings.oLanguage.sEmptyTable = "no interviews scheduled in near feature";
    dt.dataTableSettings[0].oLanguage["sEmptyTable"] = "There are no interviews scheduled for the next three weeks. However, you can still register with us and start your journey to study overseas. Click register below to proceed with registration process.";    
}

/*----END INTERVIEW----*/

var ContentTypeJson = "application/json; charset=utf-8";
var DataTypeJson = "json";
var RequestTypePost = "POST";
var EmptyJson = "{}";

function callAjax(url, type, ctype, dtype, dta, callBack, errCallback, isSync) {
    if (currentAjaxRequest)
        currentAjaxRequest.abort();

    isSync = isSync || false;

    currentAjaxRequest = $.ajax({
        url: url,
        type: type,
        contentType: ctype,
        dataType: dtype,
        data: dta,
        async: !isSync,
        success: function (res) {
            var r;
            if (res.hasOwnProperty("d"))
                r = res.d;
            else r = res;
            callBack(r);
        },
        error: function (a, b, c) {
            if (errCallback && typeof (errCallback) == "function") {
                errCallback(a, b, c);
            } else {
                alert(b);
            }
        }
    });
}

/*-----------------------------------------------------------------------------------REGISTER BUTTON HANDLER*/
function wireRegisterButton(regButtonId, interviewTable) {
    var url = "/registerforinterview.aspx?cid=" + cid;
    var caption = "Register For Interview";

    regButtonId = regButtonId[0] === "#" ? regButtonId : "#" + regButtonId;
    interviewTable = interviewTable || "#";
    interviewTable = interviewTable[0] === "#" ? interviewTable : "#" + interviewTable;

    tb_init("#btnRegister");
    $(regButtonId).unbind("click");

    $("#btnRegister").bind("click", function () {
        $table = $(interviewTable);
        if ($table && $table.length > 0) {
            var selIds = [];
            var chks = $("tbody tr td:first-child input", $table);
            //$("table" + interviewTable + " tbody tr td:first-child input")
            $.each(chks, function (i, item) {
                if ($(item).is(":checked"))
                    selIds.push($(item).attr("id").replace(/chk_/ig, ""));
            });
            var ids = (selIds.join(','));

            if (ids === "" && chks.length > 0) {
                tb_show("no interview(s) selected", "#TB_inline?inlineId=dvAlert&height=40&width=250", false);
                return false;
            }
            url += "&ids=" + ids + "&keepThis=true&width=556&height=397&TB_iframe=true&closeOnEscape=false";
        }
        else {
            url += "&keepThis=true&width=556&height=397&TB_iframe=true&closeOnEscape=false";
        }
        tb_show(caption, url, false);
        $("#TB_overlay").unbind();
    });
}
/*-----------------------------------------------------------------------------------END REGISTER BUTTON HANDLER*/

/*-----------------------------------------------------VALIDATIONS*/
function validateSelect(a) {
    var val = $(a).val();
    var r = val && val.length > 0;

    if ($(a).find("option").length > 1) {
        r &= (val !== "-1");
    }
    else {
        r = true; //if no options then consider this as true
    }
    showError(a, !r);
    return r;
}

function validateDate(a, s) {
    s = s || "/"; //default date separator will be /
    var m = "rquired";
    var v = $(a).val();
    var r = true;
    if (!v || $.trim(v) === "") {
        r = false;
    }
    else {
        var ar = v.split(s);
        if (ar.length != 3) {
            r = false;
            m = "invalid date";
        }
        else {
            var d = new Date();
            d.setDate(ar[0]);
            d.setMonth(ar[1] * 1 - 1);
            d.setYear(ar[2]);
            if (d && d !== NaN) {
                r = true;
            }
            else {
                r = false;
                m = "invalid date";
            }
        }
    }
    showError(a, !r, m);
    return r;
}

function validateRequired(a, minlength, maxlength) {
    var m = "required";
    var v = $(a).val();
    var r = true;
    var d = $(a).attr("default-title");
    if (v) {
        v = $.trim(v);
        r = v.length > 0 && v != d;

        if (minlength || maxlength) {
            if (minlength && v.length < minlength) {
                r = false;
                m = "atleast " + minlength + " characters are rquired";
            }
            else if (maxlength && v.length > maxlength) {
                f = false;
                m = "only " + maxlength + " characters are allowed";
            }
        }
    }
    else {
        r = false;
    }
    showError(a, !r);
    return r;
}

function validateNumber(a, min, max) {
    var v = $(a).val();

    var r = true;
    var m = "required";

    if (!v || $.trim(v) === "") {
        r = false;
    }
    else {
        r = /^-?(?:\d+|\d{1,10}(?:,\d{2})+)(?:\.\d+)?$/.test(v);

        if (r === true) {
            if (min || max) {
                if (min && v * 1 < min * 1) {
                    r = false;
                    m = "value should be greater than " + min;
                }
                else if (max && v * 1 > max * 1) {
                    r = false;
                    m = "value should be less than " + max;
                }
            }
            else {
                m = 'only digits are allowed';
            }
        }
    }
    showError(a, !r, m);

    return r;
}

function validateDigits(a, min, max) {
    var v = $(a).val();

    var r = true;
    var m = "required";

    if (!v || $.trim(v) === "") {
        r = false;
    }
    else {
        r = /^\d+$/.test(v);

        if (r === true) {
            if (min || max) {
                if (min && v * 1 < min * 1) {
                    r = false;
                    m = "value should be greater than " + min;
                }
                else if (max && v * 1 > max * 1) {
                    r = false;
                    m = "value should be less than " + max;
                }
            }
        }
        else {
            m = 'only digits are allowed';
        }
    }
    showError(a, !r, m);

    return r;
}

function showError(a, t, m) {
    var $div = $(a).parent().parent().find("div.fieldLabel");
    var $exist = $div.find("span.error[for='" + a + "']");
    if (t) {
        //show error
        if ($exist && $exist.length > 0) {
            $($exist[0]).show();
        }
        else {
            var error = $("<span class='error'></span>").attr("title", m || "required").attr("for", a).html("&nbsp;");
            error.appendTo($div);
        }
    }
    else {
        if ($exist && $exist.length > 0)
            $($exist[0]).hide();
    }
}
/*end validations*/

/* testimonial*/

function FetchTestimonialData(countryid) {
    pageNo = 1;
    var url = "services/testimonial.ashx?countryid=" + countryid;
    callAjax(url, RequestTypePost, ContentTypeJson, DataTypeJson, EmptyJson, CreatetestimonialList, TestimonialListErrHandler, true);
}

function CreatetestimonialList(res) {
    var items = [];
    var items1 = [];
    $.each(res, function (i, item) {
        items.push(item.Url + "||");
    });
    var joineditem = items.join('');
    copyArr0 = joineditem.substring(0, joineditem.length - 2);
   
    $.each(res, function (i, item1) {
        items1.push(item1.nurl + "||");
    });
    var joineditem1 = items1.join('');
    copyArr1 = joineditem1.substring(0, joineditem1.length - 2);
}

function TestimonialListErrHandler(a, b, c) {
    //alert(b + "\r\n" + c);
}

