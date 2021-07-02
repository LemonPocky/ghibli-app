// Start here
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
    // If movieData is not found or it fetches a creepy movie called Null
    if (!movieData || movieData.Title === 'Null') {
        // Return to homepage
        document.location = 'index.html';
    } 

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

    // Movie title
    movieInfo.append(
        $('<h1>')
        .addClass('is-size-1')
        .text(movieTitle)
    );
    // Favorite button
    movieInfo.append(
        $('<button>')
        .addClass('favorite-button')
        .text('Add To Favorites')
    );
    // Minor details
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
    // Plot synopsis
    movieInfo.append(
        $('<div>')
        .addClass('synopsis')
        .append(
            $('<p>')
            .addClass('is-size-5')
            .text(movieData.Plot)
        )
    );
    // Youtube trailer embed
    movieInfo.append(
      $("<iframe>")
        .attr("width", "420")
        .attr("height", "250")
        // Find trailer based on english title
        .attr('src', findAttribute(trailers, 'title', movieTitle).link)
    );
    popup.append(movieInfo);

}

function getPoster(movieData) {
    return movieData.Poster;
}

// Fetch from OMDB, then build the page using the response
function buildOMDBApiCall(title, year) {
  //search movie by title and year
  fetch(`https://www.omdbapi.com/?t=${title}&y=${year}&apikey=5af38ba4`)
    .then((response) => {
        return response.json();
    })
    //returns movie data
    .then((data) => {
        if (data.Response === 'True') {
            renderPage(data); 
        } 
    });
}

// Helper function to find the first instance of an object in an array with the specified property
function findAttribute(array, attribute, toFind) {
    for (let i = 0; i < array.length; i++) {
        if (array[i][attribute] === toFind) {
            return array[i];
        }
    }
    return null;
}

init();