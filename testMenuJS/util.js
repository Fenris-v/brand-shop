function mjson(url, done, error) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            return;
        }

        if (xhr.status === 200) {
            if (done instanceof Function) {
                done(xhr.responseText);
            }
        } else {
            console.log('Error', xhr.status, xhr.statusText);
            if (error instanceof Function) {
                error({code: xhr.status, text: xhr.statusText});
            }
        }
    }
}