$(document).ready(function () {

  var city = "Bujumbura";
  var APIKey = "2b1d893433779b660bd9ec1ed3d3311b";
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    console.log(queryURL);
    console.log(response);
    var cityName = response.name;
    var date = response.dt;
    var icon = response.weather[0].icon;
    var iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    var temperature = response.main.temp;
    var humidity = response.main.humidity;
    var wind = response.wind.speed;
    var latitude = response.coord.lat;
    var longitude = response.coord.lon;
    console.log(cityName);
    console.log(date);
    console.log(icon);
    console.log(temperature);
    console.log(humidity);
    console.log(wind);
    console.log(latitude);
    console.log(longitude);

    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + APIKey;
    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      
      console.log(queryURL);
      console.log(response);
      var uvi = response.current.uvi;
      console.log(uvi);
      var date = response.daily[1].dt;
      var icon = response.daily[1].weather[0].icon;
      var iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      var tempMin = response.daily[1].temp.min;
      var tempMax = response.daily[1].temp.max;
      var humidity = response.daily[1].humidity;
      console.log(date);
      console.log(icon);
      console.log(tempMin);
      console.log(tempMax);
      console.log(humidity);
      
    });
  });

});