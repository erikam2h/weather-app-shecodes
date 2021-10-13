// Date: For last update

function formatDate(timestamp) {
  //Calculate de Date
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day}, ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

//Forecast

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  forecastHTML = `<div class="row justify-content-md-center mt-4">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-lg-2 col-sm-5 box-day">
        <div class="forecast-date">${formatDay(forecastDay.dt)}</div>
        
        <img src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt="icono-clima" style="width: 80px" />
        <div class="forecast-temperatures">
          <span class="forecast-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="forecast-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "20b66a5f117dcc9a1ccb7403aa799b09";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

// Temperature
function displayWeatherCondition(response) {
  //console.log(response.data);  (mostrar información en la consola al inspeccionar)
  //console.log(response.data.name);  (mostrar nombre de la ciudad en la consola al inspeccionar)
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-type").innerHTML =
    response.data.weather[0].main;
  /*
  document.querySelector("#min").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#max").innerHTML = Math.round(
    response.data.main.temp_max
  );*/
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].main);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

// city name
function searchCity(city) {
  let apiKey = "20b66a5f117dcc9a1ccb7403aa799b09";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  // 1. make an API call to OpenWeather API
  // 2. Once I get the response, we display the city name and the temperature.

  let city = document.querySelector("#city-input").value;
  searchCity(city);
  //console.log(apiUrl);
}

function searchLocation(position) {
  // position.coords.latitude
  // position.coords.longitude
  let apiKey = "20b66a5f117dcc9a1ccb7403aa799b09";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let celsiusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationBtn = document.querySelector("#myCity");
currentLocationBtn.addEventListener("click", getCurrentLocation);

searchCity("Berlin");
