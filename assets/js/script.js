const movieListContainer = $("#movie-list-container");

function init() {
    addExpandViewHandler();
    addFavoritesHandler();
    addWatchedHandler();
    addSortListHandler();
}

function addExpandViewHandler() {
    // TODO: .movie_details.html is a Placeholder
    const detailedPage = "movie_details.html";
    // TODO: .movie-title is a Placeholder
    movieListContainer.on("click", ".movie-title", function (event) {
        event.preventDefault();
        const id = $(this).attr("data-id");
        document.location = detailedPage + "?id=" + id;
    });
}

function addFavoritesHandler() {
    // TODO: .favorite-button is a Placeholder
    movieListContainer.on("click", ".favorite-button", function (event) {
        event.preventDefault();
        const id = $(this).parent().attr("data-id");
        addToFavorites(id);
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

function addToFavorites(id) {
    const favorites = JSON.stringify(localStorage.getItem('favorites'));
    favorites.push(id);
    localStorage.setItem('favorites', JSON.parse(favorites));
    return favorites;
}

function removeFromFavorites(id) {    
    const favorites = JSON.stringify(localStorage.getItem("favorites"));
    removeFromArray(id, favorites);
    localStorage.setItem("favorites", JSON.parse(favorites));
    return favorites;
}

function addToWatched(id) {
    const watched = JSON.stringify(localStorage.getItem('watched'));
    watched.push(id);
    localStorage.setItem('watched', JSON.parse(watched));
    return watched;
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