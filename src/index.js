function formatDate(now){
  let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  let day = days[now.getDay()];
  let months =["January","February","March","April","May","June","July","August","September","October","November","December"];
  let month = months[now.getMonth()];
  let date = now.getDate();
  
  return `${day}, ${month} ${date}`;
}

let now = new Date();
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = formatDate(now);



function formatTime(now){
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`};
  if (minutes < 10) {
    minutes = `0${minutes}`}
      
  return `${hours}:${minutes}`;
}
    
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML= formatTime(now);



function changeToFahrenheit(event){  
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  // let temp = Math.round(currentTemperature.innerHTML * 9/5 + 32); 
  // currentTemperature.innerHTML = temp;
  currentTemperature.innerHTML = 54;
}

function changeToCelsius(event){
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  // let temp = Math.round((currentTemperature.innerHTML - 32)  * 5/9); 
  // currentTemperature.innerHTML = temp;
  currentTemperature.innerHTML = 12;
}

let celsius = document.querySelector("#celsius");
let fahrenheit = document.querySelector("#fahrenheit")

celsius.addEventListener("click", changeToCelsius);
fahrenheit.addEventListener("click", changeToFahrenheit);



function showWeather(response){
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${response.data.wind.speed} km/h`;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
}

function search (inputCity){
  let apiKey = "2af3f8b254a603f2b9c0355c32990678";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event){
  event.preventDefault();
  let inputCity = document.querySelector("#search-input").value;
  search(inputCity);
}

let searchEngine = document.querySelector("#search-engine");
searchEngine.addEventListener("submit", handleSubmit);

search("Malaga");

function handleLocation(position){
  let apiKey = "2af3f8b254a603f2b9c0355c32990678";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

let currentLocation = document.querySelector("#current-location-button");
function navigation(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handleLocation);
}
currentLocation.addEventListener("click", navigation);
