let searchInput = document.querySelector('#search-input');
let searchButton = document.querySelector('#searchbtn');
let cityName = document.querySelector('#cityname');
let currentDate = document.querySelector('#current-date');
let currentTemp = document.querySelector('#temperature');
let currentWind = document.querySelector('#wind-speed');
let currentUv = document.querySelector('#uv-index');
let currentHumidity = document.querySelector('#humidity');
let currentIcon = document.querySelector('#icon');
let currentCondition = document.querySelector('#description');
let history = document.querySelector('#search-history');

let forecastDayOneDate = document.querySelector('#forecast-one');
let forecastDayTwoDate = document.querySelector('#forecast-two');
let forecastDayThreeDate = document.querySelector('#forecast-three');
let forecastDayFourDate = document.querySelector('#forecast-four');
let forecastDayFiveDate = document.querySelector('#forecast-five');
let forecastDayOneTemp = document.querySelector('#dayone-temp');
let forecastDayOneHumidity = document.querySelector('#dayone-humidity');
let forecastDayTwoTemp = document.querySelector('#daytwo-temp');
let forecastDayTwoHumidity = document.querySelector('#daytwo-humidity');

let forecastDayThreeTemp = document.querySelector('#daythree-temp');
let forecastDayThreeHumidity = document.querySelector('#daythree-humidity');
let forecastDayFourTemp = document.querySelector('#dayfour-temp');
let forecastDayFourHumidity = document.querySelector('#dayfour-humidity');
let forecastDayFiveTemp = document.querySelector('#dayfive-temp');
let forecastDayFiveHumidity = document.querySelector('#dayfive-humidity');

function handleSearchFormSubmit(event) {
    event.preventDefault();

    let searchInputVal = document.querySelector('#search-input').value;

    if (!searchInputVal) {
        console.error('Please enter a valid city!');
        return;
    } else {
        getWeather(searchInputVal);
        getForecast(searchInputVal);
        printHistory(searchInputVal);
        searchClear();
    }
}

let searchClear = function () {
    searchInput.value = '';
}

let printHistory = function (city) {

    let cityCaps = city.charAt(0).toUpperCase() + city.slice(1);

    let capitalize = (s) => {
        if (typeof s !== 'string') return '';
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    capitalize(city);

    let searchItem = document.createElement('a');

    searchItem.setAttribute('href', '#');

    searchItem.setAttribute('class', 'list-group-item list-group-item-action');

    let searchItemAdd = cityCaps;

    searchItem.setAttribute('data-city', city);

    searchItem.innerHTML = searchItemAdd;
    history.appendChild(searchItem);

}

let buttonClickHandler = function (event) {
    let newCity = event.target.getAttribute('data-city');

    if (newCity) {
        getWeather(newCity);
        getForecast(newCity);
    };
};

let getWeather = function (city) {
    let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial' + '&appid=e1cda767f020cb0ebf52c83958433ba3';

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayWeather(data, city);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to OpenWeatherMap');
        });
};

let getForecast = function (city) {
    let forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial' + '&appid=e1cda767f020cb0ebf52c83958433ba3';

    fetch(forecastUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayForecast(data);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to OpenWeatherMap');
        });
};

let displayForecast = function (data) {
    if (data.length === 0) {
        cityName.textContent = 'No weather data found for that city.';
        return;
    }

    let forecastDateOne = moment().add(1, 'day').format('ddd - M/DD/YY');
    let forecastDateTwo = moment().add(2, 'days').format('ddd - M/DD/YY');
    let forecastDateThree = moment().add(3, 'days').format('ddd - M/DD/YY');
    let forecastDateFour = moment().add(4, 'days').format('ddd - M/DD/YY');
    let forecastDateFive = moment().add(5, 'days').format('ddd - M/DD/YY');

    let dayOneTemp = data.list[4].main.temp;
    let dayOneHumidity = data.list[4].main.humidity;
    let dayTwoTemp = data.list[12].main.temp;
    let dayTwoHumidity = data.list[12].main.humidity;
    let dayThreeTemp = data.list[20].main.temp;
    let dayThreeHumidity = data.list[20].main.humidity;
    let dayFourTemp = data.list[28].main.temp;
    let dayFourHumidity = data.list[28].main.humidity;
    let dayFiveTemp = data.list[36].main.temp;
    let dayFiveHumidity = data.list[36].main.humidity;

    let dayOneIcon = 'http://openweathermap.org/img/wn/' + data.list[4].weather[0].icon + '@2x.png';
    let dayTwoIcon = 'http://openweathermap.org/img/wn/' + data.list[12].weather[0].icon + '@2x.png';
    let dayThreeIcon = 'http://openweathermap.org/img/wn/' + data.list[20].weather[0].icon + '@2x.png';
    let dayFourIcon = 'http://openweathermap.org/img/wn/' + data.list[28].weather[0].icon + '@2x.png';
    let dayFiveIcon = 'http://openweathermap.org/img/wn/' + data.list[36].weather[0].icon + '@2x.png';

    document.getElementById('dayoneicon').src = dayOneIcon;
    document.getElementById('daytwoicon').src = dayTwoIcon;
    document.getElementById('daythreeicon').src = dayThreeIcon;
    document.getElementById('dayfouricon').src = dayFourIcon;
    document.getElementById('dayfiveicon').src = dayFiveIcon;

    forecastDayOneDate.textContent = forecastDateOne;
    forecastDayTwoDate.textContent = forecastDateTwo;
    forecastDayThreeDate.textContent = forecastDateThree;
    forecastDayFourDate.textContent = forecastDateFour;
    forecastDayFiveDate.textContent = forecastDateFive;

    forecastDayOneTemp.textContent = 'Temp: ' + dayOneTemp + ' °F';
    forecastDayOneHumidity.textContent = 'Humidity: ' + dayOneHumidity + '%';
    forecastDayTwoTemp.textContent = 'Temp: ' + dayTwoTemp + ' °F';
    forecastDayTwoHumidity.textContent = 'Humidity: ' + dayTwoHumidity + '%';
    forecastDayThreeTemp.textContent = 'Temp: ' + dayThreeTemp + ' °F';
    forecastDayThreeHumidity.textContent = 'Humidity: ' + dayThreeHumidity + '%';
    forecastDayFourTemp.textContent = 'Temp: ' + dayFourTemp + ' °F';
    forecastDayFourHumidity.textContent = 'Humidity: ' + dayFourHumidity + '%';
    forecastDayFiveTemp.textContent = 'Temp: ' + dayFiveTemp + ' °F';
    forecastDayFiveHumidity.textContent = 'Humidity: ' + dayFiveHumidity + '%';

}

let displayWeather = function (data) {
    if (data.length === 0) {
        cityName.textContent = 'No weather data found for that city.';
        return;
    }

    let citySearched = data.name;
    let temp = data.main.temp + ' °F / Feels Like: ' + data.main.feels_like + ' °F';
    let time = moment().format('dddd, MMMM Do, YYYY');
    
    let humidity = data.main.humidity + '%';
    let windspeed = data.wind.speed + ' MPH';
    let showIcon = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png';
    let condition = data.weather[0].description;

    cityName.textContent = citySearched;
    currentDate.textContent = time;
    currentTemp.textContent = 'Temperature: ' + temp;
    currentHumidity.textContent = 'Humidity: ' + humidity;
    currentWind.textContent = 'Wind Speed: ' + windspeed;
    document.getElementById('icon').src = showIcon;
    currentCondition.textContent = 'Right now: ' + condition;
    
};

searchButton.addEventListener('click', handleSearchFormSubmit);
history.addEventListener('click', buttonClickHandler);
