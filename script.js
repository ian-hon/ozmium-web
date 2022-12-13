var titleHeaderDiv = document.getElementById("title-header");

titleHeaderDiv.style.height = '100vh';

onscroll = function () {
    // might cause problems in the future, is removable
    let final = 1 - ($(window).scrollTop() / 500.00);
    final = final < 0.4 ? 0.4 : (final > 1 ? 1 : final);
    titleHeaderDiv.style.height = `${parseInt(final * 100)}vh`;
}

const fetchData = async () => {
    const file = await fetch('language_data.json');
    language_data = await file.json();

    for (let i = 0; i < language_text.length; i++) {
        language_text[i].innerHTML = language_data[languages[i]];
    }
}

var language_data = [];
var languages = ['C#', 'Python', 'CSS', 'HTML', 'JavaScript', 'C++']
var language_text = document.getElementsByClassName('hours-text');

fetchData();

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
    
    window.onload = function() {
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
};
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
