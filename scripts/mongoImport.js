// MongoDB import script
db = db.getSiblingDB('forensic-sketch');

// Get the current directory path
const facesPath = 'C:/Users/AYUSH SINGH/OneDrive/Desktop/reactpro/forensic-face-sketch/public/faces/';

// List of all image files
const imageFiles = [
    'a-sharukh.jpg',
    'f-005-01.jpg',
    'f-006-01.jpg',
    // ... add all image files
];

// Import each image
imageFiles.forEach(file => {
    const fullPath = facesPath + file;
    const imageData = load('file://' + fullPath);
    
    db.sketches.insertOne({
        imageName: file,
        imageData: imageData,
        createdAt: new Date()
    });
    
    print('Imported: ' + file);
});
// Import each image
imageFiles.forEach(file => {
    const fullPath = facesPath + file;
    const imageData = load('file://' + fullPath);
    
    db.Real.insertOne({
        imageName: file,
        imageData: imageData,
        createdAt: new Date()
    });
    
    print('Imported: ' + file);
});
print('Import completed');
