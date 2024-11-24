import React, { useState } from "react";
import { Rnd } from "react-rnd";
import "./FaceBuilder.css";

const FaceBuilder = ({ features }) => {
  const [selectedCategory, setSelectedCategory] = useState("head");
  const [selectedFeatures, setSelectedFeatures] = useState([]);

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

      {/* Sketch Area */}
      <div className="sketch-area">
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
    </div>
  );
};

export default FaceBuilder;
