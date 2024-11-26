import React, { useState, useRef } from "react";
import { Rnd } from "react-rnd";
import html2canvas from "html2canvas";
import Modal from "react-modal";
import "./FaceBuilder.css";

// Set Modal app element
Modal.setAppElement('#root');

const FaceBuilder = ({ features }) => {
  const [selectedCategory, setSelectedCategory] = useState("head");
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [capturedImage, setCapturedImage] = useState(null);
  const [matchedImage, setMatchedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);
  const sketchAreaRef = useRef(null);

  // Add a new feature to the sketch area
  const handleFeatureSelect = (category, feature) => {
    setSelectedFeatures((prevState) => [
      ...prevState,
      { id: Date.now(), category, src: feature, x: 50, y: 50, width: 150, height: 150 },
    ]);
  };

  // Handle removing a feature
  const handleRemoveFeature = (id) => {
    setSelectedFeatures((prevState) =>
      prevState.filter((feature) => feature.id !== id)
    );
  };

  // Handle taking photo of sketch area
  const handleTakePhoto = async () => {
    if (sketchAreaRef.current) {
      try {
        const canvas = await html2canvas(sketchAreaRef.current);
        const imageUrl = canvas.toDataURL('image/png');
        setCapturedImage(imageUrl);
        setIsModalOpen(true);
      } catch (error) {
        console.error('Error capturing sketch:', error);
      }
    }
  };

  // Handle uploading to database and finding match
  const handleUploadToDatabase = async () => {
    if (capturedImage) {
      try {
        // Simulating database match with timeout
        // In real implementation, this would be an API call to your backend
        setTimeout(() => {
          // Simulated matched image (replace with actual API response)
          const simulatedMatchedImage = '/features/head/head01.png';
          setMatchedImage(simulatedMatchedImage);
          setIsModalOpen(false);
          setIsMatchModalOpen(true);
        }, 1500);
      } catch (error) {
        console.error('Error uploading to database:', error);
      }
    }
  };

  return (
    <div className="face-builder-container">
      {/* Sidebar */}
      <div className="sidebar">
        {Object.keys(features).map((category) => (
          <div
            key={category}
            className={`sidebar-item ${selectedCategory === category ? "active" : ""}`}
            onClick={() => setSelectedCategory(category)}
          >
            <img
              src={`/icons/${category}.png`}
              alt={category}
              className="sidebar-icon"
            />
            <span>{category}</span>
          </div>
        ))}
      </div>

      {/* Sketch Area Container */}
      <div className="sketch-area-container">
        <h2 className="sketch-area-heading">Sketch Area</h2>
        <div className="sketch-area" ref={sketchAreaRef}>
          {/* Sketch Canvas */}
          <canvas
            id="sketchCanvas"
            width="600"
            height="400"
            className="sketch-canvas"
          >
            Your browser does not support the canvas element.
          </canvas>

          {/* Render selected features on top of the canvas */}
          {selectedFeatures.map((feature) => (
            <Rnd
              key={feature.id}
              default={{
                x: feature.x,
                y: feature.y,
                width: feature.width,
                height: feature.height,
              }}
              bounds="parent"
              enableResizing={{
                top: true,
                right: true,
                bottom: true,
                left: true,
                topRight: true,
                bottomRight: true,
                bottomLeft: true,
                topLeft: true,
              }}
              onDragStop={(e, data) => {
                setSelectedFeatures((prevState) =>
                  prevState.map((f) =>
                    f.id === feature.id ? { ...f, x: data.x, y: data.y } : f
                  )
                );
              }}
              onResizeStop={(e, direction, ref, delta, position) => {
                setSelectedFeatures((prevState) =>
                  prevState.map((f) =>
                    f.id === feature.id
                      ? {
                          ...f,
                          width: parseFloat(ref.style.width),
                          height: parseFloat(ref.style.height),
                          ...position,
                        }
                      : f
                  )
                );
              }}
            >
              <div className="resizable-feature">
                <img
                  src={feature.src}
                  alt={feature.category}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
                <button
                  className="delete-button"
                  onClick={() => handleRemoveFeature(feature.id)}
                >
                  X
                </button>
              </div>
            </Rnd>
          ))}
        </div>

        {/* Buttons below the sketch area */}
        <div className="sketch-area-buttons">
          <button className="sketch-area-button" onClick={handleTakePhoto}>Take Photo</button>
          <button 
            className="sketch-area-button" 
            onClick={handleUploadToDatabase}
            disabled={!capturedImage}
          >
            Upload to Database
          </button>
        </div>
      </div>

      {/* Feature Options */}
      <div className="feature-box">
        <h3>{selectedCategory.toUpperCase()} OPTIONS</h3>
        <div className="feature-options">
          {features[selectedCategory].map((feature, index) => (
            <div
              key={index}
              className="feature-item"
              onClick={() => handleFeatureSelect(selectedCategory, feature)}
            >
              <img src={feature} alt={`${selectedCategory} ${index}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Modal for displaying captured photo */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="photo-modal"
        overlayClassName="modal-overlay"
      >
        <h2>Captured Sketch</h2>
        {capturedImage && (
          <img src={capturedImage} alt="Captured sketch" style={{ maxWidth: '100%' }} />
        )}
        <div className="modal-buttons">
          <button onClick={() => setIsModalOpen(false)}>Close</button>
          <button onClick={handleUploadToDatabase}>Upload to Database</button>
        </div>
      </Modal>

      {/* Modal for displaying match results */}
      <Modal
        isOpen={isMatchModalOpen}
        onRequestClose={() => setIsMatchModalOpen(false)}
        className="match-modal"
        overlayClassName="modal-overlay"
      >
        <h2>Match Results</h2>
        <div className="match-comparison">
          <div>
            <h3>Your Sketch</h3>
            {capturedImage && (
              <img src={capturedImage} alt="Your sketch" style={{ maxWidth: '45%' }} />
            )}
          </div>
          <div>
            <h3>Matched Image</h3>
            {matchedImage && (
              <img src={matchedImage} alt="Matched image" style={{ maxWidth: '45%' }} />
            )}
          </div>
        </div>
        <button onClick={() => setIsMatchModalOpen(false)}>Close</button>
      </Modal>
    </div>
  );
};

export default FaceBuilder;
