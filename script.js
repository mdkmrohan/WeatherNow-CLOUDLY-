const API_KEY = 'c7435134311cfa82e41176e9434d06a3';
const cityElem = document.getElementById('city');
const descriptionElem = document.getElementById('description');
const tempC = document.getElementById('temp-c');
const tempF = document.getElementById('temp-f');
const tempK = document.getElementById('temp-k');
const iconElem = document.getElementById('weather-icon');
const searchBox = document.getElementById('search-box');
const searchBtn = document.getElementById('search-btn');
const toggleBtn = document.getElementById('dark-toggle');

function kelvinToC(k) {
  return (k - 273.15).toFixed(1);
}
function kelvinToF(k) {
  return ((k - 273.15) * 9 / 5 + 32).toFixed(1);
}

function updateWeather(data) {
  const { name } = data;
  const { icon, description } = data.weather[0];
  const { temp } = data.main;

  cityElem.textContent = name;
  descriptionElem.textContent = description;
  tempC.textContent = kelvinToC(temp);
  tempF.textContent = kelvinToF(temp);
  tempK.textContent = temp.toFixed(1);
  iconElem.src = `https://openweathermap.org/img/wn/${icon}@4x.png`;
  iconElem.alt = description;
}

function getWeatherByCoords(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    .then(res => res.json())
    .then(updateWeather)
    .catch(err => alert('Error fetching weather data.'));
}

function getWeatherByCity(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
    .then(res => res.json())
    .then(updateWeather)
    .catch(err => alert('City not found.'));
}

window.onload = () => {
  getWeatherByCity('Dhaka');

  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       const { latitude, longitude } = position.coords;
  //       getWeatherByCoords(latitude, longitude);
  //     },
  //     () => {
  //       console.log('Location permission denied. Showing default weather.');
  //     }
  //   );
  // }
};

searchBtn.addEventListener('click', () => {
  const city = searchBox.value.trim();
  if (city !== ''){
    getWeatherByCity(city)
  };
});

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    toggleBtn.classList.toggle('active');
  });
};
