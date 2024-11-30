const mongoose = require('mongoose');

const sketchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageData: { type: String, required: true },
});

module.exports = mongoose.model('Sketch', sketchSchema);
