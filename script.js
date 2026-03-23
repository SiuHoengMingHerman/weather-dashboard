const apiKey = "4dbeba226f2a0db02deb3ccc19887b55";
const input = document.getElementById("cityInput");
const list = document.getElementById("autocomplete-list");

let selectedCity = null;

function getWeather() {
    if (!selectedCity) {
        alert("Please select a city from the list");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${selectedCity.lat}&lon=${selectedCity.lon}&appid=${apiKey}&units=metric`)
        .then(res => res.json())
        .then(data => displayWeather(data));
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


input.addEventListener("input", function () {
    const value = this.value.trim();

    list.innerHTML = "";
    if (value.length < 2) return; // wait for 2 chars

    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${apiKey}`)
        .then(res => res.json())
        .then(data => {
            list.innerHTML = "";

            data.forEach(city => {
                const item = document.createElement("div");
                item.classList.add("autocomplete-item");

                let cityLabel = `${city.name}`;
                if (city.state) cityLabel += `, ${city.state}`;
                cityLabel += ` (${city.country})`;

                item.textContent = cityLabel;

                item.onclick = () => {
                    input.value = cityLabel;
                    selectedCity = {
                        name: city.name,
                        lat: city.lat,
                        lon: city.lon
                    };
                    list.innerHTML = "";
                };

                list.appendChild(item);
            });
        });
});


document.addEventListener("click", function(e) {
    if (e.target !== input) {
        list.innerHTML = "";
    }
});
