function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const englishMovieTitle = urlParams.get('english');
    const japaneseMovieTitle = urlParams.get('japanese');
    const year = urlParams.get('y');

    // Sometimes movies are in Japanese or English, so we have to do both
    buildOMDBApiCall(englishMovieTitle, year);
    buildOMDBApiCall(japaneseMovieTitle, year);
}

function renderPage(movieData) {
    if (movieData.Title === 'Null') {
        //return to homepage
        console.log('Title not found.');
        return;
        // document.location = 'index.html';
    } 

    console.log(movieData);

    // Display title in English only
    const urlParams = new URLSearchParams(window.location.search);
    const movieTitle = urlParams.get("english");

    // Popup element
    const popup = $('<div>');
    popup.addClass('popup');
    $('.layer').append(popup);

    // Poster element
    const posterContainer = $('<div>');
    posterContainer.addClass("image-side");
    posterContainer.append(
        $('<img>')
        .attr('src', getPoster(movieData))
        .attr('alt', movieTitle)
    );
    popup.append(posterContainer);

    // Movie info
    const movieInfo = $('<div>');
    movieInfo.addClass('movie-info');
    movieInfo.append(
        $('<h1>')
        .addClass('is-size-1')
        .text(movieTitle)
    );
    movieInfo.append(
        $('<button>')
        .addClass('favorite-button')
        .text('Add To Favorites')
    );
    const movieSpecs = $('<ul>');
    movieSpecs.append(
        $('<li>')
        .text(movieData.Director)
    );
    movieSpecs.append(
        $('<li>')
        .text(movieData.Released)
    );
    movieSpecs.append(
        $('<li>')
        .text(movieData.Runtime)
    );
    movieInfo.append(movieSpecs);
    movieInfo.append(
        $('<div>')
        .addClass('synopsis')
        .append(
            $('<p>')
            .addClass('is-size-5')
            .text(movieData.Plot)
        )
    );
    movieInfo.append(
        $('<iframe>')
        .attr('width', '420')
        .attr('height', '250')
        .attr('src', trailers[1])
    );
    popup.append(movieInfo);

}

function getPoster(movieData) {
    return movieData.Poster;
}

// Fetch from OMDB, then build the page using the response
function buildOMDBApiCall(title, year) {
  //placeholder movie + key
  fetch(`https://www.omdbapi.com/?t=${title}&y=${year}&apikey=5af38ba4`)
    .then((response) => {
        return response.json();
    })
    //returns movie data as array
    .then((data) => {
        if (data.Response === 'True') {
            renderPage(data); 
        }
    });
}

init();