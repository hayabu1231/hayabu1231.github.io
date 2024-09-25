function blogOpen(element) {
    element.addEventListener('click',function() {
        document.getElementById('blog-article').href = '/blog/post/no-' + this.dataset.blog;
        var url = new URL(window.location);
        url.hash = '#blog';
        url.searchParams.set('id', this.dataset.blog);
        window.history.pushState({}, '', url);
        document.getElementById('blog-screen').style.display = 'block';
        document.getElementById('blog-dialog').style.display = 'block';
    });
}

function blogClose() {
    document.getElementById('blog-article').src = '';
    document.getElementById('blog-screen').style.display = 'none';
    document.getElementById('blog-dialog').style.display = 'none';
    var url = new URL(window.location);
    url.hash = '#blog';
    url.searchParams.delete('id');
    window.history.pushState({}, '', url);
}

function onLoad() {/*
    document.getElementById("date").addEventListener('change',function(element) {
        document.getElementById("blog").dataset.date = document.getElementById("date").value;
    });*/
    var elements = document.getElementsByClassName('home-blog');
    elements = Array.from(elements);
    if (elements != undefined) {
        elements.forEach(blogOpen);
    }
    document.getElementById('blog-screen').addEventListener('click',blogClose);
    if (location.hash == '#blog' && location.search != null) {
    var search = location.search.slice(1).split('&');
        for (var i = 0; i < search.length; i++) {
            if (search[i].split('=')[0] == 'id') {
                document.getElementById('blog-article').src = '/blog/post/no-' + search[i].split('=')[1];
                document.getElementById('blog-screen').style.display = 'block';
                document.getElementById('blog-dialog').style.display = 'block';
            }
        }
    }
    addMessage('loaded');
}
window.addEventListener('DOMContentLoaded',onLoad);

function onScroll(element) {
    if (((window.scrollX + window.innerHeight) > element.getBoundingClientRect().top) && (element.dataset.show == "false")) {
        element.dataset.show = "true";
    }
}
function scroll() {
    var elements = document.getElementsByClassName('onScroll');
    elements = Array.from(elements);
    if (elements != undefined) {
        elements.forEach(onScroll);
    }
}
window.addEventListener('scroll',scroll);
window.addEventListener('error',function(event) {
    addMessage(event.message)
});
function addMessage(message) {
    var log = document.createElement('div');
    log.className = 'log';
    log.innerText = message;
    document.getElementById('logs').append(log);
    setTimeout(function() {
        document.getElementById('logs').firstElementChild.remove();
    }, 3000);
}