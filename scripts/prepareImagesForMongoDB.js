const fs = require('fs');
const path = require('path');

// Function to convert image to base64
function imageToBase64(filePath) {
    const image = fs.readFileSync(filePath);
    return `data:image/jpeg;base64,${image.toString('base64')}`;
}

// Path to faces folder
const facesDir = path.join(__dirname, '../public/faces');

// Create output array
const output = [];

// Read all files in the directory
fs.readdirSync(facesDir).forEach(file => {
    if (file.endsWith('.jpg')) {
        const filePath = path.join(facesDir, file);
        try {
            const base64Data = imageToBase64(filePath);
            output.push({
                imageName: file,
                imageData: base64Data,
                createdAt: new Date()
            });
            console.log(`Processed: ${file}`);
        } catch (error) {
            console.error(`Error processing ${file}:`, error);
        }
    }
});

// Write the output to a JSON file
const outputPath = path.join(__dirname, 'imagesForMongoDB.json');
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
console.log(`\nCreated JSON file at: ${outputPath}`);
console.log('You can now import this JSON file into MongoDB Compass');
