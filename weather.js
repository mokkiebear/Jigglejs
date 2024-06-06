let state = reactive({
  selectedCity: "New York",
  weather: {
    temperature: "N/A",
    humidity: "N/A",
    description: "N/A"
  },
  isLoading: false,
});

function updateSelectedCity(city) {
  state.selectedCity = city;
  fetchWeather(city);
}

function fetchWeather(city) {
  state.isLoading = true;
  const mockWeatherData = {
    "New York": {
      temperature: '15°C',
      humidity: '55%',
      description: 'Cloudy'
    },
    "London": {
      temperature: '10°C',
      humidity: '75%',
      description: 'Rainy'
    },
    "Tokyo": {
      temperature: '22°C',
      humidity: '65%',
      description: 'Sunny'
    },
    "Sydney": {
      temperature: '25°C',
      humidity: '60%',
      description: 'Sunny'
    }
  };

  setTimeout(() => {
    state.weather = mockWeatherData[city];
    state.isLoading = false;
  }, 500);
}

function CitySelector() {
  return `<select onChange="updateSelectedCity(this.value)">
            <option value="New York">New York</option>
            <option value="London">London</option>
            <option value="Tokyo">Tokyo</option>
            <option value="Sydney">Sydney</option>
          </select>`;
}

function WeatherInfo() {
  if (state.isLoading) {
    return `<p>Loading...</p>`;
  }

  return `<p>Temperature: ${state.weather.temperature}</p>
          <p>Humidity: ${state.weather.humidity}</p>
          <p>Description: ${state.weather.description}</p>`;
}

function App() {
  return `
    ${CitySelector()}
    ${WeatherInfo()}
  `;
}

createEffect(() => {
  fetchWeather(state.selectedCity);
});

createEffect(() => {
  console.log('re-render', state.isLoading);
  render("#app", App());
});