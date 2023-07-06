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
  
  

