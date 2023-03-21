
// Get the search button and input field elements from HTML
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');

// Get current weather and forecast elements from the HTML 
const currentWeather = document.querySelector('.current-weather');
const forecast = document.querySelector('.forecast');

const API_KEY = 'be8b0bf49f610bdd05dfa3b9a8045a91'; // Set API from OpenWeather

// Add event listener to the search button
searchBtn.addEventListener('click', () => {

  // Get trimmed value of the city input field
  const cityName = cityInput.value.trim();

  if (cityName) { // If city is not empty fetch weather and forecast for the city
    fetchCurrentWeather(cityName);
    fetchWeatherForecast(cityName);
  } else {  // Else throw error to user if city cant be found
    alert('Please enter a valid city name.');
  }
});

// Asynchronous function to fetch the current weather for a city
async function fetchCurrentWeather(cityName) {
  try {
    
    // Fetching weather from OpenWeather API
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);
    
    // Parse response as JSON
    const data = await response.json();
    
    // If response is 200 (success) update weather display with the fetched data
    if (data.cod === 200) {
      updateCurrentWeather(data);
    } else {  // Else throw error to the user
      alert('City not found. Please try again.');
    }
  } catch (error) { // If error while fetching data, log the error to console
    console.error('Error fetching current weather data:', error);
  }
}

// Function that updates current weather with fetched data
function updateCurrentWeather(data) {
  
  // Create HTML string with the current data
  const html = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <h3>${data.weather[0].main}</h3>
    <h4>Temperature: ${data.main.temp}°C</h4>
  `;
  currentWeather.innerHTML = html; // Set the HTML content of the current weather element to created HTML string
}

// Asynchronous function to fetch the weather forecast for a given city
async function fetchWeatherForecast(cityName) {
  try {

    // Feth weather forecast data from OpenWeather API
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`);
    
    // Parse response as JSON
    const data = await response.json();
    
    // If response is successful update forecast display with fetched data
    if (data.cod === "200") {
      updateWeatherForecast(data.list);
    } else {  // Else throw error to user
      alert('City not found. Please try again.');
    }
  } catch (error) { // If there is an error log it to the console
    console.error('Error fetching weather forecast data:', error);
  }
}

// Function to update the forecast display with fetched data
function updateWeatherForecast(data) {

  // Initialize empty HTML string for the display
  let html = '<h2>Forecast</h2>';

  // Loop through each item in the fetched data array
  data.forEach((weather, index) => {

    // Checking if index is divisible by 8
    if (index % 8 === 0) { // Show forecast for every 24 hours
      
      // Create an HTML string for each forecast item
      html += `
        <div>
          <h4>${new Date(weather.dt * 1000).toLocaleDateString()}</h4>
          <p>${weather.weather[0].main}</p>
          <p>Temp: ${weather.main.temp}°C</p>
        </div>
      `;
    }
  });

  // Set the HTML content of the forecast element to the created HTML string
  forecast.innerHTML = html;
}
