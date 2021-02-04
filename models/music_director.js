const Joi = require('joi');
const mongoose = require('mongoose');

const MusicDirector = mongoose.model('MusicDirectors', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  numberOfAlbums: {
    type: Number, 
    required: true,
    min: 0,
    max: 255
  },
  yearOfEntry: {
    type: Number, 
    required: true,
    min: 1950,
    max: 2021
  }
}));

function validateMusicDirector(MusicDirector) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    yearOfEntry: Joi.number().required(),
    numberOfAlbums: Joi.number()
  };

  return Joi.validate(MusicDirector, schema);
}

exports.MusicDirector = MusicDirector; 
exports.validate = validateMusicDirector;