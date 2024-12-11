const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 5001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/forensic-sketch', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB successfully');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Handle MongoDB connection events
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Define Schema
const sketchSchema = new mongoose.Schema({
  imageData: String,
  features: Array,
  createdAt: { type: Date, default: Date.now },
  isExternal: { type: Boolean, default: false },
  imageName: { type: String }
});

const Sketch = mongoose.model('Sketch', sketchSchema);

// Define Real Schema
const realSchema = new mongoose.Schema({
  imageData: String,
  createdAt: { type: Date, default: Date.now },
  imageName: { type: String }
});

const Real = mongoose.model('Real', realSchema);

// Health check endpoint
app.get('/api/health', (req, res) => {
  const connectionStatus = mongoose.connection.readyState;
  if (connectionStatus === 1) {
    res.json({ status: 'Connected to MongoDB' });
  } else {
    res.status(500).json({ status: 'Not connected to MongoDB' });
  }
});

// Routes
app.post('/api/upload/external', async (req, res) => {
  try {
    console.log('Received external image upload request');
    const { imageData } = req.body;
    
    if (!imageData) {
      console.error('No image data received');
      return res.status(400).json({ error: 'No image data provided' });
    }

    const sketch = new Sketch({
      imageData,
      features: [],
      isExternal: true
    });

    const savedSketch = await sketch.save();
    console.log('External image saved successfully with ID:', savedSketch._id);
    
    res.json({ 
      success: true, 
      id: savedSketch._id,
      message: 'External image uploaded successfully'
    });
  } catch (error) {
    console.error('Error saving external image:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/upload', async (req, res) => {
  try {
    console.log('Received upload request');
    const { imageData, features } = req.body;
    
    if (!imageData) {
      console.error('No image data received');
      return res.status(400).json({ error: 'No image data provided' });
    }

    console.log('Creating new sketch with features:', features);
    const sketch = new Sketch({
      imageData,
      features
    });

    const savedSketch = await sketch.save();
    console.log('Sketch saved successfully with ID:', savedSketch._id);
    
    res.json({ 
      success: true, 
      id: savedSketch._id,
      message: 'Sketch uploaded successfully'
    });
  } catch (error) {
    console.error('Error saving sketch:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all sketches from database (useful for testing purposes)
app.get('/api/sketches', async (req, res) => {
  try {
    const sketches = await Sketch.find();  // Get all sketches in the database
    res.json(sketches);  // Send sketches data as JSON
  } catch (error) {
    console.error('Error fetching sketches:', error);
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/sketches/random', async (req, res) => {
  try {
    const count = await Sketch.countDocuments();  // Count how many sketches are in the database
    if (count === 0) return res.status(404).json({ error: 'No sketches found' });
    const random = Math.floor(Math.random() * count);  // Get a random index
    const randomSketch = await Sketch.findOne().skip(random);  // Get the sketch at the random index
    res.json(randomSketch);  // Send the sketch data as JSON
  } catch (error) {
    console.error('Error fetching random sketch:', error);
    res.status(500).json({ error: error.message });  // Handle errors
  }
});
app.get('/api/real', async (req, res) => {
  try {
    const real = await Sketch.find();  // Get all sketches in the database
    res.json(real);  // Send sketches data as JSON
  } catch (error) {
    console.error('Error fetching sketches:', error);
    res.status(500).json({ error: error.message });
  }
});
// Get a random image from the 'real' collection
app.get('/api/real/random', async (req, res) => {
  try {
    const count = await Real.countDocuments();  // Count how many images are in the "real" collection
    if (count === 0) return res.status(404).json({ error: 'No real images found' });
    const random = Math.floor(Math.random() * count);  // Get a random index
    const randomRealImage = await Real.findOne().skip(random);  // Get the image at the random index
    res.json(randomRealImage);// Log the random image data
  } catch (error) {
    console.error('Error fetching random real image:', error);
    res.status(500).json({ error: error.message });  // Handle errors
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);});