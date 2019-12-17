$(document).ready(function () {
    /**
     * FEEDBACK SLIDER
     */
    $("#feedback__slider").owlCarousel(
        {
            dots: true,
            loop: true,
            margin: 10,
            nav: false,
            autoplay: false,
            autoplayTimeout: 3000,
            autoplayHoverPause: true,
            responsiveClass: false,
            responsive: {
                0: {
                    items: 1,
                    nav: false,
                }
            }
        }
    );

    /**
     * SINGLE SLIDER
     */
    $("#arrivalsSlider").owlCarousel(
        {
            dots: false,
            loop: true,
            margin: 10,
            navText: ["", ""],
            autoplay: false,
            autoplayTimeout: 3000,
            autoplayHoverPause: true,
            responsiveClass: false,
            responsive: {
                0: {
                    items: 1,
                    nav: false,
                }
            }
        }
    );

    /**
     * ACCORDION
     */
    var items = $('.sideMenu__list__items');
    var title = $('.sideMenu__list__title');

    title.on("click", function () {
        items.stop(true, true);
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            items.slideUp();
        } else {
            title.removeClass('active');
            items.slideUp();
            $(this).addClass('active')
                .next().slideToggle();
        }
        return false;
    });
});