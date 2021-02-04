const {MusicDirector, validate} = require('../models/music_director'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const directors = await MusicDirector.find().sort('yearOfEntry');
  res.send(directors);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let director = new MusicDirector({ 
    name: req.body.name,
    numberOfAlbums: req.body.numberOfAlbums,
    yearOfEntry: req.body.yearOfEntry
  });
  director = await director.save();
  
  res.send(director);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const director = await MusicDirector.findByIdAndUpdate(req.params.id,
    { 
      name: req.body.name,
      numberOfAlbums: req.body.numberOfAlbums,
      yearOfEntry: req.body.yearOfEntry
    }, { new: true });

  if (!director) return res.status(404).send('The director with the given ID was not found.');
  
  res.send(director);
});

router.delete('/:id', async (req, res) => {
  const director = await MusicDirector.findByIdAndRemove(req.params.id);

  if (!director) return res.status(404).send('The director with the given ID was not found.');

  res.send(director);
});

router.get('/:id', async (req, res) => {
  const director = await MusicDirector.findById(req.params.id);

  if (!director) return res.status(404).send('The director with the given ID was not found.');

  res.send(director);
});

module.exports = router; 