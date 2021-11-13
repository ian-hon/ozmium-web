var body = document.getElementsByTagName("BODY")[0];
var header = document.getElementsByClassName("title-header")[0];
var headerTitle = header.children[0];
var headerDirection = header.children[1];
var primaryColor = "#66fcf1";

var activatedHeader = true;
/* #9708fc */
/* #66fcf1 */

window.onscroll = function() {scrollShrinkHeader()};

function scrollShrinkHeader() {
    var target;
    if(window.scrollY < 50) {
        target = true;
    } else {
        target = false;
    }

    if(target != activatedHeader) {
        activatedHeader = target;
        updateHeader();
    }
}

function updateHeader() {
    if(window.scrollY < 50) {
        header.style.height = "100vh";
        header.style.backgroundColor = "#000";
        headerTitle.style.color = primaryColor;
        headerTitle.style.fontSize = "10vh";
        headerDirection.style.display = "block";
        headerTitle.classList.add('glitch-effect');
    } else {
        header.style.height = "8vh";
        header.style.backgroundColor = primaryColor;
        headerTitle.style.color = "#000";
        headerTitle.style.fontSize = "6vh";
        headerDirection.style.display = "none";
        headerTitle.classList.remove('glitch-effect');
    }
}

function pauseScroll() {
    setTimeout(function() { disableScroll(); }, 500);
    enableScroll();
}

function disableScroll(){
    body.classList.remove('stop-scrolling');
}

function enableScroll(){
    body.classList.add('stop-scrolling');
}

function scrollToContent() {
    window.scrollTo(0,400);
}
