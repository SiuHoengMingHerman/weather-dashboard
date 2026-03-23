const apiKey = "4dbeba226f2a0db02deb3ccc19887b55";

function getWeather() {
    const city = document.getElementById("cityInput").value;
    if (city === "") {
        alert("Please enter a city");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            alert("Error: " + error);
        });
}

function displayWeather(data) {
    // Check if city is invalid
    if (data.cod === "404" || data.cod === 404) {
        document.getElementById("weatherResult").innerHTML =
            "<p> City not found. Please try again.</p>";
        return;
    }

    const weatherHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p><strong>${data.weather[0].main}</strong></p>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
        <p> Temperature: ${data.main.temp}°C</p>
        <p> Humidity: ${data.main.humidity}%</p>
        <p> Wind: ${data.wind.speed} m/s</p>
    `;

    document.getElementById("weatherResult").innerHTML = weatherHTML;
}