let APIkey = "4acc1a6a5381a1c748baced8e331c0ed";
let btnEl = document.querySelector(".btn");
let inputEl = document.querySelector("#citySearch");
let cityName = document.getElementById("cityName");
let temp = document.getElementById("temp");
let wind = document.getElementById("wind");
let humidity = document.getElementById("humidity");
let prevSearches = document.getElementById("prevSearches");
let fivedayEl = document.getElementById("5day");

let city;
let searchCity;

let ulEl = document.createElement("ul");
prevSearches.append(ulEl);
ulEl.style.cssText = "list-style: none; width: 100%; padding: 0";

// Current Day Query
function queryAPI() {
  city = inputEl.value;
  let queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIkey +
    "&units=imperial";

  clearDay();

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      // Add query iconID to dynamic link. Make an IMG element out of that.
      let iconID = data.weather[0].icon;
      let iconLink = "https://openweathermap.org/img/w/" + iconID + ".png";
      let iconHTML = '<img src="' + iconLink + '">';

      // Convert Unix time to readable format
      let unixTimestamp = data.dt;
      let milliTime = unixTimestamp * 1000;
      let dateObject = new Date(milliTime);

      // Setup storage
      let key = city;
      let value = city;
      localStorage.setItem(key, value);

      cityName.innerHTML =
        data.name +
        " (" +
        dateObject.toLocaleString("en-US", { dateStyle: "short" }) +
        ") " +
        iconHTML;
      temp.innerHTML = data.main.temp + "<span>&#176;</span>F";
      wind.textContent = data.wind.speed + " MPH";
      humidity.textContent = data.main.humidity + " %";
    })
    .then(fivedayForecast());
}

// 5 Day Forecast
function fivedayForecast() {
  let fivedayQuery =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    APIkey +
    "&units=imperial";

  fetch(fivedayQuery)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      let forecastedFive = data.list;

      for (let i = 4; i < forecastedFive.length; i += 8) {
        let createdCol = document.createElement("p");
        let createdDiv1 = document.createElement("div");
        let createdDiv2 = document.createElement("div");
        let createdDiv3 = document.createElement("div");
        let createdDiv4 = document.createElement("div");
        fivedayEl.appendChild(createdCol);
        createdCol.appendChild(createdDiv1);
        createdCol.appendChild(createdDiv2);
        createdCol.appendChild(createdDiv3);
        createdCol.appendChild(createdDiv4);
        createdCol.classList.add("col");
        createdCol.setAttribute(
          "style",
          "background: #0052A2; color: white; margin: 1%; padding: 1%"
        );

        iconID = data.list[i].weather[0].icon;
        iconLink = "https://openweathermap.org/img/w/" + iconID + ".png";
        iconHTML = '<img src="' + iconLink + '">';

        unixTimestamp = data.list[i].dt;
        milliTime = unixTimestamp * 1000;
        dateObject = new Date(milliTime);

        createdDiv1.innerHTML =
          dateObject.toLocaleString("en-US", {
            dateStyle: "short",
          }) + iconHTML;
        createdDiv2.innerHTML +=
          "Temp: " + data.list[i].main.temp + "<span>&#176;</span>F";
        createdDiv3.innerHTML += "Wind: " + data.list[i].wind.speed + " MPH";
        createdDiv4.innerHTML +=
          "Humidity: " + data.list[i].main.humidity + " %";
      }
      inputEl.value = "";
    });
}

function clearDay() {
  fivedayEl.innerHTML = "";
}

function showRecent() {
  for (var i = 0; i < localStorage.length; i++) {
    let currCity = localStorage.getItem(localStorage.key(i));
    let liEl = document.createElement("li");
    let createbtnEl = document.createElement("button");
    ulEl.append(liEl);
    liEl.append(createbtnEl);
    liEl.style.cssText = "width:100%";
    createbtnEl.style.cssText = "width:100%; margin: 1%";
    createbtnEl.classList.add("requeryBtn");
    createbtnEl.textContent = currCity;
  }

  // Setup eventlisteners on buttons for reQuery
  let requeryBtns = document.querySelectorAll(".requeryBtn");
  for (var i = 0; i < requeryBtns.length; i++) {
    requeryBtns[i].addEventListener("click", reQuery);
  }
}

function reQuery() {
  searchCity = this.textContent;
  inputEl.value = searchCity;
  queryAPI();
}

showRecent();

btnEl.addEventListener("click", queryAPI);
