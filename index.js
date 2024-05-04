function search(event){
    event.preventDefault();
    let searchInputElement = document.querySelector(".search-input");
    let city= searchInputElement.value;

    let apiKey = "d08dc720e8a8b04fbd54b61633toefdf";
    let apiUrl = "https://api.shecodes.io/weather/v1/forecast?query={city}&key={d08dc720e8a8b04fbd54b61633toefdf}&units=metric"
   
   axios.get(apiUrl)
    .then(function(response){
        displayTemperature(response);
        displayForecast();
    })
     .catch(error => console.error(`Error fetching data:`, error));
 }

function formatDate(date){
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();

    if (minutes<10){
        minutes =`0${minutes}`;
    }
    if (hours<10){
        hours =`0${hours}`;
    }

    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let formattedDay = days[day];
    return`${formattedDay} ${hours}:${minutes}`;
}

function displayTemperature(response){
    let temperature = Math.round(response.data.temperature);
    let cityName = response.data.city;
    let countryName = response.data.country;
  

    let temperatureElement = document.querySelector("#current-city");
    temperatureElement.innerHTML= `${cityName},${countryName}`; 

    let currentTemperatureElement = document.querySelector("#current-temperature-main");
    currentTemperatureElement.innerHTML = `${temperature}`;

}

function displayForecast(){
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let forecast Html = "";

    days.forEach(function(day){
        forecastHtml += `
        <div class="forecast-weather">
            <div class="forecast-day">
                <div class="forecast-date">${day}</div>
                <div class="weather-forecast-icon">💕</div>
                <div class="weather-forecast-temperature">
                    <div class="forecast-max-temp"><strong>15</strong></div>
                    <div class="forecast-min-temp">9</div>
                </div>                
            </div>
         </div> `;
    });

    let forecastWeather = document.querySelector(".forecast-weather");
    forecastWeather.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML =formatDate(currentDate);





