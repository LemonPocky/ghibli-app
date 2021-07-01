function init() {
    const urlParmas = new URLSearchParams(window.location.search);
    const movieData = fetchMovieData();

    movieTitle = movieData.title;

    const popup = $('<div>');
    popup.addClass('popup');

    const posterContainer = $('<div>');
    posterContainer.addClass("image-side");
    const poster = $('<img>');
    poster.attr('src', movieData.poster);
    poster.attr('alt', movieTitle);
}

function getPoster(title) {

}

init();