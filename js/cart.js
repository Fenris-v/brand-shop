var totalPrice,
    cartList,
    mouseOverCart = false;

$(document).ready(function () {

    var cart = new Cart();

    $('.items__list').on('click', function (event) {

        var elem = $(event.target);

        if (elem.prop('tagName') === "SPAN") elem = elem.parent();

        if (!elem.hasClass('btn__buy')) return;

        event.preventDefault();

        var item = elem.parents('.item'),
            idProduct = parseInt(item.attr('data-id')),
            price = parseFloat(item.children('.item__price').text().trim().slice(1)),
            img = elem.parent().children('img').attr('src'),
            titleProduct = item.children('a').text().trim();

        cart.add(idProduct, titleProduct, price, img);
    });

    var cartContainer = $('.cart');

    cartContainer.on('mouseover', function () {
        mouseOverCart = true;
    });

    cartContainer.on('mouseout', function () {
        mouseOverCart = false;
    });

    cartContainer.on('click', 'tr', function (event) {
        var target = $(event.target),
            index = target.parents('tr').index();

        if (target.hasClass('plusBtn') || target.parents('a').hasClass('plusBtn')) {
            cartList[index].quantity++;
            cart.renderItemList();
        } else if (target.hasClass('minusBtn') || target.parents('a').hasClass('minusBtn')) {
            if (cartList[index].quantity <= 1) {
                cartList.splice(index, 1);
                if (cartList.length === 0) mouseOverCart = false;
                cart.renderItemList();
            } else {
                cartList[index].quantity--;
                cart.renderItemList();
            }
        } else if (target.hasClass('deleteBtn') || target.parents('a').hasClass('deleteBtn')) {
            cartList.splice(index, 1);
            if (cartList.length === 0) mouseOverCart = false;
            cart.renderItemList();
        }
    });

});

function Cart() {
    this.cartItems = [];

    this.loadCartItems();
}

Cart.prototype.loadCartItems = function () {
    $.ajax({
        type: 'GET',
        url: 'cart.json',
        dataType: 'json',
        data: {
            id_product: "id_product",
            title: "title",
            price: "price",
            image: "image",
            href: "href",
            quantity: "quantity"
        },
        context: this,
        success: function (data) {

            this.cartItems = data.items;

            this.renderItemList(this.cartItems);
        }
    });
};

Cart.prototype.add = function (idProduct, title, price, image, quantity) {
    var cartItem = {
        "id_product": idProduct,
        "title": title,
        "price": price,
        "image": image,
        "quantity": 1
    };

    for (var i = 0; i < this.cartItems.length; i++) {
        if (parseInt(this.cartItems[i].id_product) === parseInt(cartItem.id_product)) {
            this.cartItems[i].quantity++;
            this.renderItemList();
            $('.itemAdded').stop(true, true).fadeIn().delay(500).fadeOut();
            return;
        }
    }

    this.cartItems.push(cartItem);
    this.renderItemList();
    $('.itemAdded').stop(true, true).fadeIn().delay(500).fadeOut();
};

Cart.prototype.renderItemList = function () {

    var cartItems = $('.cart__items');

    totalPrice = 0.00;

    cartItems.remove();
    if (this.cartItems.length !== 0) this.createCart();

    var cartItemsDiv = $('.cart__items__list tbody');

    cartList = this.cartItems;

    cartItemsDiv.empty();
    for (var key in this.cartItems) {
        var cartItemsRow = $('<tr><td><img alt="image" src="' + this.cartItems[key].image + '"></td><td><div class="cart__items__list__item__title" data-id="' + this.cartItems[key].id_product + '">' + this.cartItems[key].title + '</div><div class="cart__items__list__item__price">$' + parseFloat(this.cartItems[key].price).toFixed(2) + '</div></td><td class="cart__items__list__item__quantity"><a class="quantityBtn minusBtn" href="#"><i class="fas fa-minus-circle"></i></a> ' + this.cartItems[key].quantity + ' <a class="quantityBtn plusBtn" href="#"><i class="fas fa-plus-circle"></i></td><td><a href="#" class="quantityBtn deleteBtn"><i class="fas fa-times-circle"></i></a></td></tr>');

        cartItemsRow.appendTo(cartItemsDiv);

        totalPrice += (parseFloat(this.cartItems[key].price) * parseInt(this.cartItems[key].quantity));
    }

    var totalPriceContainer = $('<div class="cart__totalPrice"><span>Total:</span> $' + totalPrice.toFixed(2) + '</div>');
    totalPriceContainer.appendTo($('.cart__items'));
};

Cart.prototype.createCart = function () {
    var cartContainer = $('.cart');
    var createCart = $('<div class="cart__items"><table class="cart__items__list"><thead><tr class="cart__items__list__title"><td>image</td><td>desc</td><td>quantity</td><td></td></tr></thead><tbody></tbody></table></div>');

    createCart.appendTo(cartContainer);
    if (!mouseOverCart) $('.cart__items').fadeOut(0);
};