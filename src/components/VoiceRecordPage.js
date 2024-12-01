import React, { useState, useEffect } from 'react';
import './VoiceRecordPage.css'; // Import the CSS file for styling

const VoiceRecordPage = () => {
  const [randomRealSketch, setRandomRealSketch] = useState(null);
  const [correspondingFace, setCorrespondingFace] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [showLeftImage, setShowLeftImage] = useState(false);
  const [showRightImage, setShowRightImage] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showSearching, setShowSearching] = useState(false);

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
      // Show the "Generating..." popup before the left image is shown
      setShowDialog(true);
      setTimeout(() => {
        setShowDialog(false);
        fetchRandomRealSketch(); // Fetch a random image from the realsketches folder
        setShowLeftImage(true); // Show the left image after "Generating..." popup
        setTimeout(() => {
          // Show the "Searching Database..." popup after the left image is shown
          setShowSearching(true);
          setTimeout(() => {
            setShowSearching(false); // Hide the "Searching Database..." popup after a delay
            setShowRightImage(true); // Display the right image
          }, 7000); // 3 seconds delay for the "Searching Database..." popup
        }, 1000); // 1 second delay after showing the left image
      }, 5000); // 2 seconds delay for "Generating..." popup
    } else {
      recognition.start();
      setIsRecording(true);
      setShowLeftImage(false);
      setShowRightImage(false);
    }
  };

  // Fetch a random image from the 'realsketches' folder
  const fetchRandomRealSketch = () => {
    const realSketches = [
      '/realsketches/s1.jpg', '/realsketches/s2.jpg', '/realsketches/s3.jpg',
      '/realsketches/s4.jpg', '/realsketches/s5.jpg', '/realsketches/s6.jpg',
      '/realsketches/s7.jpg', '/realsketches/s8.jpg', '/realsketches/s9.jpg',
      '/realsketches/s10.jpg', '/realsketches/s11.jpg', '/realsketches/s12.jpg',
      '/realsketches/s13.jpg', '/realsketches/s14.jpg', '/realsketches/s15.jpg',
      '/realsketches/s16.jpg', '/realsketches/s17.jpg', '/realsketches/s18.jpg',
      '/realsketches/s19.jpg', '/realsketches/s20.jpg', '/realsketches/s21.jpg',
      '/realsketches/s22.jpg', '/realsketches/s23.jpg', '/realsketches/s24.jpg',
      '/realsketches/s25.jpg', '/realsketches/s26.jpg', '/realsketches/s27.jpg',
      '/realsketches/s28.jpg', '/realsketches/s29.jpg', '/realsketches/s30.jpg',
      '/realsketches/s31.jpg', '/realsketches/s32.jpg', '/realsketches/s33.jpg',
      '/realsketches/s34.jpg', '/realsketches/s35.jpg', '/realsketches/s36.jpg',
      '/realsketches/s37.jpg', '/realsketches/s38.jpg', '/realsketches/s39.jpg',
      '/realsketches/s40.jpg', '/realsketches/s41.jpg', '/realsketches/s42.jpg',
      '/realsketches/s43.jpg', '/realsketches/s44.jpg', '/realsketches/s45.jpg',
      '/realsketches/s46.jpg', '/realsketches/s47.jpg', '/realsketches/s48.jpg',
      '/realsketches/s49.jpg', '/realsketches/s50.jpg'
    ];
    const randomIndex = Math.floor(Math.random() * realSketches.length);
    const selectedSketch = realSketches[randomIndex];
    setRandomRealSketch(selectedSketch);

    // Set the corresponding face image based on the selected sketch
    const faceImage = selectedSketch.replace('/realsketches/', '/faces/');
    setCorrespondingFace(faceImage);
  };

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
      {/* Dialog Box */}
      {showDialog && (
        <div className="dialog-box">
          <p>Generating...</p>
        </div>
      )}
      {/* Searching Database Popup */}
      {showSearching && (
        <div className="searching-modal">
          <div className="spinner"></div>
          <h2>Searching Database...</h2>
        </div>
      )}
      {/* Box Container for Side-by-Side Boxes */}
      <div className="box-container">
        {/* Left Box */}
        <div className="new-box">
          {/* Display random real sketch if available and showLeftImage is true */}
          {showLeftImage && randomRealSketch ? (
            <img src={randomRealSketch} alt="Random Real Sketch" />
          ) : (
            <p>Generating...</p>
          )}
        </div>
        {/* Right Box */}
        <div className="new-box-right">
          {/* Display corresponding face if available and showRightImage is true */}
          {showRightImage && correspondingFace ? (
            <img src={correspondingFace} alt="Corresponding Face" />
          ) : (
            <p>Generating...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceRecordPage;
