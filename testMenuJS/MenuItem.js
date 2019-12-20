function MenuItem(attrs) {
    Container.call(this, attrs);

    this.el = document.createElement('li');
    this.el.classList.add("mainMenu__link");

    if (!this.attributes.href)
        this.attributes.href = "#";

    if (!this.attributes.title)
        this.attributes.title = '';
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;

MenuItem.prototype.template = function (attrs) {
    return '<a href="' + attrs.href + '" class="' + attrs.class + '">' + attrs.title + '</a>';
};