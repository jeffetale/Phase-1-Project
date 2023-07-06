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

  // Function to fetch movie data from the node server
  async function fetchMovies() {
    try {
      const response = await fetch('/movies');
      const data = await response.json();
  
      // Update web app's content with the movie data
      updateMovies(data);
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  }
  
  // Call the fetchMovies function to initiate the API request
  fetchMovies();




    
  
  

