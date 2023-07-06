const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 8080;

app.use(express.static('public'));

app.get('/movies', async (req, res) => {
  try {
    const apiKey = '6bb6396129e35fa891a4a9cae6482b04';
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    // Return the movie data as a response
    res.json(data.results);
  } catch (error) {
    console.error('Error fetching movie data:', error);
    res.status(500).json({ error: 'Failed to fetch movie data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
