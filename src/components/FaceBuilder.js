import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import Modal from "react-modal";
import "./FaceBuilder.css";

Modal.setAppElement('#root');

const FaceBuilder = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sketchItems, setSketchItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [matchedImage, setMatchedImage] = useState(null);
  const [activeItemId, setActiveItemId] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSearching, setIsSearching] = useState(false);

  const faceImages = [
    "s1.jpg", "s2.jpg", "s3.jpg", "s4.jpg", "s5.jpg",
    "s6.jpg", "s7.jpg", "s8.jpg", "s9.jpg", "s10.jpg",
    "s11.jpg", "s12.jpg", "s13.jpg", "s14.jpg", "s15.jpg",
    "s16.jpg", "s17.jpg", "s18.jpg", "s19.jpg", "s20.jpg",
    "s21.jpg", "s22.jpg", "s23.jpg", "s24.jpg", "s25.jpg",
    "s26.jpg", "s27.jpg", "s28.jpg", "s29.jpg", "s30.jpg",
    "s31.jpg", "s32.jpg", "s33.jpg", "s34.jpg", "s35.jpg",
    "s36.jpg", "s37.jpg", "s38.jpg", "s39.jpg", "s40.jpg",
    "s41.jpg", "s42.jpg", "s43.jpg", "s44.jpg", "s45.jpg",
    "s46.jpg", "s47.jpg", "s48.jpg", "s49.jpg", "s50.jpg"
  ];

  const features = {
    head: [
      "chiseled.png",
      "diamond.png",
      "heart.png",
      "narrow.png",
      "oblong.png",
      "oval.png",
      "pear.png",
      "rectangle.png",
      "round.png",
      "square.png",
      "triangular.png",
      "wide.png",
    ],
    nose: [
      "aquiline.png",
      "asymmetrical.png",
      "broad.png",
      "bulbous.png",
      "button.png",
      "crooked.png",
      "downturned.png",
      "flat.png",
      "Greek.png",
      "high-bridged.png",
      "hooked.png",
      "low-bridged.png",
      "narrow.png",
      "petite.png",
      "pointed.png",
      "Roman.png",
      "round.png",
      "snub.png",
      "straight.png",
      "upturned.png",
      "wide-bridged.png",
    ],
    eyebrow: [
      "curvedeyebrow.png",
      "dulleyebrow.png",
      "hardeyebrow.png",
      "hardwideeyebrow.png",
      "morecurevedeyebrow.png",
      "ovaleyebrow.png",
      "plaincurdeyebrow.png",
      "plaineyebrow.png",
      "pointedeyebrow.png",
      "sharpaxeeyebrow.png",
      "sharpeeyebrow.png",
      "thickdoubleeybrow.png",
      "thickeyebrow.png",
      "thickwideeyebrow.png",
      "thineyebrow.png",
      "wideeyebrow.png",
      "widelongeyebrow.png",
      "widespaceeyebrow.png",
    ],
    eyes: [
      "akmond.png",
      "closet.png",
      "deep.png",
      "deepset.png",
      "doublelid.png",
      "downturn.png",
      "hooded.png",
      "low.png",
      "monlid.png",
      "prominent.png",
      "round.png",
      "thick.png",
      "upturn.png",
      "wideset.png",
    ],
    hair: [
      "afro.png",
      "braided_long.png",
      "braided_short.png",
      "bun_high.png",
      "bun_low.png",
      "buzz_cut.png",
      "curly_long.png",
      "curly_short.png",
      "layered.png",
      "ponytail_high.png",
      "ponytail_low.png",
      "spiky.png",
      "straight_long.png",
      "straight_short.png",
      "wavy_long.png",
      "wavy_short.png",
    ],
    lips: [
      "asymmetrical.png",
      "bow-shaped.png",
      "defined.png",
      "downturned.png",
      "flat.png",
      "full.png",
      "glossy.png",
      "heart-shaped.png",
      "matte.png",
      "narrow.png",
      "plump.png",
      "pouty.png",
      "rounded.png",
      "sharp-edged.png",
      "soft-edged.png",
      "thin.png",
      "upturned.png",
      "wide.png",
    ],
    moustache: [
      "boxcar.png",
      "chevron.png",
      "Dalí.png",
      "English.png",
      "Fu_Manchu.png",
      "handlebar.png",
      "horseshoe.png",
      "Hungarian.png",
      "imperial.png",
      "lampshade.png",
      "pencil.png",
      "petite_handlebar.png",
      "pyramid.png",
      "shadow.png",
      "walrus.png",
    ],
    "ear and neck": [
      "leftearnormal.png",
      "leftearshort.png",
      "leftearthick.png",
      "leftearthin.png",
      "rightearnormal.png",
      "rightearshort.png",
      "rightearthick.png",
      "rightearthin.png",
      "thorat.png",
      "thoratlong.png",
      "thoratmorewide.png",
      "thoratsharp.png",
      "thoratshort.png",
      "widethroat.png",
    ],
  };

  const addToSketchArea = (category, feature) => {
    const newItem = {
      id: Date.now(),
      category,
      src: `/features/${category}/${feature}`,
      x: 50,
      y: 50,
      width: 100,
      height: 100,
    };
    setSketchItems([...sketchItems, newItem]);
  };

  const removeFromSketchArea = (id) => {
    setSketchItems(sketchItems.filter(item => item.id !== id));
  };

  const handleCaptureImage = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      const nextImage = faceImages[currentImageIndex];
      setMatchedImage(nextImage);
      setIsModalOpen(true);
      setCurrentImageIndex((currentImageIndex + 1) % faceImages.length);
    }, 7000); // Revert delay to 2 seconds
  };

  return (
    <div className="face-builder-container">
      {/* Left Sidebar for selecting categories */}
      <div className="left-sidebar">
        <h3>Elements</h3>
        {Object.keys(features).map((category) => (
          <div
            key={category}
            className={`sidebar-item ${selectedCategory === category ? "active" : ""}`}
            onClick={() => setSelectedCategory(category)}
          >
            <span>{category}</span>
          </div>
        ))}
      </div>

      {/* Middle Section for Sketch Area */}
      <div className="sketch-area">
        <div className="sketch-area-box">
          <h3>Sketch Area</h3>
          {sketchItems.map((item) => (
            <Rnd
              key={item.id}
              default={{
                x: item.x,
                y: item.y,
                width: item.width,
                height: item.height,
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
              onClick={() => setActiveItemId(item.id)}
            >
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <img
                  src={item.src}
                  alt={item.category}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
                {activeItemId === item.id && (
                  <button
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      backgroundColor: 'red',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      width: '20px',
                      height: '20px',
                    }}
                    onClick={() => removeFromSketchArea(item.id)}
                  >
                    &times;
                  </button>
                )}
              </div>
            </Rnd>
          ))}
        </div>
        <button className="capture-button" onClick={handleCaptureImage}>Capture Image</button>
        <div className="description-box">
          <h4>Used Elements</h4>
          <ul>
            {sketchItems.map((item) => (
              <li key={item.id}>{item.category}: {item.src.split('/').pop().split('.')[0]}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Sidebar for displaying feature images */}
      <div className="right-sidebar">
        <h3>{selectedCategory ? `${selectedCategory} Images` : "Select a Category"}</h3>
        {selectedCategory && (
          <div className="feature-images">
            {features[selectedCategory].map((feature, index) => (
              <div
                key={index}
                className="feature-image-item"
                onClick={() => addToSketchArea(selectedCategory, feature)}
              >
                <img
                  src={`/features/${selectedCategory}/${feature}`}
                  alt={`${selectedCategory} ${index}`}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for displaying searching database */}
      {/* Modal for displaying searching database */}
<Modal
    isOpen={isSearching}
    onRequestClose={() => setIsSearching(false)}
    className="searching-modal"
    overlayClassName="modal-overlay"
>
    <div className="modal-content">
        <div className="spinner"></div>
        <h2>Searching Database...</h2>
    </div>
</Modal>


      {/* Modal for displaying captured image */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="capture-modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-content">
          <h2>Captured Image</h2>
          <div className="image-box">
            {matchedImage ? (
              <img src={`/faces/${matchedImage}`} alt="Matched Face" style={{ maxWidth: '100%', maxHeight: '100%' }} />
            ) : (
              <p>No matching image found.</p>
            )}
          </div>
          <button className="close-button" onClick={() => setIsModalOpen(false)}>Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default FaceBuilder;
