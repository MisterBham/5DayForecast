let APIkey = "4acc1a6a5381a1c748baced8e331c0ed";
let btnEl = document.querySelector(".btn");
let inputEl = document.querySelector("#citySearch");

function queryAPI() {
  //   City now pulls entire input, rather than just city. Change everything to be cityInput
  let city = inputEl.value;
  let inputArr = inputEl.value.split(",");
  let cityInput = inputArr[0].trim();
  let stateInput = inputArr[1].trim();
  let countryInput = inputArr[2].trim();

  let queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIkey +
    "&units=imperial";
  let convertName =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    cityInput +
    "," +
    stateInput +
    "," +
    countryInput +
    "&limit=3" +
    "&appid=" +
    APIkey;

  // One Day search
  //   fetch(queryURL)
  //     .then(function (response) {
  //       return response.json();
  //     })
  //     .then(function (data) {
  //       console.log(data);

  //       let cityName = document.getElementById("cityName");
  //       let temp = document.getElementById("temp");
  //       let wind = document.getElementById("wind");
  //       let humidity = document.getElementById("humidity");
  //       let iconID = data.weather[0].icon;
  //       let iconLink = "https://openweathermap.org/img/w/" + iconID + ".png";
  //       let iconHTML = '<img src="' + iconLink + '">';

  //       let unixTimestamp = data.dt;
  //       let milliTime = unixTimestamp * 1000;
  //       let dateObject = new Date(milliTime);

  //       cityName.innerHTML =
  //         data.name +
  //         " (" +
  //         dateObject.toLocaleString("en-US", { dateStyle: "short" }) +
  //         ") " +
  //         iconHTML;
  //       temp.innerHTML = data.main.temp + "<span>&#176;</span>F";
  //       wind.textContent = data.wind.speed + " MPH";
  //       humidity.textContent = data.main.humidity + " %";
  //     });

  // 5 Day Forecast
  fetch(convertName)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      let lat = data[0].lat;
      let lon = data[0].lon;
      console.log(lat);
      console.log(lon);
    });

  let fiveForecast =
    "http://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    APIkey;

  console.log(fiveForecast);
}

btnEl.addEventListener("click", queryAPI);
