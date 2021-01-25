$(document).ready(function () {

  var lastCity = localStorage.getItem("lastCity");
  console.log("Last city: " + lastCity);
  var history = [];
  if (lastCity !== null) {
    history.push(lastCity);
    console.log(history);
    localStorage.setItem("lastCity", history[history.length - 1]);
    displayHistory();
    displayWeather(lastCity);
  }
  
  $("#cityBtn").on("click", function (event) {
    event.preventDefault();
    var city = $("#city").val().trim();
    $("#city").val("");
    if (city !== "") {
      history.push(city);
      console.log(history);
      localStorage.setItem("lastCity", history[history.length - 1]);
      displayHistory();
      displayWeather(city);
    }
  });
  
  $(document).on("click", ".historyBtn", function (event) {
    event.preventDefault();
    var city = $(this).attr("data-city");
    console.log(city);
    displayWeather(city);
  });
  
  $(document).ajaxError(function () {
    alert("City not found. Please try another city.");
    history.pop();
    console.log(history);
    localStorage.setItem("lastCity", history[history.length - 1]);
    displayHistory();
  });
  
  function displayHistory() {
    $("#history").empty();
    for (var i = 0; i < history.length; i++) {
      var a = $("<button>");
      a.addClass("btn btn-outline-secondary historyBtn");
      a.attr("data-city", history[i]);
      a.text(history[i]);
      $("#history").prepend(a);
    }
  }
  
  function displayWeather(city) {

    var APIKey = "2b1d893433779b660bd9ec1ed3d3311b";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
    console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {

      console.log(response);
      $("#current").children("h5").text(response.name + " (" + response.dt + ") " + response.weather[0].icon)
      .next().text("Temperature: " + response.main.temp.toFixed(1) + " " + String.fromCharCode(8457))
      .next().text("Humidity: " + response.main.humidity + "%")
      .next().text("Wind Speed: " + response.wind.speed.toFixed(1) + " MPH");
      var date = response.dt;
      console.log("Date: " + date);
      var icon = response.weather[0].icon;
      console.log("Icon: " + icon);
      var iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      var latitude = response.coord.lat;
      console.log("Lat: " + latitude);
      var longitude = response.coord.lon;
      console.log("Long: " + longitude);

      var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + APIKey;
      console.log(queryURL);

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (response) {

        console.log(response);
        $("#UVI").text("UVI Index: " + response.current.uvi);

        $("#day1").children("h5").text(response.daily[1].dt)
        .next().text(response.daily[1].weather[0].icon)
        .next().text("High Temp: " + response.daily[1].temp.max.toFixed(1) + " " + String.fromCharCode(8457))
        .next().text("Low Temp: " + response.daily[1].temp.min.toFixed(1) + " " + String.fromCharCode(8457))
        .next().text("Humidity: " + response.daily[1].humidity + "%");

        $("#day2").children("h5").text(response.daily[2].dt)
        .next().text(response.daily[2].weather[0].icon)
        .next().text("High Temp: " + response.daily[2].temp.max.toFixed(1) + " " + String.fromCharCode(8457))
        .next().text("Low Temp: " + response.daily[2].temp.min.toFixed(1) + " " + String.fromCharCode(8457))
        .next().text("Humidity: " + response.daily[2].humidity + "%");

        $("#day3").children("h5").text(response.daily[3].dt)
        .next().text(response.daily[3].weather[0].icon)
        .next().text("High Temp: " + response.daily[3].temp.max.toFixed(1) + " " + String.fromCharCode(8457))
        .next().text("Low Temp: " + response.daily[3].temp.min.toFixed(1) + " " + String.fromCharCode(8457))
        .next().text("Humidity: " + response.daily[3].humidity + "%");

        $("#day4").children("h5").text(response.daily[4].dt)
        .next().text(response.daily[4].weather[0].icon)
        .next().text("High Temp: " + response.daily[4].temp.max.toFixed(1) + " " + String.fromCharCode(8457))
        .next().text("Low Temp: " + response.daily[4].temp.min.toFixed(1) + " " + String.fromCharCode(8457))
        .next().text("Humidity: " + response.daily[4].humidity + "%");

        $("#day5").children("h5").text(response.daily[5].dt)
        .next().text(response.daily[5].weather[0].icon)
        .next().text("High Temp: " + response.daily[5].temp.max.toFixed(1) + " " + String.fromCharCode(8457))
        .next().text("Low Temp: " + response.daily[5].temp.min.toFixed(1) + " " + String.fromCharCode(8457))
        .next().text("Humidity: " + response.daily[5].humidity + "%");

      });
    });
  }

});