
const omdbAPIkey = "5af38ba4";

// Ghibli API call promise
const ghibliApiCall = new Promise((resolve, reject) => {
  //placeholder movie + key
  fetch('https://ghibliapi.herokuapp.com/films')
  .then(response => {
    return response.json();
  })
  //returns movie data as array
  .then(data => {
    resolve(data);
  });
});
  
const movieListContainer = $(".movies-container");

function init() {
    highlightFavorites();
    ghibliApiCall
        .then((data) => {
            addExpandViewHandler(data);
            addFavoritesHandler();
            // addWatchedHandler();
            // addSortListHandler();
        });    
}

function addExpandViewHandler(data) {
    const detailedPage = "details.html";
    movieListContainer.on("click", ".details", function (event) {
        event.preventDefault();

        // Count how many siblings are above this element to get this element's index
        let current = $(this).parent().parent();
        let index = 0;
        for (; index < data.length; index++) {
            console.log(current);
            current = current.prev('.grid-container');
            if (!current.length) {
                break;
            }
        }

        const movie = data[index];

        // Redirect to details page
        document.location = detailedPage 
            + "?english=" + movie.title
            + "&japanese=" + movie.original_title_romanised
            + "&y=" + movie.release_date;
    });
}

function addFavoritesHandler() {
    movieListContainer.on("click", ".favorites", function (event) {
        event.preventDefault();
        const id = $(this).parent().attr("data-id");
        const title = $(this).prev('.movieName').text();
        toggleFavorites(title);
        highlightFavorites();
    });
}

function addWatchedHandler() {
    // TODO: .watched-button is a Placeholder
    movieListContainer.on("click", ".watched-button", function (event) {
        event.preventDefault();
        const id = $(this).parent().attr("data-id");
        addToWatched(id);
    });
}

function addSortListHandler() {
    // TODO: .dropdown-sort is a Placeholder
    $('.dropdown-sort').on("change", function (event) {
        event.preventDefault();
        const sortType = $(this).val();
        sortMovieList(sortType);
    });
}

// Add to favorites, or if it exists, remove from favorites
function toggleFavorites(id) {
    let favorites = JSON.parse(localStorage.getItem('favorites'));
    if (!favorites) {
        favorites = [];
    }
    const index = favorites.indexOf(id);
    if (index !== -1) {
        removeFromArray(id, favorites);
    } else {
        favorites.push(id);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    return favorites;
}

function addToWatched(id) {
    const watched = JSON.parse(localStorage.getItem('watched'));
    watched.push(id);
    localStorage.setItem('watched', JSON.stringify(watched));
    return watched;
}

function highlightFavorites() {
    const movies = movieListContainer.children('.grid-container');
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    if (!favorites) {
        return;
    }
    movies.each( function (index) {
        // Get the name of the current movie from .movieName element
        const currentTitle = $(this).find('.movieName').text();
        // If the name of the movie is found in favorites
        if (favorites.indexOf(currentTitle) !== -1) {
            // Add favorited-movie class to movie card
            $(this).addClass('favorited-movie');
        } else {
            // Otherwise, remove favorited-movie class from movie card
            $(this).removeClass('favorited-movie');
        }
    });
}

function sortMovieList(sortType) {
    let comparator;

    // Change sort function depending on sortType
    switch(sortType) {
        case 'Alphabetical':
            comparator = compareByAlphabetical;
            break;
        case 'Release Date':
            comparator = compareByReleaseDate;
            break;
        case 'Favorites':
            comparator = compareByFavorites;
            break;
        default:
            comparator = compareByAlphabetical;
    }

    // Sort the list
    movies = movies.sort(comparator);
}

// Helper function that compares two movies by alphabetical order of their titles
function compareByAlphabetical(x, y) {
    // TODO: title is a Placeholder
    if (x.title < y.title) {
        return -1;
    }
    if (x.title > y.title) {
        return 1;
    }
    return 0;
}

// Helper function that compares two movies by their release dates
function compareByReleaseDate(x, y) {
    // TODO: releaseDate is a Placeholder
    if (x.releaseDate < y.releaseDate) {
        return -1;
    }
    if (x.releaseDate > y.releaseDate) {
        return 1;
    }
    return 0;
}

// Helper function that compares two movies if they are Favorites
function compareByFavorites(x, y) {
    // TODO: favorite is a Placeholder
    if (x.favorite && !y.favorite) {
        return -1;
    }
    if (!x.favorite && y.favorite) {
        return 1;
    }
    return 0;
}

// Helper function that removes an item from an array by value
// https://stackoverflow.com/a/5767357
function removeFromArray(itemToRemove, array) {
    const index = array.indexOf(itemToRemove);
    if (index > -1) {
        array.splice(index, 1);
    }
}

init();
// 
