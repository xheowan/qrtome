'use strict';

$(function () {

    var siteurl = $('#siteurl').val();

    $.getJSON('/api/og?url=' + siteurl, function (resp) {
        console.log(resp);
    });
});

