import React, { useRef, useState } from 'react';
import { FaCamera, FaRegCircle, FaStop, FaSave, FaUndo } from 'react-icons/fa';
import './VideoInputPage.css';

const VideoInputPage = () => {
    const videoRef = useRef(null);
    const fileInputRef = useRef(null);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [recording, setRecording] = useState(false);
    const [videoChunks, setVideoChunks] = useState([]);
    const [stream, setStream] = useState(null);
    const [fileName, setFileName] = useState('');
    const [imageSrc, setImageSrc] = useState('');
    const [faceImageSrc, setFaceImageSrc] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const filePath = `/realsketches/${file.name}`;
            const facePath = `/faces/${file.name}`;
            setFileName(file.name);
            setImageSrc(filePath);

            // Show the popup and simulate "analyzing"
            setShowModal(true);
            setTimeout(() => {
                setShowModal(false);
                setFaceImageSrc(facePath); // Display the face image after analysis
            }, 3000); // Close popup after 3 seconds
        }
    };

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = mediaStream;
            videoRef.current.play();
            setStream(mediaStream);

            const recorder = new MediaRecorder(mediaStream);
            recorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    setVideoChunks((prev) => [...prev, event.data]);
                }
            };
            setMediaRecorder(recorder);
        } catch (error) {
            alert("Unable to access the camera. Please allow camera permissions.");
        }
    };

    const startRecording = () => {
        if (mediaRecorder && !recording) {
            mediaRecorder.start();
            setRecording(true);
        }
    };

    const stopRecording = () => {
        if (mediaRecorder && recording) {
            mediaRecorder.stop();
            setRecording(false);
        }
    };

    const saveRecording = () => {
        if (videoChunks.length > 0) {
            const blob = new Blob(videoChunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'recording.webm';
            a.click();
            setVideoChunks([]);
        }
    };

    const resetVideo = () => {
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
        }
        videoRef.current.srcObject = null;
        videoRef.current.src = '';
        setVideoChunks([]);
        setRecording(false);
        setFileName('');
        setImageSrc('');
        setFaceImageSrc('');
    };

    return (
        <div className="video-input-page">
            {/* Left Section */}
            <div className="left-section">
                <div className="container">
                    <h2>Upload Image</h2>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        ref={fileInputRef}
                    />
                </div>
                <div className="container">
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

            {/* Right Section */}
            <div className="right-section">
    <div className="input-container">
        <input type="text" className="rounded-input" placeholder="Enter text here" value={fileName} readOnly />
    </div>
    <div className="boxes-container">
        {/* Box 1 */}
        <div className="box">
            <h3 className="box-heading">From Sketch</h3>
            {imageSrc && <img src={imageSrc} alt="Uploaded" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
        </div>
        {/* Box 2 */}
        <div className="box">
            <h3 className="box-heading">From Database</h3>
            {faceImageSrc && <img src={faceImageSrc} alt="Face" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
        </div>
    </div>
    <div className="feature-message">
        ⚙️ Feature Under Development - Coming Soon!
    </div>
</div>


            {/* Popup Modal */}
            {showModal && (
                <div className="modal">
                    <div className="searching-modal">
                        <div className="spinner"></div>
                        <h2>Analyzing Database...</h2>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoInputPage;
