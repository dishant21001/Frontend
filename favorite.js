import { auth, database, onAuthStateChanged, ref, push, onValue, get, remove } from "./firebaseConfig.js";

//Autocomplete
let handlerData = new Promise((resolve, reject) => {
    document.addEventListener('DOMContentLoaded',() => {
        // Listen for changes in authentication state
        onAuthStateChanged(auth,(user) => {
            let locationValues;
            if (user) {
                const userId = user.uid;

                const input = document.getElementById('search-input');
                        const options = {
                            types: ['(cities)'],
                            fields: ["formatted_address", "geometry", "name"],
                            strictBounds: false,
                        };
                const autocomplete = new google.maps.places.Autocomplete(input, options);
        
                autocomplete.addListener("place_changed", async () => {
                    const place = autocomplete.getPlace().name;
                
                    // Reference to the user's location node
                    const locationRef = ref(database, 'users/' + userId + '/location');
                
                    // Check if the location already exists
                    get(locationRef)
                        .then((snapshot) => {
                            const existingLocations = snapshot.val();
                
                            if (existingLocations && Object.values(existingLocations).includes(place)) {
                                console.log('Location already exists for this user.');
                            } else {
                                // Add the new location to the user's locations
                                push(locationRef, place)
                                    .then(() => {
                                        console.log('Location added successfully');
                                        location.reload();
                                    })
                                    .catch((error) => {
                                        console.log('Error adding location:', error);
                                    });
                            }
                        })
                        .catch((error) => {
                            console.log('Error checking existing locations:', error);
                            resolve(weatherInformation);
                        });
                });

                // Retrieve location from Firebase
                onValue(ref(database, 'users/'+ userId + '/location'), (snapshot) => {
                    if (snapshot.exists()) {
                        const locations = snapshot.val();
        
                        // Extract just the values (locations) from the object
                        locationValues = Object.values(locations);
    
                        const apiKey = '2c4fe195f69547fda56145444230211';
                        const weatherInformation = [];
                        const fetchPromises = locationValues.map(async city => {
                            const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&hours=24&aqi=yes`;
                            try {
                                const response = await fetch(url);
                                const data = await response.json();
                                // Extract relevant weather information from the API response
                                const locationName = data.location.name;
                                const currentTemp = data.current.temp_f;
                                const windSpeed = data.current.wind_kph;
                                const humidity = data.current.humidity;
                                const sunrise = data.forecast.forecastday[0].astro.sunrise;
                                const sunset = data.forecast.forecastday[0].astro.sunset;
                                let airQuality = data.current.air_quality["us-epa-index"];
                                const precipitation = data.forecast.forecastday[0].day.totalprecip_mm;

                                // Check air quality and update it
                                if (airQuality < 51) {
                                    airQuality = 'Good' ;
                                } else if (airQuality > 50 && airQuality < 101) {
                                    airQuality = 'Moderate' ;
                                } else if (airQuality > 100) {
                                     airQuality = 'Unhealthy';
                                } else {
                                    airQuality = 'Unknown' ;
                                }

                                // Store the information in the weatherInformation object
                                weatherInformation[city] = {
                                    locationName,
                                    currentTemp,
                                    windSpeed,
                                    humidity,
                                    sunrise,
                                    sunset,
                                    airQuality,
                                    precipitation,
                                };
                            } catch (error) {
                                console.error(`Error fetching data for ${city}:`, error);
                            }
                        });

                        // Wait for all fetch promises to resolve
                        Promise.all(fetchPromises)
                            .then(() => {
                                resolve(weatherInformation);
                            })
                            .catch(error => {
                                reject(error);
                            });
    
                    } else {
                        console.log('User has no locations');
                    }
                });
    
            } else {
                console.log('User is not authenticated');
            }
    
        });
    });
});


// Data for each location container
async function displayData(){
    try {
        // Clear existing place containers
        const dynamicContainer = document.getElementById('dynamic-container');
        dynamicContainer.innerHTML = '';
        const weatherData = Object.values(await handlerData);    

            weatherData.forEach(data => {
                let placeContainer = document.createElement('div');
                placeContainer.classList.add('place-container');
                let placeDesc = document.createElement('div');
                placeDesc.classList.add('place-desc');

                const descContainer = document.createElement('div');
                descContainer.classList.add('temp-container');
                
                const place = document.createElement('h1');
                place.textContent = data.locationName;

                const currentTemp = document.createElement('h3');
                currentTemp.textContent = data.currentTemp + "°F";

                descContainer.appendChild(place);
                descContainer.appendChild(currentTemp);
        
                const windContainer = document.createElement('div');
                windContainer.classList.add('icon-container');
        
                const windIcon = document.createElement('img');
                windIcon.src = "//cdn-icons-png.flaticon.com/128/1506/1506761.png";
        
                const windTitle = document.createElement('h2');
                windTitle.textContent = "Wind";
        
                const wind = document.createElement('p');
                wind.textContent = data.windSpeed + " mph";
        
                windContainer.appendChild(windIcon);
                windContainer.appendChild(windTitle);
                windContainer.appendChild(wind);
        
                const humidityContainer = document.createElement('div');
                humidityContainer.classList.add('icon-container');
        
                const humidityIcon = document.createElement('img');
                humidityIcon.src = "https://cdn-icons-png.flaticon.com/128/4148/4148460.png";
        
                const humidityTitle = document.createElement('h2');
                humidityTitle.textContent = "Humidity";
        
                const humidity = document.createElement('p');
                humidity.textContent = data.humidity + " %";
        
                humidityContainer.appendChild(humidityIcon);
                humidityContainer.appendChild(humidityTitle);
                humidityContainer.appendChild(humidity);
        
                const sunriseContainer = document.createElement('div');
                sunriseContainer.classList.add('icon-container');
        
                const sunriseIcon = document.createElement('img');
                sunriseIcon.src = "https://cdn-icons-png.flaticon.com/128/3751/3751074.png";
        
                const sunriseTitle = document.createElement('h2');
                sunriseTitle.textContent = "Sunrise";
        
                const sunrise = document.createElement('p');
                sunrise.textContent = data.sunrise;
        
                sunriseContainer.appendChild(sunriseIcon);
                sunriseContainer.appendChild(sunriseTitle);
                sunriseContainer.appendChild(sunrise);
        
                const sunsetContainer = document.createElement('div');
                sunsetContainer.classList.add('icon-container');
        
                const sunsetIcon = document.createElement('img');
                sunsetIcon.src = "https://cdn-icons-png.flaticon.com/128/2272/2272244.png";
        
                const sunsetTitle = document.createElement('h2');
                sunsetTitle.textContent = "Sunset";
        
                const sunset = document.createElement('p');
                sunset.textContent = data.sunset;
        
                sunsetContainer.appendChild(sunsetIcon);
                sunsetContainer.appendChild(sunsetTitle);
                sunsetContainer.appendChild(sunset);
        
                const airQualityContainer = document.createElement('div');
                airQualityContainer.classList.add('icon-container');
        
                const airQualityIcon = document.createElement('img');
                airQualityIcon.src = "https://cdn-icons-png.flaticon.com/128/5029/5029184.png";
        
                const airQualityTitle = document.createElement('h2');
                airQualityTitle.textContent = "Air Quality";
        
                const airQuality = document.createElement('p');
                airQuality.textContent = data.airQuality;
        
                airQualityContainer.appendChild(airQualityIcon);
                airQualityContainer.appendChild(airQualityTitle);
                airQualityContainer.appendChild(airQuality);
        
                const precipitationContainer = document.createElement('div');
                precipitationContainer.classList.add('icon-container');
        
                const precipitationIcon = document.createElement('img');
                precipitationIcon.src = "https://cdn-icons-png.flaticon.com/128/4005/4005761.png";
        
                const precipitationTitle = document.createElement('h2');
                precipitationTitle.textContent = "Precipitation";
        
                const precipitation = document.createElement('p');
                precipitation.textContent = data.precipitation + " %";
        
                precipitationContainer.appendChild(precipitationIcon);
                precipitationContainer.appendChild(precipitationTitle);
                precipitationContainer.appendChild(precipitation);

                const deleteIcon = document.createElement('img');
                deleteIcon.id = data.locationName.trim();
                deleteIcon.addEventListener('click', function() {
                    deleteLocationByName(auth.currentUser.uid, this.id);
                });
                deleteIcon.src = "https://cdn-icons-png.flaticon.com/128/1828/1828843.png";
        
                placeDesc.appendChild(descContainer);
                placeDesc.appendChild(windContainer);
                placeDesc.appendChild(humidityContainer);
                placeDesc.appendChild(sunriseContainer);
                placeDesc.appendChild(sunsetContainer);
                placeDesc.appendChild(airQualityContainer);
                placeDesc.appendChild(precipitationContainer);
                placeContainer.appendChild(placeDesc);
                placeDesc.appendChild(deleteIcon);
                dynamicContainer.appendChild(placeContainer);
            });

    } catch (error) {
        console.log(error);
    }

}

displayData();

// Function to delete a location by name
function deleteLocationByName(userId, locationName) {
    const userLocationRef = ref(database, 'users/' + userId + '/location');

    // Check if the location exists
    get(userLocationRef)
    .then((snapshot) => {
        const locationsExists = snapshot.val();
        console.log(locationsExists);
        if (locationsExists) {
            // Find the key based on the locationName
            const locationKey = Object.keys(locationsExists).find(
              key => locationsExists[key] === locationName
            );
          
            if (locationKey) {
              console.log('Location key found:', locationKey);
          
                // Reference to the specific location to be deleted
                const locationRef = ref(database, 'users/' + userId + '/location/' + locationKey);
                console.log(locationRef);

                // Remove the location
                remove(locationRef)
                .then(() => {
                    console.log('Location deleted successfully');
                    location.reload();
                })
                .catch((error) => {
                    console.error('Error deleting location:', error);
                });
            } else {
              console.log('Location not found for deletion');
            }
          } else {
            console.log('No locations found');
          }


    })
    .catch((error) => {
        console.error('Error querying location:', error);
    });
  }