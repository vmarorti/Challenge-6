const cityHistory= JSON.parse(localStorage.getItem('cities')) || []

const searchFormEl = document.querySelector('#search-form');

function saveCity(city) {
  if (cityHistory.includes(city))
    return;
  cityHistory.push(city)
  localStorage.setItem('cities', JSON.stringify(cityHistory))

  displayCities();
}

function handleSearchFormSubmit(event) {
  event.preventDefault();


  location.assign(queryString);
}
function displayCurrentWeather(data, city) {
  document.getElementById('temp').textContent=data.main.temp+' F'
  document.getElementById('humidity').textContent=data.main.humidity+' %'
  document.getElementById('wind').textContent=data.wind.speed+' mph'
  document.getElementById('date').textContent=dayjs.unix(data.dt).format('MM-DD-YYYY')
  document.getElementById('city-name').textContent=city
  document.getElementById('icon').src=`https://openweathermap.org/img/w/${data.weather[0].icon}.png`
}

function displayForcast(list) {
  const forecastEl= document.getElementById('forecast')
  forecastEl.innerHTML= '';
  for (let i = 6; i < list.length; i+=8) {
    forecastEl.innerHTML+= `<div class= "card">
    <h3>
    ${dayjs.unix(list[i].dt).format('MM-DD-YYYY')}</h3>
    <img src= ${`https://openweathermap.org/img/w/${list[i].weather[0].icon}.png`}
      <p >${list[i].main.temp} F</p>
      <p >${list[i].main.humidity} %</p>
      <p >${list[i].wind.speed} mph</p>
    </div>
`
  }
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

const APIkey = '25b9d2b2c38027aae95ac20ad2c8fc20'


function handleSearchFormSubmit(event) {
  event.preventDefault();

  const searchInputVal = document.querySelector('#search-input').value;


  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInputVal}&limit=5&appid=${APIkey}`

  fetch(geoUrl)
    .then(function (response) {
      console.log("fetch")
      if (!response.ok) {
        throw response.json();

      }
      return response.json();

    })
    .then(function (data) {
      console.log(data)
saveCity(data[0].name)
      const lat = data[0].lat
      const lon = data[0].lon
      console.log(lat, lon)

      const queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`;

      fetch(queryURL)
        .then(function (response) {
          if (!response.ok) {
            throw response.json();
          }
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          displayCurrentWeather(data.list[0], data.city.name)
          displayForcast(data.list)
        })
    })
    .catch(function (error) {
      console.error(error);
    })
  //getParams();
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

//getParams();
