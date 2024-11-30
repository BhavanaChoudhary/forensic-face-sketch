const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/forensic-sketch', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB successfully');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Define RealSketches Schema
const realSketchSchema = new mongoose.Schema({
  imageData: String,
  createdAt: { type: Date, default: Date.now },
  imageName: { type: String }
});

const RealSketch = mongoose.model('RealSketch', realSketchSchema);

// Path to realsketches folder
const sketchesDir = path.join(__dirname, '../public/realsketches');

// Import images
fs.readdirSync(sketchesDir).forEach(file => {
  if (file.endsWith('.jpg')) {
    const filePath = path.join(sketchesDir, file);
    const imageData = fs.readFileSync(filePath, { encoding: 'base64' });
    const realSketch = new RealSketch({
      imageData: `data:image/jpeg;base64,${imageData}`,
      imageName: file
    });

    realSketch.save()
      .then(() => console.log(`Imported: ${file}`))
      .catch(error => console.error(`Error importing ${file}:`, error));
  }
});

console.log('Import completed');
