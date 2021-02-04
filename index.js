const express = require('express');
const app = express();
const mongoose = require('mongoose');
const movies = require('./routes/movies');
const directors = require('./routes/music_directors');
const genres = require('./routes/genres');

mongoose.connect('mongodb://localhost/music')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/movies', movies);
app.use('/api/genres', genres);
app.use('/api/md', directors);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));