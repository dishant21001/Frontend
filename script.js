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


document.getElementById('dark-mode-toggle').addEventListener('click', function() {
  document.body.classList.toggle('dark');
});

document.addEventListener('DOMContentLoaded', function() {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const currentTheme = localStorage.getItem('theme');
  const loginAnchor = document.querySelector('.login-btn');
    
    loginAnchor.addEventListener('click', function(event) {
        console.log('Login button clicked');
      });
      
  // Set the initial icon based on the theme
  if (currentTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      darkModeToggle.className = "fas fa-sun"; // Sun icon for dark mode
  } else {
      darkModeToggle.className = "fas fa-moon"; // Moon icon for light mode
  }

  darkModeToggle.addEventListener('click', function() {
      let theme = 'light'; 
      if (!document.documentElement.getAttribute('data-theme')) {
          theme = 'dark';
          darkModeToggle.className = "fas fa-sun"; // Switch to sun icon
      } else {
          darkModeToggle.className = "fas fa-moon"; // Switch to moon icon
      }
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme); // store the user choice
  });
});


document.addEventListener("DOMContentLoaded", function() {
  var ctx = document.getElementById('hourlyForecastChart').getContext('2d');
  var chart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"], // The hours
          datasets: [{
              label: 'Temperature (°C)',
              data: [20, 21, 22, 23, 24, 25, 24, 23, 22, 21, 20, 19], // Your temperature data
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
          }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // This ensures the graph will stretch in both width and height to fit its container
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
  });
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
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;

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
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=7&aqi=no&alerts=no`;

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






// Function to update the weather details
function updateWeatherDetails(location) {
  const apiKey = '2c4fe195f69547fda56145444230211';
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;

  fetch(url)
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
      })
      .then(data => {
          // Now, we have the data, let's update the DOM
          document.getElementById('detail-wind').textContent = `${data.current.wind_kph} km/h ${data.current.wind_dir}`;
          document.getElementById('detail-humidity').textContent = `${data.current.humidity}%`;
          document.getElementById('detail-precipitation').textContent = `${data.current.precip_mm} mm`;
          document.getElementById('detail-feelslike').textContent = `${data.current.feelslike_c}°C`;
          document.getElementById('detail-visibility').textContent = `${data.current.vis_km} km`;
      })
      .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
      });
}

// Assuming you want to call this function when the page loads,
// or when a new location is searched for:
updateWeatherDetails('Dallas'); // Replace with your default location or a search term





// Function to fetch and display the current weather
function fetchCurrentWeather(location) {
  const apiKey = '2c4fe195f69547fda56145444230211';
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Assuming you have an element with ID 'weather-location' and others for temperature, condition, etc.
      document.getElementById('weather-location').textContent = data.location.name;
      document.getElementById('weather-temperature').textContent = data.current.temp_c;
      document.getElementById('weather-condition').textContent = data.current.condition.text;
      document.getElementById('weather-humidity').textContent = data.current.humidity;
      document.getElementById('weather-wind').textContent = data.current.wind_kph;
    })
    .catch(error => {
      console.error('Error fetching the weather data: ', error);
    });
}

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



