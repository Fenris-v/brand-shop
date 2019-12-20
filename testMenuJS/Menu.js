function Menu(attrs) {
    Container.call(this, attrs);

    this.items = attrs.items ? attrs.items : [];

    this.el = document.createElement("ul");
    this.el.classList.add(attrs.class);
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.constructor = Menu;

Menu.prototype.renderChildren = function () {
    for (var i = 0; i < this.items.length; i++) {
        var item = this.getChildren(this.items[i]);

        if (item instanceof MenuItem) {
            item.render();
            this.el.appendChild(item.el);
        }
    }
};

Menu.prototype.render = function () {
    this.renderChildren();
    return this.el;
};

Menu.prototype.getChildren = function (item) {
    if (item.menu) {
        return new Submenu(item);
    }
    return new MenuItem(item);
};