var titleHeaderDiv = document.getElementById("title-header");

onscroll = function () {
    // might cause problems in the future, is removable
    let final = 1 - ($(window).scrollTop() / 300.00);
    final = final < 0.4 ? 0.4 : (final > 1 ? 1 : final);
    titleHeaderDiv.style.height = `${parseInt(final * 100)}vh`;
}
