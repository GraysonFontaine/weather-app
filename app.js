const apiKey = "9472414d1b05388af4def51060d6a6f0";

function getWeather() {
  // 1. Grab what the user typed
  const city = document.getElementById("cityInput").value;
  const errorMsg = document.getElementById("errorMsg");
  const weatherCard = document.getElementById("weatherCard");

  // 2. Clear any previous results or errors
  errorMsg.textContent = "";
  weatherCard.style.display = "none";

  // 3. Check the user actually typed something
  if (!city) {
    errorMsg.textContent = "Please enter a city name.";
    return;
  }

  // 4. Build the API URL
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  // 5. Fetch the weather data
  fetch(url)
    .then(response => response.json())
    .then(data => {

      // 6. If city not found, show error
      if (data.cod === "404") {
        errorMsg.textContent = "City not found. Please try again.";
        return;
      }

      // 7. Fill in the weather card with real data
      document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
      document.getElementById("temperature").textContent = `🌡️ Temp: ${data.main.temp}°C`;
      document.getElementById("description").textContent = `☁️ ${data.weather[0].description}`;
      document.getElementById("humidity").textContent = `💧 Humidity: ${data.main.humidity}%`;
      document.getElementById("wind").textContent = `💨 Wind: ${data.wind.speed} m/s`;

      // 8. Show the card
      weatherCard.style.display = "block";
    })
    .catch(error => {
      errorMsg.textContent = "Something went wrong. Check your internet connection.";
    });
}

// Allow pressing Enter to search
document.getElementById("cityInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    getWeather();
  }
});