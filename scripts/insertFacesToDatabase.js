const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Sketch = require('../models/Sketch'); // Ensure this path is correct and the model is defined

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/forensic-sketch', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Directory containing the face images
const facesDir = path.join(__dirname, '../public/faces');

// Read all files in the faces directory
fs.readdir(facesDir, async (err, files) => {
  if (err) {
    console.error('Error reading faces directory:', err);
    return;
  }

  for (const file of files) {
    const filePath = path.join(facesDir, file);
    const imageData = fs.readFileSync(filePath, { encoding: 'base64' });

    // Create a new sketch document
    const newSketch = new Sketch({
      name: file,
      imageData: imageData,
    });

    try {
      // Save the sketch to the database
      await newSketch.save();
      console.log(`Successfully inserted ${file} into the database.`);
    } catch (err) {
      console.error('Error saving sketch to database:', err);
    }
  }

  // Close the connection after all operations are done
  mongoose.connection.close();
});
