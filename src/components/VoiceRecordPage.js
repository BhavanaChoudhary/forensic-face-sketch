import React, { useState, useEffect } from 'react';
import './VoiceRecordPage.css'; // Import the CSS file for styling
import axios from 'axios';

const VoiceRecordPage = () => {
  const [randomRealSketch, setRandomRealSketch] = useState(null);
  const [randomSketch, setRandomSketch] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');

  // Initialize Speech Recognition
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  recognition.onresult = (event) => {
    let finalTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript;
      }
    }
    setTranscription((prev) => prev + finalTranscript);
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error detected: ' + event.error);
  };

  const handleMicClick = () => {
    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      recognition.start();
      setIsRecording(true);
    }
  };

  // Fetch a random image from the 'RealSketches' collection
  useEffect(() => {
    const fetchRandomRealSketch = async () => {
      try {
        const response = await axios.get('/api/RealSketches/random'); // Ensure the endpoint path is correct
        console.log('Random Real Sketch Data:', response.data); // Log the response data
        setRandomRealSketch(response.data.imageData);
      } catch (error) {
        console.error('Error fetching random real sketch:', error);
      }
    };

    fetchRandomRealSketch();
  }, []);

  // Fetch a random sketch
  useEffect(() => {
    const fetchRandomSketch = async () => {
      try {
        const response = await axios.get('/api/sketches/random');
        setRandomSketch(response.data.imageData);
      } catch (error) {
        console.error('Error fetching random sketch:', error);
      }
    };

    fetchRandomSketch();
  }, []);

  return (
    <div className="voice-record-container">
      <h1>Voice Record Page</h1>
      <div className="input-container">
        <input 
          type="text" 
          className="voice-input" 
          placeholder="Record your voice..." 
          value={transcription} 
          readOnly 
        />
        <img 
          src="/mic.webp" 
          alt="Microphone" 
          className="mic-image" 
          onClick={handleMicClick} 
          style={{ cursor: 'pointer' }}
        />
      </div>
      {/* Box Container for Side-by-Side Boxes */}
      <div className="box-container">
        {/* Left Box */}
        <div className="new-box">
          
          {/* Display random real sketch if available */}
          {randomRealSketch ? (
            <img src={randomRealSketch} alt="Random Real Sketch" />
          ) : (
            <p>Loading...</p>
          )}
        </div>
        {/* Right Box */}
        <div className="new-box-right">
          {/* Display random sketch if available */}
          {randomSketch ? (
            <img src={randomSketch} alt="Random Sketch" />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceRecordPage;