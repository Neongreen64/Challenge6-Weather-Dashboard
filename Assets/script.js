const apiKey = 'cf75761a46448e894386a1eb7b62bf42';
const apiUrl = 'https://api.openweathermap.org/data/2.5/'

var cityInput = document.getElementById("city");
var searchBtn = document.getElementById("search");
var state = document.getElementById("state");
var temp = document.getElementById("temp");
var wind = document.getElementById("wind");
var humidity = document.getElementById("humidity");
var five =  document.querySelector(".five-day");

//getWeather() function
function getWeather(city){
    //GeocodeApiUrl and declared variables lat and lon.
    console.log(city);
    const geocodeApiUrl= "https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=cf75761a46448e894386a1eb7b62bf42";
    var lat, lon;
    var weatherApiUrl;
    //Fetch the geocodeApi and set the variables lon and lat.
    fetch(geocodeApiUrl)
        .then((response) => response.json())
        .then((data) => {
            lon = data[0].lon;
            console.log(lon);
            lat = data[0].lat;
            weatherApiUrl= "https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=cf75761a46448e894386a1eb7b62bf42&units=imperial";
        })
        .catch((error)=>{
            console.error("error fetching geocoding info :(");
        })

    

    //Fetch the weatherApi and set the state name, temp, wind speed, and humidity.
    fetch(weatherApiUrl)
        .then((response) => response.json())
        .then((data) => {
            state.textContent = data.name + " " + data.sys.country;
            temp.textContent = "Temperature: " + data.main.temp + "°F";
           wind.textContent = "Wind: " + data.wind.speed + "mph";
          humidity.textContent = "Humidity: " + data.main.humidity;
        })
        .catch((error)=>{
            console.error("error fetching weather info :(");
        })


    const fiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=cf75761a46448e894386a1eb7b62bf42&units=imperial";
    
    //Fetch the five day forecast api
    fetch(fiveDayUrl)
        .then((response)=> response.json())
        .then((data)=> {
            five.innerHTML = "";

            for(var x=0; x < 5; x++){
                var date = new Date(data.list[x].dt * 1000);
                var temperature = data.list[x].main.temp + "°F";
                var emoji = data.list[x].weather[0].icon;
                var emojiUrl = "http://openweathermap.org/img/w/${emoji}.png"

                var day =  document.createElement('div');
                day.classList.add('forecast');
                day.innerHTML = `
                    <h4>${date.toLocaleDateString()}</h4>
                    <img src="${emojiUrl}" alt="weather emoji">
                    <p>${temperature}</p>
                `;

                five.appendChild(day);
            }
            
        })
        .catch((error)=> {
            console.log("error fetching forecast data :(");
        })
    

}


searchBtn.addEventListener("click", ()=>{
    var city = cityInput.value.trim();
    if (city != ""){
        getWeather(city);
    }
})


var citybtn = document.querySelectorAll(".citybtn");

citybtn.forEach((button)=> {
    button.addEventListener("click", () => {
        var citys = button.id;
        getWeather(citys);
    })
})


getWeather("ohio");