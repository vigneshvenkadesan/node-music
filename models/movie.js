const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genre');

const Movie = mongoose.model('Movies', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, 
    minlength: 5,
    maxlength: 255
  },
  genre: { 
    type: genreSchema,  
    required: true
  },
  numberOfSongs: { 
    type: Number, 
    required: true,
    min: 0,
    max: 255
  },
  totalDuration: { 
    type: Number, 
    required: true,
    min: 0,
    max: 1000
  }
}));

function validateMovie(movie) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    numberOfSongs: Joi.number().min(0).required(),
    totalDuration: Joi.number().min(0).required()
  };

  return Joi.validate(movie, schema);
}

exports.Movie = Movie; 
exports.validate = validateMovie;