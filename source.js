var body = document.getElementsByTagName("BODY")[0];
var header = document.getElementsByClassName("title-header")[0];
var headerTitle = header.children[0];
var headerDirection = header.children[1];
var primaryColor = "#66fcf1";

var discordSelection = false;
var discordDiv = document.getElementsByClassName("discord-select")[0]; // Because js is stupid

var showcaseIndex = 0;
var showcaseHref = document.getElementsByClassName("showcaseHref")[0];
var showcaseText = document.getElementsByClassName("showcaseDescription")[0];
var showcaseImage = document.getElementsByClassName("showcaseImage")[0];
var descriptions = [
    "ajuna_loli and Jaden2GM - Discord bots, both equipped with Chatbot AI, quest and levelling systems",
    "MonoSweeper - A minesweeper clone made in C# using the Monogame framework and is released on itch.io",
    "ConcentratedHell - Top-down bullet hell, made using C#, and is nearing it's release",
    "Advent of Code - All the code from Day 1 to Day 25 (some code shamelessly stolen)",
    "TextAdventure - Console text-based game; Not released yet",
    "WordleClone - A wordle clone, in C#, made in 15 minutes; I've yet to publish the code",
];
var links = [
    "https://github.com/Asianerd/discord-bots",
    "https://asianerd.itch.io/monosweeper",
    "https://github.com/Asianerd/ConcentratedHell",
    "https://github.com/Asianerd/advent-of-code",
    "https://github.com/Asianerd/TextAdventure",
    "https://www.nytimes.com/games/wordle",
]
updateShowcase();
discordUpdateSelection();

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

function scrollToContent() {
    window.scrollTo(0,400);
}

function progressShowcase(amount) {
    showcaseIndex += amount;
    if(showcaseIndex >= descriptions.length)
    {
        showcaseIndex = 0;
    }
    if(showcaseIndex < 0)
    {
        showcaseIndex = descriptions.length -1;   
    }
    updateShowcase();
}

function updateShowcase() {
    showcaseHref.href = links[showcaseIndex];
    showcaseText.textContent = descriptions[showcaseIndex];
    showcaseImage.src = `/ShowcaseImages/${showcaseIndex}.png`;
}

function discordToggleSelection() {
    discordSelection = !discordSelection;
    discordUpdateSelection();
}

function discordUpdateSelection() {
    if(discordSelection) {
        discordDiv.style.width = "17ch";
        discordDiv.style.borderColor = "#ffff";
    } else {
        discordDiv.style.width = "0";
        discordDiv.style.borderColor = "#0000";
        discordDiv.style.backgroundColor = "#0000";
    }
}