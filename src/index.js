// fecha actual

let now = new Date();
let dinamicDate = document.querySelector("#currentDate");

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let month = months[now.getMonth()];
dinamicDate.innerHTML = `${day} ${month} ${date}, ${hours}:${minutes}; ${year}`;

// Temperature

function displayWeatherCondition(response) {
  //console.log(response.data);  (mostrar información en la consola al inspeccionar)
  //console.log(response.data.name);  (mostrar nombre de la ciudad en la consola al inspeccionar)
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-type").innerHTML =
    response.data.weather[0].main;

  document.querySelector("#min").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#max").innerHTML = Math.round(
    response.data.main.temp_max
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].main);
}

// city name
function searchCity(city) {
  let apiKey = "20b66a5f117dcc9a1ccb7403aa799b09";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  //let cityName = document.querySelector("#city");
  //let cityInput = document.querySelector("#city-input");
  //cityName.innerHTML = cityInput.value;
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
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationBtn = document.querySelector("#myCity");
currentLocationBtn.addEventListener("click", getCurrentLocation);

searchCity("Berlin");
