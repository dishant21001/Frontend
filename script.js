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
















  





