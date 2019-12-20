window.onload = function () {
    mjson('headerMenu.json', function (result) {
            showMenu(JSON.parse(result));
        },
        null);

    function showMenu(items) {
        var menu = new Menu({class: "mainMenu__link", items: items});

        menu.attach('.mainMenu');
    }
};

