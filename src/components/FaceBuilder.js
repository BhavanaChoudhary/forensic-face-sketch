import React, { useState } from "react";
import "./FaceBuilder.css";

const FaceBuilder = ({ features }) => {
  const [selectedCategory, setSelectedCategory] = useState("head");
  const [selectedFeatures, setSelectedFeatures] = useState({
    head: null,
    hair: null,
    eyes: null,
    eyebrows: null,
    nose: null,
    lips: null,
    moustache: null,
    ear_and_neck: null,
  });

  // Handle selecting a feature for a category
  const handleFeatureSelect = (category, feature) => {
    setSelectedFeatures((prevState) => ({
      ...prevState,
      [category]: feature,
    }));
  };

  // Handle changing the active category
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="face-builder-container">
      {/* Left Sidebar */}
      <div className="sidebar">
        {Object.keys(features).map((category) => (
          <div
            key={category}
            className={`sidebar-item ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => handleCategorySelect(category)}
          >
            <img
              src={`/icons/${category}.png`} // Replace with your icons folder path
              alt={category}
              className="sidebar-icon"
            />
            <span>{category}</span>
          </div>
        ))}
      </div>

      {/* Sketch Area */}
      <div className="sketch-area">
        <h2>Sketch Area</h2>
        <div className="sketch-canvas">
          {/* Render selected features */}

        {Object.keys(selectedFeatures).map((category) => {
    if (selectedFeatures[category]) {
        return (
            <img
                key={category}
                src={selectedFeatures[category]}
                alt={category}
                className={`selected-feature ${category === 'head' ? 'head-image' : 'other-feature'}`}
            />
        );
    }
    return null;
})}
        </div>
      </div>

      {/* Right Feature Box */}
      <div className="feature-box">
        <div className="feature-box-header">
          <h3>{selectedCategory.toUpperCase()} SHAPES TO CHOOSE FROM</h3>
          <button className="delete-button">Delete Shape</button>
        </div>
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
