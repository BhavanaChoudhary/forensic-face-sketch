import React, { useRef, useState } from 'react';
import { FaCamera, FaRegCircle, FaStop, FaSave, FaUndo } from 'react-icons/fa';
import './VideoInputPage.css'; // Import the CSS file for styling

const VideoInputPage = () => {
    const videoRef = useRef(null);
    const fileInputRef = useRef(null);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [recording, setRecording] = useState(false);
    const [videoChunks, setVideoChunks] = useState([]);

    const handleVideoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const videoURL = URL.createObjectURL(file);
            videoRef.current.src = videoURL;
            videoRef.current.play();
        }
    };

    const startCamera = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        videoRef.current.play();

        const recorder = new MediaRecorder(stream);
        recorder.ondataavailable = (event) => {
            setVideoChunks((prev) => [...prev, event.data]);
        };
        setMediaRecorder(recorder);
    };

    const startRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.start();
            setRecording(true);
        }
    };

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            setRecording(false);
        }
    };

    const saveRecording = () => {
        const blob = new Blob(videoChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'recording.webm';
        a.click();
        setVideoChunks([]);
    };

    const resetVideo = () => {
        videoRef.current.srcObject = null;
        videoRef.current.src = '';
        setVideoChunks([]);
        setRecording(false);
    };

    return (
        <div>
            <h1 className="heading">
                Welcome to <span>Video-Based Input</span> Page
            </h1>
            <div className="App">
                <div className="container upload-container">
                    <h2>Upload Video</h2>
                    <input type="file" accept="video/*" onChange={handleVideoUpload} ref={fileInputRef} />
                </div>
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
