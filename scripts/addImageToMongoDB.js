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

// Define Schema
const sketchSchema = new mongoose.Schema({
  imageData: String,
  features: Array,
  createdAt: { type: Date, default: Date.now },
  isExternal: { type: Boolean, default: true }
});

const Sketch = mongoose.model('Sketch', sketchSchema);

// Function to convert image to base64
const imageToBase64 = (filePath) => {
  const image = fs.readFileSync(filePath);
  return `data:image/${path.extname(filePath).slice(1)};base64,${image.toString('base64')}`;
};

// Function to add image to MongoDB
const addImageToMongoDB = async (imagePath) => {
  try {
    const imageData = imageToBase64(imagePath);
    const sketch = new Sketch({
      imageData,
      features: [],
      isExternal: true
    });
    
    const savedSketch = await sketch.save();
    console.log('Image saved successfully with ID:', savedSketch._id);
    return savedSketch;
  } catch (error) {
    console.error('Error saving image:', error);
    throw error;
  }
};

// Example usage:
// Replace 'path/to/your/image.jpg' with the actual path to your image
const imagePath = process.argv[2];
if (!imagePath) {
  console.error('Please provide an image path');
  process.exit(1);
}

addImageToMongoDB(imagePath)
  .then(() => {
    console.log('Image added successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed to add image:', error);
    process.exit(1);
  });
