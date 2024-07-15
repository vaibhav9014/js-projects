const apiKey = "10a52ad0da4333bb1ad224b32b1e1353";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search-box");
const searchBtn = document.querySelector(".search-btn");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();

    if (response.status === 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.height = "auto";
    } else {
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        const weatherCondition = data.weather[0].main.toLowerCase();
        weatherIcon.src = `images/${weatherCondition}.png`;

        document.querySelector(".weather").classList.remove("loading");
        document.body.style.height = "auto";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

// Initially show the loading state
document.querySelector(".weather").classList.add("loading");
document.body.style.height = "100vh";