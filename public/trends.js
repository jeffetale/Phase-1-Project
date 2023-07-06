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
