$(document).ready(function () {

    $('.menu-toggle-inner').on('click', function (e) {
        $('.adaptive-menu-toggle').toggleClass('adaptive-menu-toggle--open');
        $('.headerNav_adaptive').toggleClass('header_opened');
    });
});