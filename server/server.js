
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

// Get all sketches from database
app.get('/api/sketches', async (req, res) => {
  try {
    // Get all sketches except the current one
    const sketches = await Sketch.find({
      isExternal: true  // Only get the external images we uploaded
    }).sort({ createdAt: -1 });

    // Return only necessary data
    const formattedSketches = sketches.map(sketch => ({
      id: sketch._id,
      imageData: sketch.imageData,
      imageName: sketch.imageName || 'Unknown',
      createdAt: sketch.createdAt
    }));

    res.json(formattedSketches);
  } catch (error) {
    console.error('Error fetching sketches:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
