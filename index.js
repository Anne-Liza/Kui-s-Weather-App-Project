function displayTemperature(response) {
    let temperatureElement = document.querySelector("#current-temperature");
    let temperature = Math.round(response.data.temperature.current);
    let cityElement = document.querySelector("#current-city");
    let humidityElement = document.querySelector("#current-humidity");
    let windElement = document.querySelector("#current-wind");
    let iconElement = document.querySelector("#current-icon");
    let conditionElement = document.querySelector("#current-condition");

    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = temperature;
    humidityElement.textContent = "Humidity: " + response.temperature.humidity + "%";
    windElement.textContent = "Wind: " + response.wind.speed + " km/h";
    iconElement.src = response.condition.icon_url;
    iconElement.alt = response.condition.description;
  }

  function search(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    let city = searchInputElement.value;
  
    let apiKey = "d08dc720e8a8b04fbd54b61633toefdf";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then(displayTemperature);
  }
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);

  function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();
  
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    if (hours < 10) {
      hours = `0${hours}`;
    }
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
  
    let formattedDay = days[day];
    return `${formattedDay} ${hours}:${minutes}`;
  }
  let currentDateELement = document.querySelector("#current-date");
  let currentDate = new Date();
  currentDateELement.innerHTML = formatDate(currentDate);

  function getForecast(city){
    let apiKey= "d08dc720e8a8b04fbd54b61633toefdf";
    let apiUrl= `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    
    axios.get(apiUrl).then(displayForecast);
  }

  function formatDay(timestamp){
    let date = new Date(timestamp*1000);
    let days = ["Mon","Tue","Wed","Thur","Fri","Sat","Sun"];
    return days[date.getDay()];
  }

  function displayForecast(response){
    let forecastElement = document.querySelector("#forecast");
    let forecastHtml = '';

    response.data.daily.forEach(function (day, index) {
      if(index <3){
        forecastHtml += `
        <div  class="forecast-weather">
            <div class="weather-forecast-date">${formatDay(day.time)}</div>
            <div class="weather-forecast-icon"><img src="${day.condition.icon_url}" alt="${day.condition.description}"></div>
            <div class="weather-forecast-details">
            <div class="forecast-condition">${day.condition.description}</div>
            <div class="forecast-temperature">
              <span class="forecast-max-temp"><strong>${Math.round(day.temperature.maximum)}°C</strong></span>
              <span class="forecast-min-temp">${Math.round(day.temperature.minimum)}°C</span>
            </div>
            
        </div>`;
      }
    });

    forecastElement.innerHTML = forecastHtml;
  }

  document.addEventListener("DOMContentLoaded", function() {
    getForecast("Paris");
});


