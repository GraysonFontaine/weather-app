const apiKey = "9472414d1b05388af4def51060d6a6f0";
let currentUnit = "metric"; // metric = Celsius, imperial = Fahrenheit
let currentCity = "";

function getWeather() {
  const city = document.getElementById("cityInput").value;
  const errorMsg = document.getElementById("errorMsg");
  const weatherCard = document.getElementById("weatherCard");

  errorMsg.textContent = "";
  weatherCard.style.display = "none";

  if (!city) {
    errorMsg.textContent = "Please enter a city name.";
    return;
  }

  currentCity = city;
  fetchWeather(currentCity, currentUnit);
}

function fetchWeather(city, unit) {
  const errorMsg = document.getElementById("errorMsg");
  const weatherCard = document.getElementById("weatherCard");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === "404") {
        errorMsg.textContent = "City not found. Please try again.";
        return;
      }

      const unitSymbol = unit === "metric" ? "°C" : "°F";

      document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
      document.getElementById("temperature").textContent = `🌡️ Temp: ${data.main.temp} ${unitSymbol}`;
      document.getElementById("description").textContent = `☁️ ${data.weather[0].description}`;
      document.getElementById("humidity").textContent = `💧 Humidity: ${data.main.humidity}%`;
      document.getElementById("wind").textContent = `💨 Wind: ${data.wind.speed} m/s`;

      weatherCard.style.display = "block";
    })
    .catch(error => {
      errorMsg.textContent = "Something went wrong. Check your internet connection.";
    });
}

function toggleUnit() {
  // Switch between metric and imperial
  currentUnit = currentUnit === "metric" ? "imperial" : "metric";

  // Update button text
  document.getElementById("unitBtn").textContent =
    currentUnit === "metric" ? "Switch to °F" : "Switch to °C";

  // If a city has already been searched, refresh with new unit
  if (currentCity) {
    fetchWeather(currentCity, currentUnit);
  }
}

document.getElementById("cityInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    getWeather();
  }
});

function toggleDarkMode() {
  document.body.classList.toggle("dark");

  const btn = document.getElementById("darkModeBtn");
  if (document.body.classList.contains("dark")) {
    btn.textContent = "Light Mode";
  } else {
    btn.textContent = "Dark Mode";
  }
}