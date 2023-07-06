// Function to scroll to a section
function scrollToSection(sectionId) {
    // implementation using Express.js
    const express = require('express');
    const app = express();
    
    app.get('/', function(req, res) {
      // Scroll to the specified section
      res.redirect(`/#${sectionId}`);
    });
    
    // Start the server
    const port = 8080; 
    app.listen(port, function() {
      console.log(`Server started on port ${port}`);
    });
  }
  
  module.exports = scrollToSection;
    
    
  

