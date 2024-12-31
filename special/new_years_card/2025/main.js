const receivers = {
    'aefhsoianvoubghoij': {
        receiver: 'Xフォロワーの皆様'
    },
    'adibdiubiajfngsjbj': {
        receiver: 'Threadsフォロワーの皆様'
    },
    'afiunbnviuibyv': {
        receiver: 'キャストの皆様'
    },
    'mornivbainivrninin': {
        receiver: 'クルーの皆様'
    }
};

window.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('error', function() {
        document.getElementById('log').innerHTML += event.message + '<br>';
    });
    dataGet();
    card = document.getElementById('card');
    card.addEventListener('touchstart', function(event) {
        oldTouch = event.touches;
    });
    card.addEventListener('touchmove', function(event) {
        var nowTouch = event.touches;
        if (nowTouch.length == 1) {
            for (var i = 0; i < oldTouch.length; i++) {
                if (nowTouch[0].identifier == oldTouch[i].identifier) {
                    rotateCard(nowTouch[0].clientX - oldTouch[i].clientX);
                }
            }
        }
        oldTouch = nowTouch;
    });
    card.addEventListener('touchend', function(event) {
        if (nowRotate > 0.85 || nowRotate < 0.15) {
            nowRotate = 0;
        } else if (nowRotate > 0.35 && nowRotate < 0.65) {
            nowRotate = 0.5;
        }
        rotateCard(0);
    });
    card.addEventListener('mousemove', function(event) {
        if (event.button == 0) {
            rotateCard(event.movementX);
        }
    });
    document.getElementById('btn-flip').addEventListener('click', function() {
        rotateCard(card.clientWidth / 2);
    });
});
window.addEventListener('load', function() {
    document.getElementById('loading').style.display = 'none';
    card.style.animation = '1.5s spawn';
    card.style.top = 'calc(50vh - (min(96.2vh, 140.6vw) / 2))';
});

var oldTouch = [];
var card;

var nowRotate = 0;
function rotateCard(move) {
    nowRotate += move / card.clientWidth;
    if (nowRotate < 0) {
        nowRotate++;
    }
    if (nowRotate > 1) {
        nowRotate--;
    }
    if (nowRotate >= 0.25 && nowRotate <= 0.75) {
        document.getElementById('card_front').style['z-index'] = 1;
        document.getElementById('card_back').style['z-index'] = 0;
    } else {
        document.getElementById('card_back').style['z-index'] = 1;
        document.getElementById('card_front').style['z-index'] = 0;
    }
    card.style.transform = `rotateY(${nowRotate}turn)`;
}

function dataGet() {
    var type = new URLSearchParams(location.search);
    if (receivers[type.get('pass')]) {
        document.getElementById('card_receiver').innerHTML = receivers[type.get('pass')].receiver;
    }
}