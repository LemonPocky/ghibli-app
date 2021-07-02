

const omdbAPIkey = "5af38ba4";
var test = document.getElementById('root');

function fetchAllGhibliMovies() {
  apicall();
  buildOMDBApiCall();
  var request = new XMLHttpRequest();
  var container = document.createElement('div');
  container.setAttribute('class', 'container');
  test.appendChild(container);

    request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);
    request.onload = function () {
       // parsing json data
     var data = JSON.parse(this.response);
     if (request.status >= 200 && request.status < 400) {

        data.forEach(movie => {
         var card = document.createElement('div');
         card.setAttribute('class', 'card');
         card.setAttribute("data-id", movie.id)

         var h1 = document.createElement('h1');
         h1.textContent = movie.title;
     

         var p = document.createElement('p');
         p.textContent = `${movie.description}`;
    
         //   //todo: fix poster links
         //   var img = document.createElement('img');
         //   img.src = movie.poster;
         container.appendChild(card);
         card.appendChild(h1);
         card.appendChild(p);

     
         //   card.appendChild(img);  
        });
          
     }   else {
          //displays a marquee of text if there's a problem fetching the api data
         var error = document.createElement('marquee');
         error.textContent = `error retrieving data`;
         test.appendChild(error);
        }
   } 
  request.send();
}

fetchAllGhibliMovies();




function apicall() {
  //placeholder movie + key
  fetch('https://ghibliapi.herokuapp.com/films')
  .then(response => {
    return response.json();
  })
  //returns movie data as array
  .then(data => {
    console.log(data);
  });
}


//example function to call OMDB api, TODO: will take specific parameters once they're built and implemented
function buildOMDBApiCall() {
    //placeholder movie + key
    fetch('https://www.omdbapi.com/?t=Majo no takkyūbin&apikey=5af38ba4')
    .then(response => {
        return response.json();
    })
    //returns movie data as array
    .then(data => {
        console.log(data);
    });
}
