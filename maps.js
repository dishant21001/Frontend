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
  'Arlington', 'New Orleans', 'Wichita', 'Dallas',  // ... more cities if needed
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