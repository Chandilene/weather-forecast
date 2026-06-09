const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

const getWeatherData = async (city) => {
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

  const response = await fetch(apiWeatherURL);
  const data = await response.json();

  console.log(data);
  return data;
};

const showWeatherData = async (city) => {
  const data = await getWeatherData(city);

  const countryCode = data.sys.country;

  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp);
  descElement.innerText = data.weather[0].description;
  weatherIconElement.setAttribute(
    "src",
    `https://openweathermap.org/payload/api/media/file/${data.weather[0].icon}.png`,
  );

  countryElement.setAttribute(
    "src",
    `https://flagsapi.com/${countryCode}/shiny/64.png`,
  );

  humidityElement.innerText = `${data.main.humidity}%`;
  windElement.innerText = `${data.wind.speed}km/h`;
  weatherContainer.classList.remove("hide");
};

const getImageCities = async (city) => {
  const query = `cidade ${city}`;
  const unsplashURL = `https://api.unsplash.com/search/photos?client_id=${Access_Key}&orientation=landscape&query=${encodeURIComponent(query)}`;

  const response = await fetch(unsplashURL);
  const dataCity = await response.json();
  console.log(dataCity);
  return dataCity;
};

const showImageCity = async (city) => {
  const data = await getImageCities(city);
  const bgBody = document.body;

  if (data.results && data.results.length > 0) {
    const urlImage = data.results[0].urls.full;
    bgBody.style.backgroundImage = `url(${urlImage})`;
  } else {
    bgBody.style.backgroundImage = "url('./assets/cityDefault.jpg')";
  }

  bgBody.style.backgroundSize = "cover";
  bgBody.style.backgroundPosition = "center";
  bgBody.style.backgroundRepeat = "no-repeat";
};

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const city = cityInput.value;
  showWeatherData(city);
  getImageCities(city);
  showImageCity(city);
});

cityInput.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    const city = e.target.value;

    showWeatherData(city);
    getImageCities(city);
    showImageCity(city);
  }
});
