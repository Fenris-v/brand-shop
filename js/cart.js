var cartNotEmpty = false;

$(document).ready(function () {

    var cart = new Cart('cart');

    if (cart.cartItems.length > 0 && !cartNotEmpty) {
        cartNotEmpty = true;
        createCart();
        console.log(123);
    }


    // cart.render($('.test'));

    // console.log(cart.cartItems);


    $('.items__list').on('click', function (event) {
        // console.log(cart.cartItems);

        if (!cartNotEmpty) {
            createCart();
            console.log(321);
        }

        var elem = $(event.target);

        if (elem.prop('tagName') === "SPAN") elem = elem.parent();

        if (!elem.hasClass('btn__buy')) return;

        event.preventDefault();

        var item = elem.parents('.item');
        var idProduct = parseInt(item.attr('data-id'));
        var price = parseFloat(item.children('.item__price').text().trim().slice(1));
        var img = elem.parent().children('img').attr('src');
        var titleProduct = item.children('a').text().trim();

        cart.add(idProduct, titleProduct, price, img);
    });
});

function Cart(idCart) {
    this.id = idCart;
    this.htmlCode = '';

    this.countItems = 0;
    this.amount = 0;
    this.cartItems = [];

    this.loadCartItems();
}

Cart.prototype.loadCartItems = function () {
    var appendId = '#' + this.id + 'items';

    $.get({
        url: 'cart.json',
        dataType: 'json',
        context: this,
        success: function (data) {
            var cartData = $('<div />', {
                id: 'cart_data'
            });

            this.countItems = data.items.length;
            this.amount = data.amount;

            cartData.appendTo('<p>Всего товаров: ' + this.countGoods + '</p>');
            cartData.appendTo('<p>Общая сумма: ' + this.amount + '</p>');

            cartData.appendTo(appendId);

            for (var key in data.cart) {
                this.cartItems.push(data.cart[key]);
            }
            this.renderItemList();
        }
    });
};

Cart.prototype.add = function (idProduct, title, price, image) {
    var cartItem = {
        "id_product": idProduct,
        "title": title,
        "price": price,
        "image": image
    };
    this.countItems++;
    this.amount += price;
    console.log(price);
    console.log(this.amount);
    this.cartItems.push(cartItem);
    this.refresh();
};

Cart.prototype.refresh = function () {
    var cartData = $('#cart_data');
    cartData.empty();
    cartData.append('<p>Всего товаров: ' + this.countItems + '</p>');
    cartData.append('<p>Общая сумма: ' + this.amount + '</p>');
    this.renderItemList();
};

Cart.prototype.renderItemList = function () {
    var cartItemsDiv = $('.cart__items__list tbody');

    cartItemsDiv.empty();
    for (var key in this.cartItems) {
        var cartItemsRow = $('<tr><td><img src="' + this.cartItems[key].image + '"></td><td><div class="cart__items__list__item__title">' + this.cartItems[key].title + '</div><div class="cart__items__list__item__price">$' + this.cartItems[key].price + '</div></td><td>' + this.cartItems[key].id_product + '</td></tr>');

        cartItemsRow.appendTo(cartItemsDiv);
    }
};

function createCart() {
    var cartContainer = $('.cart');
    var createCart = $('<div class="cart__items"><table class="cart__items__list"><thead><tr class="cart__items__list__title"><td>image</td><td>desc</td><td>quantity</td><td></td></tr></thead><tbody></tbody></table></div>');

    createCart.appendTo(cartContainer);
}