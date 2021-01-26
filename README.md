# Weather Dashboard
## Description
The application retrieves weather data for cities using the [OpenWeather API](https://openweathermap.org/api/). It adds each city to the search history and saves the most recent search in local storage. If the city is not found in the API, it alerts the user and removes the city from the search history. When the user clicks on a city in the search history, the weather data for that city is updated and displayed. When the user opens or refreshes the page, the weather data for the last search is updated and displayed.

This was a fun and challenging project. When I have more time, I would like to continue to work on it. The page could be more responsive and the code could be more DRY. The text wrapping is a bit inconsistent at certain page widths. I would like to refactor the code to use more functions, although I think what I have is pretty organized. I'm just happy that it all works.

One major improvement would be to call the API by city ID instead of city name. Often searching by the name returns an unexpected city with the same name in a different part of the world.

Deployed at [GitHub Pages](https://danielryangreen.github.io/weather-forecast/)

See the repo at [Github](https://github.com/danielryangreen/)
## Installation
Open __index.html__ in your favorite browser!

View the code in your favorite text editor. I suggest VS Code.
## Usage
Here is a mock-up that demonstrates the application functionality.

![mock-up of weather dashboard](Assets/06-server-side-apis-homework-demo.png)
## Credits
The following resources were used in this project:

- [Bootstrap](https://getbootstrap.com/)
- [Font Awesome](https://fontawesome.com/)
- [jQuery](https://jquery.com/)
- [Moment.js](https://momentjs.com/)

The UV Index Scale was obtained from the [US EPA](https://www.epa.gov/sunsafety/uv-index-scale-0)

The mock-up image was provided by [Trilogy Education Services](https://trilogyed.com/)
## License
MIT License