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
