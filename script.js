const API_KEY = "b67896308a6914ec3d6b2e6194f6ba04";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const weatherCard = document.getElementById("weatherCard");
const message = document.getElementById("message");

const cityName = document.getElementById("cityName");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");

const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const feelsLike = document.getElementById("feelsLike");
const pressure = document.getElementById("pressure");


// Fetch weather information
const getWeather = async () => {

    const city = cityInput.value.trim();

    // Validate input
    if (city === "") {
        message.textContent = "Please enter a city name.";
        weatherCard.style.display = "none";
        return;
    }

    message.textContent = "Fetching weather information...";
    weatherCard.style.display = "none";

    try {

        const API_URL =
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

        // Fetch API
        const response = await fetch(API_URL);

        // Handle HTTP errors
        if (!response.ok) {

            if (response.status === 404) {
                throw new Error("City not found. Please enter a valid city name.");
            }

            if (response.status === 401) {
                throw new Error("Invalid API key.");
            }

            throw new Error("Unable to retrieve weather information.");
        }

        // Convert response to JSON
        const data = await response.json();

        // Display weather data
        displayWeather(data);

        message.textContent = "";

    } catch (error) {

        console.error(error);

        message.textContent = error.message;
        weatherCard.style.display = "none";
    }
};


// Display weather information
const displayWeather = (data) => {

    cityName.textContent =
        `${data.name}, ${data.sys.country}`;

    temperature.textContent =
        `${Math.round(data.main.temp)} °C`;

    condition.textContent =
        data.weather[0].description;

    humidity.textContent =
        `${data.main.humidity}%`;

    windSpeed.textContent =
        `${data.wind.speed} m/s`;

    feelsLike.textContent =
        `${Math.round(data.main.feels_like)} °C`;

    pressure.textContent =
        `${data.main.pressure} hPa`;

    // Weather icon
    const iconCode = data.weather[0].icon;

    weatherIcon.src =
        `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    weatherIcon.alt =
        data.weather[0].description;

    // Display card
    weatherCard.style.display = "block";
};


// Search button event
searchBtn.addEventListener("click", getWeather);


// Allow pressing Enter
cityInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        getWeather();
    }

});