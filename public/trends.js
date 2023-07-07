// Event listener for genre links
document.addEventListener('DOMContentLoaded', function() {
  // Get all genre links
  const genreLinks = document.querySelectorAll('nav ul li a');

  // Add event listener to each genre link
  genreLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
      event.preventDefault();

      // Get the target section ID from the link's href attribute
      const targetSectionId = link.getAttribute('href').substring(1);

      // Scroll to the target section
      scrollToSection(targetSectionId);
    });
  });

  const searchInput = document.getElementById('searchInput');
  
  // Add event listener to hide the placeholder text when the input is clicked
  searchInput.addEventListener('click', function() {
    searchInput.placeholder = '';
  });

  // Function to scroll to a section
  function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }
});


// Function to fetch movie data from the TMDB API
async function fetchMovies() {
  try {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmI2Mzk2MTI5ZTM1ZmE4OTFhNGE5Y2FlNjQ4MmIwNCIsInN1YiI6IjY0YTZhNjQ3NzI0ZGUxMDBjNWU5OTBlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r4xscfLA5tZ9PoqU40EPOmNkUWOiEz0QIsuXQehqDE4'
      }
    };

    const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options);
    const data = await response.json();

    console.log('Retrieved movie data:', data);
    
        // Update movies in the Movies section
        updateMovies(data.results);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    }

    

// Function to update movies in the Movies section
function updateMovies(movieData) {
  // Clear the existing content in the Movies section
  const moviesSection = document.getElementById('movies');
  moviesSection.innerHTML = '';

  // Create a container div for the movies
  const moviesContainer = document.createElement('div');
  moviesContainer.classList.add('movies-container');

  // Iterate over the movie data and create HTML elements to display the movies
  movieData.slice(0, 10).forEach(movie => {
    // Create a div element for each movie
    const movieDiv = document.createElement('div');
    movieDiv.classList.add('movie');

    // Create an image element for the movie poster
    const posterImg = document.createElement('img');
    posterImg.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    posterImg.alt = movie.title;

    // Create a heading element for the movie title
    const titleHeading = document.createElement('h2');
    titleHeading.textContent = movie.title;

    // Append the poster image and title heading to the movie div
    movieDiv.appendChild(posterImg);
    movieDiv.appendChild(titleHeading);

    // Append the movie div to the movies container
    moviesContainer.appendChild(movieDiv);
  });

  // Append the movies container to the Movies section
  moviesSection.appendChild(moviesContainer);
}

// Call the fetchMovies function to initiate the API request
fetchMovies();

// Function to fetch player data from the NBA API
async function fetchPlayers() {
  const url = 'https://api-nba-v1.p.rapidapi.com/players?team=1&season=2021';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '9a656a9206msh5a8bdb13655f8fcp19174ajsnb4fdd2c00d58',
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
    },
    params: {
      team: '1',
      season: '2021'
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    console.log('Retrieved player data:', data);

    // Check if the response contains data
    if (data && Array.isArray(data.response) && data.response.length > 0) {
      // Update web app's content with the player data
      updatePlayers(data.response);
    } else {
      // Handle missing player data
      console.error('Error fetching player data: No player data found.');
    }
  } catch (error) {
    console.error('Error fetching player data:', error);
  }
}

function updatePlayers(playerData) {
  // Clear the existing content
  const playersContainer = document.getElementById('players-container');
  playersContainer.innerHTML = '';

  // Limit the number of players to display to 10
  const limitedPlayerData = playerData.slice(0, 10);

  // Iterate over the limited player data and create HTML elements to display the players
  limitedPlayerData.forEach(player => {
    // Create a div element for each player
    const playerDiv = document.createElement('div');
    playerDiv.classList.add('player');

    // Create a name element for the player
    const nameElement = document.createElement('p');
    nameElement.textContent = `Name: ${player.firstname} ${player.lastname}`;

    // Append the name element to the player div
    playerDiv.appendChild(nameElement);

    // Append the player div to the players container
    playersContainer.appendChild(playerDiv);
  });
}

fetchPlayers();

async function fetchMusicians() {
  const url = 'https://spotify23.p.rapidapi.com/artists/?ids=2w9zwq3AktTeYYMuhMjju8%2C3j0M4CXN9h%2C2X82ssf97737b8b9f8568%2C9vA6t241iJc3%2C36Mb1bOaH595q65658Rk1E%2C1221824%2C256v12XcE4o6908Y9k9542%2C7u2mI45m586Y52pU6q382m%2C2cE7l1tn36n70b73f3xr4j%2C7Jm92Rf8z113eC56l7220g%2C347t4uB01n7n1e643r4247';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '9a656a9206msh5a8bdb13655f8fcp19174ajsnb4fdd2c00d58',
      'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log('Retrieved musician data:', data);
    displayMusicians(data);
  } catch (error) {
    console.error('Error fetching musician data:', error);
  }
}

function displayMusicians(musicianData) {
  const songsContainer = document.getElementById('songs-container');
  songsContainer.innerHTML = '';

  if (musicianData && Array.isArray(musicianData.artists)) {
    const musicians = musicianData.artists.filter(musician => musician !== null);
    const limitedMusiciansData = musicians.slice(0, 10);

    limitedMusiciansData.forEach((musician, index) => {
      const { name } = musician;

      const musicianDiv = document.createElement('div');
      musicianDiv.classList.add('musician');

      const indexElement = document.createElement('p');
      indexElement.textContent = `#${index + 1}`;

      const nameElement = document.createElement('h2');
      nameElement.textContent = name;

      musicianDiv.appendChild(indexElement);
      musicianDiv.appendChild(nameElement);

      songsContainer.appendChild(musicianDiv);
    });
  } else {
    console.error('Error fetching musician data: No data found.');
  }
}

fetchMusicians();
