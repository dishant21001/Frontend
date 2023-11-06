let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
  navbar.classList.toggle('active');
}

document.querySelector('#close-navbar').onclick = () =>{
  navbar.classList.remove('active');
}

let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
  searchForm.classList.toggle('active');
}

window.onscroll = () => {
  navbar.classList.remove('active');
  searchForm.classList.remove('active');
}


// Add this inside your script tag or a JavaScript file
function toggleDarkMode() {
  const body = document.body;
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  
  // Toggle the "dark-mode" class on the body
  body.classList.toggle('dark-mode');
  
  // Change the icon or text of the dark mode toggle button accordingly
  if (body.classList.contains('dark-mode')) {
      darkModeToggle.classList.replace('fa-moon', 'fa-sun');
  } else {
      darkModeToggle.classList.replace('fa-sun', 'fa-moon');
  }
}

  //COnvert Celius to F button
  let tempBtn = document.getElementById("tempUnit");
  const toggleUnit = () => {
    // Write your code to manipulate the DOM here
  document.body.classList.toggle("cmode");
      if (document.body.classList.contains("cmode")) 
      {
            tempBtn.innerHTML ="°F " ;
      } 
      else {
            tempBtn.innerHTML = "°C";
      }
  }
  tempBtn.addEventListener("click", toggleUnit);
  
// Attach the event listener to the dark mode toggle button
document.getElementById('dark-mode-toggle').addEventListener('click', toggleDarkMode);




document.addEventListener("DOMContentLoaded", function() {
  var ctx = document.getElementById('hourlyForecastChart').getContext('2d');
  var chart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: ["00:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00",
                   "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"], // The hours
          datasets: [{
              label: 'Temperature (°C)',
              data: [], // Initialize empty data array
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
          }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
      }
  });

  // Function to fetch data and update the chart
  function fetchDataAndUpdateChart(location) {
    const apiKey = '2c4fe195f69547fda56145444230211';
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&hours=24`;

    try {
      fetch(url)
      .then(response => response.json())
      .then(data => {
        forecastData = data.forecast.forecastday[0].hour.map(hour => hour.temp_c);
        chart.data.datasets[0].data = forecastData;
        chart.update();
      });
    } catch (error) {
      console.error("Error fetching real-time data: ", error);
      throw error; // Rethrow the error to be caught by the calling function
    }
  }

  document.querySelector('#search-box').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      const location = this.value.trim();
      console.log(location);
      fetchDataAndUpdateChart(location);
      fetch7DayForecast(location);
      fetchCurrentWeather(location);
    }
  });

  fetchDataAndUpdateChart('Dallas');

  // Set interval to fetch data every 60000 milliseconds (1 minute)
  setInterval(fetchDataAndUpdateChart(location), 60000);
});



new Swiper('.forecast-grid', {
  slidesPerView: 4, // Default is 4 slides per view
  spaceBetween: 10,
  breakpoints: {
      640: {
          slidesPerView: 2,
          spaceBetween: 10,
      },
      768: {
          slidesPerView: 3,
          spaceBetween: 10,
      },
      1024: {
          slidesPerView: 4,
          spaceBetween: 10,
      },
  }
});


// script.js

// Function to fetch current weather
function fetchCurrentWeather(location) {
  const apiKey = '2c4fe195f69547fda56145444230211';
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data && data.current) {
        document.getElementById('weather-location').textContent = location;
        document.getElementById('weather-temperature').textContent = data.current.temp_c;
        document.getElementById('weather-condition').textContent = data.current.condition.text;
        document.getElementById('weather-humidity').textContent = data.current.humidity;
        document.getElementById('weather-wind').textContent = data.current.wind_kph;
      }
    })
    .catch(error => {
      console.error('Error fetching current weather data:', error);
    });
}

// Function to fetch forecast
function fetchForecast(location) {
  const apiKey = '2c4fe195f69547fda56145444230211';
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=7&aqi=no&alerts=no`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data && data.forecast) {
        // Update the forecast section with the data
        // You would loop through the forecast data and create HTML elements for each day
      }
    })
    .catch(error => {
      console.error('Error fetching forecast data:', error);
    });
}



// Initial call to fetch weather for a default location
fetchCurrentWeather('Dallas');
fetchForecast('Dallas');






