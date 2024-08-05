console.log("logged")
const searchFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit(event) {
  event.preventDefault();


  location.assign(queryString);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

const APIkey = '25b9d2b2c38027aae95ac20ad2c8fc20'
const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${"Austin"}&appid=${APIkey}`;
//fetch(queryURL);



//queryURL = `${queryURL}&q=${searchFormEl}`;
console.log("logged")

fetch(queryURL)
  .then(function (response) {
    console.log("fetch")
    if (!response.ok) {
      throw response.json();
    }
console.log()
    return response.json();
  })
  .then(function(data) {
console.log(data)
  }) 

  .catch(function (error) {
    console.error(error);
  });

function handleSearchFormSubmit(event) {
  event.preventDefault();

  const searchInputVal = document.querySelector('#search-input').value;

  const queryString = `./search-results.html?q=${searchInputVal}&format=${formatInputVal}`;

  location.assign(queryString);

  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }

  //getParams();
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

//getParams();
