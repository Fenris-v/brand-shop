var pathToSmall, pathToBig;

window.onload = function () {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'images.json', true);
    xhr.send();

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return;

        if (xhr.status !== 200) {
            alert(xhr.status + ': ' + xhr.statusText);
        } else {
            var answer = JSON.parse(xhr.responseText);
            pathToBig = answer.pathToBig;
            pathToSmall = answer.pathToSmall;
            craftImages(answer.inages);
        }
    };

    var thumbnailsPanel = document.getElementsByClassName('small');
    thumbnailsPanel.addEventListener('wheel', function (e) {
        e = e || window.event;
        var delta = e.delay || e.detail || e.wheelDelta;
        thumbnailsPanel.scrollLeft = thumbnailsPanel.scrollLeft + delta;
        e.preventDefault() ? e.preventDefault() : (e.returnValue = false);
    });
};

function craftImages(images) {
    var slider = document.getElementsByClassName('small');

    for (var image in images) {
        var img = document.createElement('img');
        img.src = pathToSmall + images[image];

        img.onerror = function () {
            // TODO: change image
            img.src = 'php.jpg';
        };

        img.dataset.path = pathToBig + images[image];
        slider.appendChild(img);
        img.addEventListener('click', setImg);
    }
}

function setImg() {
    var slider = document.getElementsByClassName('big');
    previewImgToggle();
    var img = this;
    setTimeout(function () {
        slider.style.backgroundImage = 'url(' + img.dataset.path + ')'
    }, 250);
    setTimeout(previewImgToggle, 500);
}

function previewImgToggle() {
    var img = document.getElementsByClassName('big');
    if (img.style.opacity === '0') {
        img.style.opacity = '1';
    } else {
        img.style.opacity = '0';
    }
}