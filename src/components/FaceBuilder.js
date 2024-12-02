import React, { useState } from "react";
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
  const [isSearching, setIsSearching] = useState(false);

  const features = {
    head: [
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
      "wide.png"
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
      "wide-bridged.png"
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
      "thickwideeybrow.png",
      "thineyebrow.png",
      "wideeyebrow.png",
      "widelongeyebrow.png",
      "widespaceeybrow.png"
    ],
    eyes: [
      "almond.png",
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
      "wideset.png"
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
      "wavy_short.png"
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
      "wide.png"
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
      "walrus.png"
    ],
    earandneck: [
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
      "widethroat.png"
    ]
  };

  const faceDescriptions = [
    { id: "s1", head: "oval", hair: "spiky", nose: "flat", lips: "full", eyes: "almond", earandneck: "leftearnormal" },
    { id: "s2", head: "round", hair: "spiky", nose: "broad", lips: "thin", eyes: "round", earandneck: "widethroat" },
    { id: "s3", head: "square", hair: "spiky", nose: "straight", lips: "defined", eyes: "deepset", earandneck: "rightearthick" },
    { id: "s4", head: "heart", hair: "buzz_cut", nose: "aquiline", lips: "full", eyes: "doublelid", earandneck: "leftearshort" },
    { id: "s5", head: "diamond", hair: "buzz_cut", nose: "hooked", lips: "asymmetrical", eyes: "wideset", earandneck: "thoratlong" },
    { id: "s6", head: "oblong", hair: "wavy_short", nose: "upturned", lips: "bow-shaped", eyes: "hooded", earandneck: "thorat" },
    { id: "s7", head: "triangular", hair: "buzz_cut", nose: "snub", lips: "rounded", eyes: "monlid", earandneck: "leftearthick" },
    { id: "s8", head: "wide", hair: "buzz_cut", nose: "Roman", lips: "sharp-edged", eyes: "upturn", earandneck: "rightearthin" },
    { id: "s9", head: "narrow", hair: "buzz_cut", nose: "button", lips: "pouty", eyes: "prominent", earandneck: "widethroat" },
    { id: "s10", head: "rectangle", hair: "bun_low", nose: "crooked", lips: "matte", eyes: "closet", earandneck: "thoratsharp" },
    { id: "s11", head: "oval", hair: "spiky", nose: "aquiline", lips: "glossy", eyes: "deep", earandneck: "leftearshort" },
    { id: "s12", head: "heart", hair: "ponytail_high", nose: "Greek", lips: "soft-edged", eyes: "monlid", earandneck: "rightearthick" },
    { id: "s13", head: "pear", hair: "bun_low", nose: "broad", lips: "pouty", eyes: "hooded", earandneck: "thorat" },
    { id: "s14", head: "oval", hair: "straight_long", nose: "Roman", lips: "sharp-edged", eyes: "almond", earandneck: "rightearthin" },
    { id: "s15", head: "diamond", hair: "ponytail_high", nose: "upturned", lips: "rounded", eyes: "wideset", earandneck: "widethroat" },
    { id: "s16", head: "round", hair: "layered", nose: "snub", lips: "bow-shaped", eyes: "deepset", earandneck: "leftearnormal" },
    { id: "s17", head: "narrow", hair: "spiky", nose: "straight", lips: "matte", eyes: "doublelid", earandneck: "thoratlong" },
    { id: "s18", head: "wide", hair: "bun_high", nose: "button", lips: "thin", eyes: "closet", earandneck: "rightearthick" },
    { id: "s19", head: "rectangle", hair: "bun_high", nose: "flat", lips: "full", eyes: "round", earandneck: "leftearthin" },
    { id: "s20", head: "square", hair: "bun_high", nose: "hooked", lips: "defined", eyes: "upturn", earandneck: "thoratsharp" },
    { id: "s21", head: "triangular", hair: "ponytail_low", nose: "crooked", lips: "asymmetrical", eyes: "deep", earandneck: "widethroat" },
    { id: "s22", head: "oval", hair: "ponytail_low", nose: "low-bridged", lips: "heart-shaped", eyes: "monlid", earandneck: "rightearshort" },
    { id: "s23", head: "oblong", hair: "bun_high", nose: "snub", lips: "glossy", eyes: "almond", earandneck: "leftearthick" },
    { id: "s24", head: "diamond", hair: "ponytail_low", nose: "upturned", lips: "pouty", eyes: "hooded", earandneck: "rightearthick" },
    { id: "s25", head: "heart", hair: "buzz_cut", nose: "high-bridged", lips: "sharp-edged", eyes: "prominent", earandneck: "thorat" },
    { id: "s26", head: "wide", hair: "buzz_cut", nose: "aquiline", lips: "matte", eyes: "deepset", earandneck: "rightearthin" },
    { id: "s27", head: "narrow", hair: "buzz_cut", nose: "Greek", lips: "rounded", eyes: "round", earandneck: "thoratsharp" },
    { id: "s28", head: "round", hair: "wavy_short", nose: "flat", lips: "full", eyes: "upturn", earandneck: "widethroat" },
    { id: "s29", head: "pear", hair: "spiky", nose: "snub", lips: "bow-shaped", eyes: "doublelid", earandneck: "leftearnormal" },
    { id: "s30", head: "rectangle", hair: "buzz_cut", nose: "button", lips: "thin", eyes: "closet", earandneck: "rightearthick" },
    { id: "s31", head: "oval", hair: "bun_high", nose: "hooked", lips: "sharp-edged", eyes: "deep", earandneck: "leftearshort" },
    { id: "s32", head: "square", hair: "ponytail_low", nose: "upturned", lips: "heart-shaped", eyes: "prominent", earandneck: "thoratlong" },
    { id: "s33", head: "diamond", hair: "curly_short", nose: "broad", lips: "soft-edged", eyes: "hooded", earandneck: "leftearthin" },
    { id: "s34", head: "wide", hair: "wavy_short", nose: "flat", lips: "pouty", eyes: "round", earandneck: "rightearshort" },
    { id: "s35", head: "oval", hair: "bun_high", nose: "snub", lips: "bow-shaped", eyes: "doublelid", earandneck: "thoratsharp" },
    { id: "s36", head: "round", hair: "bun_high", nose: "Roman", lips: "full", eyes: "almond", earandneck: "widethroat" },
    { id: "s37", head: "heart", hair: "bun_high", nose: "upturned", lips: "matte", eyes: "deep", earandneck: "leftearthick" },
    { id: "s38", head: "oblong", hair: "braided_short", nose: "high-bridged", lips: "sharp-edged", eyes: "wideset", earandneck: "thorat" },
    { id: "s39", head: "rectangle", hair: "spiky", nose: "flat", lips: "heart-shaped", eyes: "closet", earandneck: "rightearshort" },
    { id: "s40", head: "square", hair: "ponytail_high", nose: "crooked", lips: "bow-shaped", eyes: "upturn", earandneck: "leftearnormal" },
    { id: "s41", head: "narrow", hair: "straight_long", nose: "snub", lips: "asymmetrical", eyes: "doublelid", earandneck: "rightearthick" },
    { id: "s42", head: "triangular", hair: "layered", nose: "button", lips: "sharp-edged", eyes: "deep", earandneck: "leftearthin" },
    { id: "s43", head: "pear", hair: "wavy_long", nose: "broad", lips: "pouty", eyes: "hooded", earandneck: "rightearshort" },
    { id: "s44", head: "oval", hair: "ponytail_high", nose: "hooked", lips: "rounded", eyes: "wideset", earandneck: "thoratlong" },
    { id: "s45", head: "diamond", hair: "braided_long", nose: "aquiline", lips: "matte", eyes: "round", earandneck: "leftearnormal" },
    { id: "s46", head: "oval", hair: "buzz_cut", nose: "flat", lips: "full", eyes: "almond", earandneck: "leftearnormal" },
    { id: "s47", head: "round", hair: "spiky", nose: "broad", lips: "thin", eyes: "round", earandneck: "widethroat" },
    { id: "s48", head: "square", hair: "spiky", nose: "straight", lips: "defined", eyes: "deepset", earandneck: "rightearshort" },
    { id: "s49", head: "heart", hair: "layered", nose: "aquiline", lips: "full", eyes: "doublelid", earandneck: "leftearshort" },
    { id: "s50", head: "diamond", hair: "straight_long", nose: "hooked", lips: "asymmetrical", eyes: "wideset", earandneck: "thoratlong" }
  ];
  
  const addToSketchArea = (category, feature) => {
    const newItem = {
      id: Date.now(),
      category,
      src: `/features/${category}/${feature}`,
      x: 50,
      y: 50,
      width: 100,
      height: 100
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

      // Create a mapping of used elements
      const usedElements = sketchItems.reduce((acc, item) => {
        acc[item.category] = item.src.split('/').pop().split('.')[0]; // Extract the feature name
        return acc;
      }, {});

      // Prepare the data to be sent to the server
      const sketchData = {
        items: sketchItems,
        usedElements: usedElements,
        matchedImage: matchedImage // Include the matched image
      };

      // Send the data to the server
      fetch('/api/save-sketch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sketchData),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

      // Matching logic
      let bestMatch = null;
      let highestScore = 0;

      faceDescriptions.forEach((face) => {
        let score = 0;

        Object.keys(usedElements).forEach((category) => {
          if (face[category] === usedElements[category]) {
            score++; // Increment score for each matching feature
          }
        });

        if (score > highestScore) {
          highestScore = score;
          bestMatch = face; // Set the best matching face object
        }
      });

      // Update the matched image
      setMatchedImage(bestMatch ? `/faces/${bestMatch.id}.jpg` : null);
      setIsModalOpen(true);
    }, 2000); // Delay of 2 seconds
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
                height: item.height
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
                topLeft: true
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
                      height: '20px'
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
                <p>{feature.split('.')[0]}</p> {/* Display image name */}
              </div>
            ))}
          </div>
        )}
      </div>

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
              <img src={matchedImage} alt="Matched Face" style={{ maxWidth: '100%', maxHeight: '100%' }} />
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