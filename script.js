$(document).ready(function () {

  // Get last search from local storage and initialize empty array for search history
  var lastCity = localStorage.getItem("lastCity");
  console.log("Last city: " + lastCity);
  var history = [];
  // Add last search to search history, display search history, and display weather for last search
  if (lastCity !== null) {
    history.push(lastCity);
    console.log(history);
    displayHistory();
    displayWeather(lastCity);
  }

  // Get city from input form, add to search history, and reset last search in local storage
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

  // Get city from search history button and re-display weather for that city
  $(document).on("click", ".historyBtn", function (event) {
    event.preventDefault();
    var city = $(this).attr("data-city");
    console.log(city);
    displayWeather(city);
  });

  // If API returns 404 error, alert user, remove last search from history, and reset local storage to previous search
  $(document).ajaxError(function () {
    alert("City not found. Please try another city.");
    history.pop();
    console.log(history);
    localStorage.setItem("lastCity", history[history.length - 1]);
    displayHistory();
  });

  // Create and display buttons from search history
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

  // Get weather from API and write data to elements in page
  function displayWeather(city) {

    var APIKey = "2b1d893433779b660bd9ec1ed3d3311b";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
    console.log(queryURL);

    // Call first API with city to get current weather
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);

      // Convert time of weather report to city's local time
      var unixTimestamp = moment.unix(response.dt + response.timezone).utc();
      var date = unixTimestamp.format("dddd, MMMM D, YYYY h:mm A");
      console.log(response.dt);
      console.log(unixTimestamp);
      console.log("Date: " + date);

      // Create URL for weather icon
      var icon = response.weather[0].icon;
      console.log("Icon: " + icon);
      var iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      var image = $("<img>");
      image.attr("src", iconURL);

      $("#current").children("h5").text(response.name + " (" + date + ")").append(image)
        .next().text("Temperature: " + response.main.temp.toFixed(1) + " " + String.fromCharCode(8457))
        .next().text("Humidity: " + response.main.humidity + "%")
        .next().text("Wind Speed: " + response.wind.speed.toFixed(1) + " MPH");

      var latitude = response.coord.lat;
      console.log("Lat: " + latitude);
      var longitude = response.coord.lon;
      console.log("Long: " + longitude);

      var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + APIKey;
      console.log(queryURL);

      // Call second API with latlong to get UVI and 5-day forecast
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (response) {
        console.log(response);

        // Add color for UVI
        var UVI = response.current.uvi.toFixed(2);
        // var UVI = 10.1;
        var color = $("<span>");
        if (UVI <= 2) {
          color.addClass("green");
        }
        else if (UVI <= 5) {
          color.addClass("yellow");
        }
        else if (UVI <= 7) {
          color.addClass("orange");
        }
        else if (UVI <= 10) {
          color.addClass("red");
        }
        else {
          color.addClass("purple");
        }
        color.text(UVI);
        $("#UVI").text("UV Index: ").append(color);

        $("#day1").children("h5").text(moment.unix(response.daily[1].dt + response.timezone_offset).utc().format("ddd, M/D"))
          .append($("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.daily[1].weather[0].icon + "@2x.png"))
          .next().text("High Temp: " + response.daily[1].temp.max.toFixed(1) + " " + String.fromCharCode(8457))
          .next().text("Low Temp: " + response.daily[1].temp.min.toFixed(1) + " " + String.fromCharCode(8457))
          .next().text("Humidity: " + response.daily[1].humidity + "%");

        $("#day2").children("h5").text(moment.unix(response.daily[2].dt + response.timezone_offset).utc().format("ddd, M/D"))
          .append($("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.daily[2].weather[0].icon + "@2x.png"))
          .next().text("High Temp: " + response.daily[2].temp.max.toFixed(1) + " " + String.fromCharCode(8457))
          .next().text("Low Temp: " + response.daily[2].temp.min.toFixed(1) + " " + String.fromCharCode(8457))
          .next().text("Humidity: " + response.daily[2].humidity + "%");

        $("#day3").children("h5").text(moment.unix(response.daily[3].dt + response.timezone_offset).utc().format("ddd, M/D"))
          .append($("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.daily[3].weather[0].icon + "@2x.png"))
          .next().text("High Temp: " + response.daily[3].temp.max.toFixed(1) + " " + String.fromCharCode(8457))
          .next().text("Low Temp: " + response.daily[3].temp.min.toFixed(1) + " " + String.fromCharCode(8457))
          .next().text("Humidity: " + response.daily[3].humidity + "%");

        $("#day4").children("h5").text(moment.unix(response.daily[4].dt + response.timezone_offset).utc().format("ddd, M/D"))
          .append($("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.daily[4].weather[0].icon + "@2x.png"))
          .next().text("High Temp: " + response.daily[4].temp.max.toFixed(1) + " " + String.fromCharCode(8457))
          .next().text("Low Temp: " + response.daily[4].temp.min.toFixed(1) + " " + String.fromCharCode(8457))
          .next().text("Humidity: " + response.daily[4].humidity + "%");

        $("#day5").children("h5").text(moment.unix(response.daily[5].dt + response.timezone_offset).utc().format("ddd, M/D"))
          .append($("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.daily[5].weather[0].icon + "@2x.png"))
          .next().text("High Temp: " + response.daily[5].temp.max.toFixed(1) + " " + String.fromCharCode(8457))
          .next().text("Low Temp: " + response.daily[5].temp.min.toFixed(1) + " " + String.fromCharCode(8457))
          .next().text("Humidity: " + response.daily[5].humidity + "%");

      });
    });
  }

});