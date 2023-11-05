// Utility function to get the number of days in a month
function getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}
const monthlyWeatherData = [
    { day: 1, condition: "Sunny", temperature: 25 },
    { day: 2, condition: "Cloudy", temperature: 22 },
    // ... You can add more data as needed
];


function fillMonthlyForecast(month, year) {
    const tbody = document.querySelector("#monthlyForecast tbody");
    
    // Clear the previous content
    tbody.innerHTML = "";

    let dayCount = 1;
    const totalDays = getDaysInMonth(month, year);
    const startDay = new Date(year, month-1, 1).getDay();  // month-1 because JavaScript months are 0-indexed

    for (let i = 0; i < 6; i++) { // At most 6 weeks in a month view
        let row = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement("td");

            // If the current day is within the month and it's the right start day
            if ((i === 0 && j >= startDay || i > 0) && dayCount <= totalDays) {
                let dayWeather = monthlyWeatherData.find(data => data.day === dayCount);
                if (dayWeather) {
                    cell.innerHTML = `
                        <strong>${dayCount}</strong><br>
                        <span>${dayWeather.condition}</span><br>
                        ${dayWeather.temperature}°C
                    `;
                } else {
                    cell.innerHTML = `<strong>${dayCount}</strong>`;
                }
                dayCount++;
            }
            
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }
}

function populateCalendar() {
    const month = document.getElementById("monthSelect").value;
    const year = document.getElementById("yearSelect").value;
    
    fillMonthlyForecast(Number(month), Number(year));
}

function setDefaultDate() {
    const currentMonth = new Date().getMonth();  // 0-11 (0 is January, 11 is December)
    const currentYear = new Date().getFullYear();

    const monthSelect = document.getElementById("monthSelect");
    const yearSelect = document.getElementById("yearSelect");

    monthSelect.value = currentMonth + 1;  // +1 to adjust for 0-indexing
    yearSelect.value = currentYear;
}

window.onload = function() {
    setDefaultDate();
    populateCalendar();
}



function fetchMonthlyWeatherData(month, year, callback) {
    const apiKey = '2c4fe195f69547fda56145444230211'; // Replace with your API key
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=YOUR_LOCATION&dt=${year}-${month}-01&days=30`; // Adjust the query parameters as needed

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Assuming the API returns an array of weather data for the month
            callback(data.forecast.forecastday);
        })
        .catch(e => {
            console.log(e);
            alert("Error fetching weather data");
        });
}