// Function to fetch and display the 7-day forecast
function fetch7DayForecast(location) {
  const apiKey = '2c4fe195f69547fda56145444230211';
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=7&aqi=no&alerts=no`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const forecastGrid = document.querySelector('.forecast-grid');
      forecastGrid.innerHTML = ''; // Clear any existing content

      data.forecast.forecastday.forEach(day => {
        const forecastDayElem = document.createElement('div');
        forecastDayElem.className = 'forecast-day';
        forecastDayElem.innerHTML = `
          <h3>${new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}</h3>
          <p>High: ${day.day.maxtemp_c}°C</p>
          <p>Low: ${day.day.mintemp_c}°C</p>
          <p>Condition: ${day.day.condition.text}</p>
        `;
        forecastGrid.appendChild(forecastDayElem);
      });
    })
    .catch(error => {
      console.error('Error fetching the forecast data: ', error);
    });
}

// Example calls with a default location
fetchCurrentWeather('Dallas');
fetch7DayForecast('Dallas');

// You would also want to call these functions whenever the search box is used
document.querySelector('#search-box').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    fetchCurrentWeather(this.value);
    fetch7DayForecast(this.value);
  }
});



const apiKey = '2c4fe195f69547fda56145444230211';
let mymap = L.map('mapid').setView([37.8, -96], 4); // Adjust the view to center on the US

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(mymap);

let markerGroup = L.layerGroup().addTo(mymap);

// List of major cities in the USA
const cities = [
  'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
  'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
  'Austin', 'Jacksonville', 'San Francisco', 'Columbus', 'Charlotte',
  'Indianapolis', 'Seattle', 'Denver', 'Washington', 'Boston',
  'El Paso', 'Nashville', 'Detroit', 'Oklahoma City', 'Portland',
  'Las Vegas', 'Memphis', 'Louisville', 'Baltimore', 'Milwaukee',
  'Albuquerque', 'Tucson', 'Fresno', 'Sacramento', 'Kansas City',
  'Atlanta', 'Miami', 'Colorado Springs', 'Raleigh', 'Omaha',
  'Long Beach', 'Virginia Beach', 'Oakland', 'Minneapolis', 'Tulsa',
  'Arlington', 'New Orleans', 'Wichita', 'Dallas' // ... more cities if needed
];

// Function to update the weather data and place markers on the map
function updateWeatherForUSACities() {
  cities.forEach(city => {
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Create a marker for the city and add it to the map
        const marker = L.marker([data.location.lat, data.location.lon]).addTo(markerGroup);

        // Create a popup with the current temperature
        marker.bindPopup(`<b>${city}</b><br>Temperature: ${data.current.temp_c}°C`).openPopup();
      })
      .catch(error => {
        console.error(`Error fetching data for ${city}:`, error);
      });
  });
}

// Initial update
updateWeatherForUSACities();

// Update weather every 30 minutes
setInterval(updateWeatherForUSACities, 1800000);





// Function to fetch weather data
async function fetchWeatherData(location) {
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=7&aqi=no&alerts=no`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Weather data could not be retrieved for that location.');
    }
    const data = await response.json();
    updateWeatherData(data);
  } catch (error) {
    alert(error.message);
  }
}

// Function to update HTML elements with new weather data
function updateWeatherData(data) {
  
  document.getElementById('weather-location').textContent = data.location.name;
  document.getElementById('weather-temperature').textContent = `${data.current.temp_c}`;
  document.getElementById('weather-condition').textContent = data.current.condition.text;
  document.getElementById('weather-humidity').textContent = `${data.current.humidity}%`;
  document.getElementById('weather-wind').textContent = `${data.current.wind_kph} kph`;
  document.getElementById('weather-sunrise').textContent = data.forecast.forecastday[0].astro.sunrise;
  document.getElementById('weather-sunset').textContent = data.forecast.forecastday[0].astro.sunset;
  document.getElementById('detail-wind').textContent = `${data.current.wind_kph} km/h ${data.current.wind_dir}`;
  document.getElementById('detail-humidity').textContent = data.current.humidity;
  document.getElementById('detail-precipitation').textContent = data.current.precip_mm;
  document.getElementById('detail-feelslike').textContent = data.current.feelslike_c;
  document.getElementById('detail-visibility').textContent = data.current.vis_km;
  // ...Update other elements as needed
}

// Event listener for the search form submission
document.querySelector('.search-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const searchBox = document.getElementById('search-box');
  const location = searchBox.value.trim();
  if (location) {
    fetchWeatherData(location);
  } else {
    alert('Please enter a location to search.');
  }
});





// Function to fetch and display the sunrise and sunset times
function displaySunriseSunset() {
  // API Key should ideally not be hardcoded in production, but for the sake of this example, we'll include it here
  const apiKey = '2c4fe195f69547fda56145444230211';

  // Function to get the current date in YYYY-MM-DD format
  function getCurrentDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  // Define the location for which you want the weather details
  const location = 'dallas'; // Replace with the location you want

  // Create the URL for the API request
  const url = `http://api.weatherapi.com/v1/astronomy.json?key=${apiKey}&q=${location}&dt=${getCurrentDate()}`;

  // Fetch data from the weather API
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      // Extract the sunrise and sunset times from the API response
      const sunrise = data.astronomy.astro.sunrise;
      const sunset = data.astronomy.astro.sunset;

      // Update the HTML elements with the sunrise and sunset times
      document.getElementById('weather-sunrise').textContent = sunrise;
      document.getElementById('weather-sunset').textContent = sunset;
    })
    .catch(error => {
      console.error('Failed to fetch sunrise and sunset data: ', error);
      // Here you could update the HTML to show an error message if desired
    });
}

// Call the function to update the sunrise and sunset times
displaySunriseSunset();



// Wait for the DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {
  var heartIcon = document.querySelector('.fa-heart');
  var savedLocations = JSON.parse(localStorage.getItem('savedLocations')) || [];

  // Update the icon based on whether the location is already saved
  updateHeartIcon();

  heartIcon.addEventListener('click', function() {
      var location = document.getElementById('weather-location').textContent;

      // Check if the location is already saved
      if (heartIcon.classList.contains('active')) {
          // Remove from the saved list
          savedLocations = savedLocations.filter(item => item !== location);
          heartIcon.classList.remove('active');
      } else {
          // Add to the saved list
          savedLocations.push(location);
          heartIcon.classList.add('active');
      }

      // Update local storage
      localStorage.setItem('savedLocations', JSON.stringify(savedLocations));
  });

  function updateHeartIcon() {
      var location = document.getElementById('weather-location').textContent;
      if (savedLocations.includes(location)) {
          heartIcon.classList.add('active');
      } else {
          heartIcon.classList.remove('active');
      }
  }
});



