$(document).ready(function () {

    var cart = new Cart('cart');
    cart.render($('.test'));
    console.log(cart.cartItems);
    console.log(cart);

    $('.items__list').on('click', function (event) {

        var elem = $(event.target);

        if (elem.prop('tagName') === "SPAN") elem = elem.parent();

        if (!elem.hasClass('btn__buy')) return;

        event.preventDefault();

        var item = elem.parents('.item');
        var idProduct = parseInt(item.attr('data-id'));
        var price = parseFloat(item.children('.item__price').text().trim().slice(1));
        var img = elem.parent().children('img').attr('src');
        var titleProduct = item.children('a').text().trim();
        console.log(idProduct);
        console.log(titleProduct);
        console.log(cart.amount);
        console.log(123);

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

Cart.prototype.render = function (root) {
    // var cartDiv = $('<div />', {
    //     id: this.id,
    //     text: 'Cart'
    // });
    //
    // var cartItemsDiv = $('<div />', {
    //     id: this.id + '__items',
    // });
    //
    // var cartItemsList = $('<table><thead><tr><td>Наименование</td><td>Цена</td><td>Удалить</td></tr></thead><tbody id="' + this.id  + '_list"></tbody></table>');
    //
    // cartItemsDiv.appendTo(cartDiv);
    // cartItemsList.appendTo(cartItemsDiv);
    // cartDiv.appendTo(root);
    // var cartItemContainer = $('.cart__items__list tbody');
    //
    // var cartItem = $('<tr><td><img src="' + this + '"></td><td></td><td></td><td>del</td></tr>')
};

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
    cartData.empty(); //Очищаем содержимое контейнера
    cartData.append('<p>Всего товаров: ' + this.countItems + '</p>');
    cartData.append('<p>Общая сумма: ' + this.amount + '</p>');
    this.renderItemList();
};

Cart.prototype.renderItemList = function () {
    var cartItemsDiv = $('.cart__items__list tbody');
    cartItemsDiv.empty();
    for (var key in this.cartItems)
    {
        var cartItemsRow = $('<tr><td><img src="' + this.cartItems[key].image + '"></td><td><div class="cart__items__list__item__title">' + this.cartItems[key].title + '</div><div class="cart__items__list__item__price">$' + this.cartItems[key].price + '</div></td><td>' + this.cartItems[key].id_product + '</td></tr>');

        // var $delButton = $('<button />', {
        //     class: this.id +'__delete',
        //     'data-index': key,
        //     text: 'del'
        // });
        // cartItemsRow.append($('<td />').append($delButton));
        cartItemsRow.appendTo(cartItemsDiv);
    }
};