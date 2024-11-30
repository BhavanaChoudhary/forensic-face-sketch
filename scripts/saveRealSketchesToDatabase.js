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

// Path to the realsketches directory
const realsketchesDir = path.join(__dirname, '../public/realsketches');

// Function to save images to the RealSketches collection
const saveRealSketchesToDatabase = async () => {
  try {
    const files = fs.readdirSync(realsketchesDir);

    for (let file of files) {
      if (file.endsWith('.jpg')) {
        const filePath = path.join(realsketchesDir, file);
        const imageData = fs.readFileSync(filePath, { encoding: 'base64' });
        const realSketch = new RealSketch({
          imageData: `data:image/jpeg;base64,${imageData}`,
          imageName: file
        });

        await realSketch.save();
        console.log(`Saved ${file} to database`);
      }
    }
    console.log('All images saved to database');
  } catch (error) {
    console.error('Error saving images to database:', error);
  } finally {
    mongoose.connection.close();
  }
};

saveRealSketchesToDatabase();
