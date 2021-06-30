const movieListContainer = $("#movie-list-container");

function init() {
    addExpandViewHandler();
    addFavoritesHandler();
    addWatchedHandler();
    addSortListHandler();
}

function addExpandViewHandler() {
    // TODO: .movie-title is a Placeholder
    const detailedPage = "movie_details.html";
    // TODO: Placeholder
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

function addToWatched(id) {
    const watched = JSON.stringify(localStorage.getItem('watched'));
    watched.push(id);
    localStorage.setItem('watched', JSON.parse(watched));
    return watched;
}

init();