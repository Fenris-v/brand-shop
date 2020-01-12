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
            autoplay: true,
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

    $('.sideMenu__list').on('click', function (event) {
        var target = $(event.target);

        if (!target.hasClass('sideMenu__list__title')) return;

        items.stop(true, true);
        if (target.hasClass('active')) {
            target.removeClass('active');
            items.slideUp();
        } else {
            title.removeClass('active');
            items.slideUp();
            target.addClass('active').next().slideToggle();
        }
        return false;
    });

    /**
     * SHOW MORE BUTTON
     */
    $('.items__link a').on('click', function (e) {
        e.preventDefault();
        $.ajax({
            type: "GET",
            url: "items.json",
            dataType: "json",
            data: {
                id_product: "id_product",
                title: "title",
                price: "price",
                img: "img",
                href: "href"
            },
            success: function (data) {
                $('.items__link').css({'display': 'none'});

                var itemsList = $('.items__list');

                for (var i = 0; i < data.items.length; i++) {
                    itemsList.append('<div class="item" />');
                    var item = $('.item').last();

                    item.attr('data-id', data.items[i].id_product);

                    item.append('<div class="item__img" />');
                    var itemImg = $('.item__img').last();

                    itemImg.append('<img src="' + data.items[i].img + '" alt="item">');
                    itemImg.append('<div class="item__img__cart" />');
                    itemImg.append('<a class="btn__buy" href="#"><span>Add to Cart</span></a>');

                    item.append('<a href="' + data.items[i].href + '">Mango People T-shirt</a>');

                    item.append('<div class="item__price">$' + parseFloat(data.items[i].price).toFixed(2) + '</div>');

                    if ($('.items__link a').parent().hasClass('items__paging__link')) {
                        $('.item').addClass('product');
                    }
                }
            }
        });
    });

    /**
     * CART HOVER
     */
    $('.cart').hover(function () {
        $('.cart__items').stop(true, true).fadeIn();
    }, function () {
        $('.cart__items').stop(true, true).fadeOut();
    });

    /**
     * VALIDATE FORM
     */
    $('#loginForm').validate({
        rules: {
            login__password: {
                required: true,
                minlength: 6
            },
            login__email: {
                required: false,
                email: true
            }
        },
        messages: {
            login__password: {
                required: '',
                minlength: 'Minimal length 6 symbols'
            },
            login__email: {
                required: '',
                minlength: '',
                email: ''
            },
            submitHandler: function (form) {
                form.submit();
            }
        }
    });

    /**
     * VALIDATE FORM
     */
    $('#coupon').mask('000-0000');
});