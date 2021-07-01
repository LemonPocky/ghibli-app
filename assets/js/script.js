
const omdbAPIkey = "5af38ba4";
var test = document.getElementById('root');

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

function init() {
  apicall();
  buildOMDBApiCall();
  var request = new XMLHttpRequest();
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);
request.onload = function () {

  // parsing json data
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.forEach(movie => {
      var card = document.createElement('div');
      card.setAttribute('class', 'card');

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
  } else {
    var error = document.createElement('marquee');
    error.textContent = `pain`;
    test.appendChild(error);
  }
}
request.send();
}
init();

var container = document.createElement('div');
container.setAttribute('class', 'container');
test.appendChild(container);

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






