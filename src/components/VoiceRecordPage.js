import React, { useState, useEffect } from 'react';
import './VoiceRecordPage.css'; // Import the CSS file for styling

const VoiceRecordPage = () => {
  const [randomSketch, setRandomSketch] = useState(null);

  // Fetch a random sketch when the component mounts
  useEffect(() => {
    const fetchRandomSketch = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/sketches/random'); // Adjust the API endpoint if necessary
        const data = await response.json();
        setRandomSketch(data); // Set the random sketch data
      } catch (error) {
        console.error('Error fetching random sketch:', error);
      }
    };

    fetchRandomSketch(); // Call the function to fetch the random sketch
  }, []); // Empty array means it will run once when the component mounts

  return (
    <div className="voice-record-container">
      <h1>Voice Record Page</h1>
      <div className="input-container">
        <input type="text" className="voice-input" placeholder="Record your voice..." />
        <img src="/mic.webp" alt="Microphone" className="mic-image" />
      </div>
      {/* Box Container for Side-by-Side Boxes */}
      <div className="box-container">
        {/* Left Box */}
        <div className="new-box">
          {randomSketch ? (
            <img
              src={randomSketch.imageData}
              alt="Random Sketch"
              className="random-sketch-image"
            />
          ) : (
            <p>Loading...</p> // Placeholder text while the image is being fetched
          )}
        </div>
        {/* Right Box */}
        <div className="new-box-right">
          <p>Right Box</p> {/* Placeholder content */}
        </div>
      </div>
    </div>
  );
};

export default VoiceRecordPage;
