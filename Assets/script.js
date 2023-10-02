const apiKey = 'cf75761a46448e894386a1eb7b62bf42';
const apiUrl = 'https://api.openweathermap.org/data/2.5/'

var cityInput = document.getElementById("city");



function getWeather(city) {
    // GeocodeApiUrl and declared variables lat and lon.
    var city2 = city.trim();
    const geocodeApiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey;

    // Fetch the geocodeApi and set the variables lon and lat.
    fetch(geocodeApiUrl)
        .then((response) => response.json())
        .then((data) => {
            var lon = data[0].lon;
            var lat = data[0].lat;

            // Define the five-day forecast API URL.
            var fiveDayUrl = apiUrl + "forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";

            // Fetch the five-day forecast API.
            fetch(fiveDayUrl)
                .then((response) => response.json())
                .then((data) => {
                   //Declare variables state,temp,wind,humidty,five
                    var state = document.getElementById("state");
                    var temp = document.getElementById("temp");
                    var wind = document.getElementById("wind");
                    var humidity = document.getElementById("humidity");
                    var five = document.querySelector(".five-day");

                    //Clears any text in five.
                    five.innerHTML = "";

                    //Set the text content of the corresponding html elements.
                    state.textContent = data.city.name + " " + data.city.country;
                    temp.textContent = "Temperature: " + data.list[0].main.temp + "°F";
                    wind.textContent = "Wind: " + data.list[0].wind.speed + "mph";
                    humidity.textContent = "Humidity: " + data.list[0].main.humidity + "%";


                    //Gathers info from the api and then creates div elements for each day of the five-day forecast.
                    for (var x = 0; x < 5; x++) {
                        var date = new Date(data.list[x].dt * 1000);
                        var temperature = data.list[x].main.temp + "°F";
                        var windSpeed = data.list[x].wind.speed + "mph";
                        var humidity = data.list[x].main.humidity + "%";
                        var emoji = data.list[x].weather[0].icon;
                        var emojiUrl = `http://openweathermap.org/img/w/${emoji}.png`;

                        var day = document.createElement('div');
                        day.classList.add('forecast');
                        day.innerHTML = `
                            <h4>${date.toLocaleDateString()}</h4>
                            <img src="${emojiUrl}" alt="weather emoji">
                            <p>Temperature: ${temperature}</p>
                            <p>Wind Speed: ${windSpeed}</p>
                            <p>Humidity: ${humidity}</p>
                        `;

                        five.appendChild(day);
                    }
                })
                .catch((error) => {
                    console.log("error fetching forecast data :(");
                });
        })
        .catch((error) => {
            console.error("error fetching geocoding info :(");
        });
}

//Declares the variable searchBtn and adds a click event listener to searchBtn.
var searchBtn = document.getElementById("search");

searchBtn.addEventListener("click", () => {
    var city = cityInput.value.trim();
    if (city != "") {
        getWeather(city);
    }
});

//Declares the variable citybtn and adds a click event listener to citybtn.
var citybtn = document.querySelectorAll(".citybtn");

citybtn.forEach((button) => {
    button.addEventListener("click", () => {
        var citys = button.id;
        getWeather(citys);
    });
});

getWeather("Indiana");