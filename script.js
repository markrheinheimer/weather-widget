const weather = document.querySelector('.weather');
const goButton = document.querySelector('.submit-btn');
const displayWeather = document.querySelector('.display-weather');

goButton.addEventListener('click', () => {
  goButton.classList.add('clicked');
  setTimeout(() => {
    goButton.classList.remove('clicked');
  }, 200);
});

weather.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = cityField.value;

  async function getWeatherData() {
    const apiKey = '919012c8a99a4419a6821434232207';

    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
      );
      const data = await response.json();

      if (response.status === 200) {
        const weatherInfo = {
          city: data.location.name,
          state: data.location.region,
          description: data.current.condition.text,
          temperature: data.current.temp_f,
          humidity: data.current.humidity,
          icon: data.current.condition.icon,
        };

        displayWeatherInfo(weatherInfo);
      } else {
        console.log('Weather API request failed:', data.message);
      }
    } catch (error) {
      console.log('Error fetching weather data:', error);
    }
  }

  function displayWeatherInfo(weatherInfo) {
    const weatherDiv = document.querySelector('.display-weather');

    displayWeather.style.marginTop = '25px';

    weatherDiv.innerHTML = `<h2 class="display-header">${weatherInfo.city}, ${weatherInfo.state}</h2>
        <div class="description-icon">
          <div class="description">
            <p></p>
            <p>${weatherInfo.description}</p>
            <p>Temp: ${weatherInfo.temperature} F</p>
            <p>Humidity: ${weatherInfo.humidity} %</p>
          </div>
          <div class="icon">
            <img src="${weatherInfo.icon}" alt="sadf" />
          </div>
        </div>`;
  }
  getWeatherData();
});
