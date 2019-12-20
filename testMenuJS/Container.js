function Container(attrs) {
    this.htmlCode = '';
    this.el = document.createElement('div');
    this.attributes = attrs ? attrs : [];

    if (this.attributes.id) {
        this.el.setAttribute('id', this.attributes.id);
    }

    if (this.attributes.class) {
        this.el.classList.add(this.attributes.class)
    }

}

Container.prototype.attach = function (newEl) {
    document.querySelector(newEl).appendChild(this.el);
    this.render();

    return this;
};

Container.prototype.render = function () {
    this.html = this.template(this.attributes);
    this.el.innerHTML = this.html;
    return this.el;
};

Container.prototype.remove = function () {
    this.el.remove();
};

Container.prototype.template = function () {
    return '';
};