import React, { useRef, useState } from 'react';
import { FaCamera, FaRegCircle, FaStop, FaSave, FaUndo } from 'react-icons/fa';
import './VideoInputPage.css'; // CSS file

const VideoInputPage = () => {
    const videoRef = useRef(null);
    const fileInputRef = useRef(null);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [recording, setRecording] = useState(false);
    const [videoChunks, setVideoChunks] = useState([]);
    const [stream, setStream] = useState(null);

    // Handle video file upload
    const handleVideoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const videoURL = URL.createObjectURL(file);
            videoRef.current.srcObject = null; // Reset live stream if active
            videoRef.current.src = videoURL;
            videoRef.current.play();
            console.log("Video uploaded:", file.name);
        } else {
            console.error("No file selected.");
        }
    };

    // Start live camera feed
    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = mediaStream;
            videoRef.current.play();
            setStream(mediaStream);

            const recorder = new MediaRecorder(mediaStream);
            recorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    console.log("Recording chunk received.");
                    setVideoChunks((prev) => [...prev, event.data]);
                }
            };
            setMediaRecorder(recorder);
            console.log("Camera started.");
        } catch (error) {
            console.error("Camera access error:", error);
            alert("Unable to access the camera. Please allow camera permissions.");
        }
    };

    // Start recording
    const startRecording = () => {
        if (mediaRecorder && !recording) {
            mediaRecorder.start();
            setRecording(true);
            console.log("Recording started.");
        } else {
            console.error("MediaRecorder not initialized or already recording.");
        }
    };

    // Stop recording
    const stopRecording = () => {
        if (mediaRecorder && recording) {
            mediaRecorder.stop();
            setRecording(false);
            console.log("Recording stopped.");
        } else {
            console.error("No active recording to stop.");
        }
    };

    // Save the recorded video
    const saveRecording = () => {
        if (videoChunks.length > 0) {
            const blob = new Blob(videoChunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'recording.webm';
            a.click();
            setVideoChunks([]);
            console.log("Recording saved.");
        } else {
            console.error("No recording available to save.");
        }
    };

    // Reset video input
    const resetVideo = () => {
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
        }
        videoRef.current.srcObject = null;
        videoRef.current.src = '';
        setVideoChunks([]);
        setRecording(false);
        console.log("Video reset.");
    };

    return (
        <div className="video-input-page">
            <h1 className="heading">
                Welcome to <span>Video-Based Input</span> Page
            </h1>
            <div className="App">
                {/* File Upload */}
                <div className="container upload-container">
                    <h2>Upload Video</h2>
                    <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoUpload}
                        ref={fileInputRef}
                    />
                </div>
                {/* Live Camera */}
                <div className="container camera-container">
                    <h2>Live Camera</h2>
                    <video ref={videoRef} autoPlay></video>
                    <div className="button-container">
                        <button onClick={startCamera}><FaCamera /></button>
                        <button onClick={startRecording} disabled={recording}><FaRegCircle /></button>
                        <button onClick={stopRecording} disabled={!recording}><FaStop /></button>
                        <button onClick={saveRecording} disabled={videoChunks.length === 0}><FaSave /></button>
                        <button onClick={resetVideo}><FaUndo /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoInputPage;
