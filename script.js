const fetchData = async () => {
    const file = await fetch('data.json');
    data = await file.json();
    language_data = data['languages'];
    monkeytype = data['monkeytype'];

    for (let i = 0; i < language_text.length; i++) {
        language_text[i].innerHTML = language_data[languages[i]];
    }

    for (let i = 0; i < monkeytypeObjects.length; i++) {
        monkeytypeObjects[i].innerHTML = monkeytype[['acc', 'max', 'tests'][i]];
    }
}

var language_data = [];
var languages = ['C#', 'Python', 'CSS', 'JavaScript', 'C++', 'Rust'];
var language_text = document.getElementsByClassName('hours-text');

var monkeytypeObjects = document.getElementsByClassName('monkeytype-data-inject');

// #region typing intro
// shamelessly stolen from https://codepen.io/gschier/pen/DLmXKJ
var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 150 - (Math.random() * 100);

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

var elements = document.getElementsByClassName('txt-rotate');
for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
}

var css = document.createElement("style");
css.innerHTML = ".txt-rotate > .wrap { border-right: 0.1em solid #fff; }";
document.body.appendChild(css);
// #endregion

var discordActive = false;
var discordObject = document.getElementById("discord_tag");

function toggleDiscord() {
    discordActive = !discordActive;

    updateDiscord();
}

function updateDiscord() {
    if (discordActive) {
        discordObject.style.width = "16ch";
        discordObject.style.opacity = '1';
    } else {
        discordObject.style.width = "0";
        discordObject.style.opacity = '0';
    }
}

updateDiscord();

fetchData();
