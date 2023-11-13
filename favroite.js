document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('search-form');
    const searchBox = document.getElementById('search-box');
    const favoritesList = document.getElementById('favorites-list');
    const locationDisplay = document.getElementById('location-display');
    const temperatureDisplay = document.getElementById('temperature-display');
    const favoriteButton = document.getElementById('favorite-button');
    const apiKey = '2c4fe195f69547fda56145444230211'; // Replace with your actual API key

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const location = searchBox.value;
        fetchWeatherData(location);
    });

    favoriteButton.addEventListener('click', function() {
        const location = locationDisplay.textContent;
        const temperature = temperatureDisplay.textContent;
        if (location && temperature) {
            saveFavoriteLocation(location, temperature);
        }
    });

    async function fetchWeatherData(location) {
        const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}`;
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            const temperature = data.current.temp_c; // Adapt this according to the actual response structure
            
            // Update UI with weather data
            locationDisplay.textContent = location;
            temperatureDisplay.textContent = `Temperature: ${temperature}°C`;
            // Assuming you have an element with the ID 'weather-display' in your HTML
            document.getElementById('weather-display').style.display = 'block'; 
        } catch (error) {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather-display').style.display = 'none';
        }
    }

    function saveFavoriteLocation(location, temperature) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || {};
        favorites[location] = temperature;
        localStorage.setItem('favorites', JSON.stringify(favorites));
        displayFavorites();
    }

    function removeFavoriteLocation(location) {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || {};
        delete favorites[location];  // Remove the location from the favorites object
        localStorage.setItem('favorites', JSON.stringify(favorites));  // Save the updated favorites back to local storage
        displayFavorites();  // Update the display of favorites
    }

    function displayFavorites() {
        favoritesList.innerHTML = '';  // Clear the current list
        const favorites = JSON.parse(localStorage.getItem('favorites')) || {};
        for (const [location, temperature] of Object.entries(favorites)) {
            const listItem = document.createElement('li');
            listItem.className = 'favorite-item';

            // Create a div for the location
            const locationDiv = document.createElement('div');
            locationDiv.className = 'favorite-location';
            locationDiv.textContent = location;
            
            // Create a div for the temperature
            const temperatureDiv = document.createElement('div');
            temperatureDiv.className = 'favorite-temperature';
            temperatureDiv.textContent = ` ${temperature}`;

            // Append the location and temperature divs to the list item
            listItem.appendChild(locationDiv);
            listItem.appendChild(temperatureDiv);

            // Create a remove button for each favorite
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.className = 'remove-favorite';
            removeButton.onclick = function() {
                removeFavoriteLocation(location);
            };
            listItem.appendChild(removeButton);
            
            favoritesList.appendChild(listItem);
        }
    }

    // Call displayFavorites on load to show any saved favorites
    displayFavorites();

    const homeButton = document.getElementById('home-button');
    homeButton.addEventListener('click', function() {
        // Option 1: Navigate to the homepage or any other URL
        window.location.href = '/'; // Assuming the root is your homepage
    });
});
