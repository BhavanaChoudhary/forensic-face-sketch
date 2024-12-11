import React from 'react'; 
import Rnd from 'react-rnd';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation
import './HomePage.css';


const HomePage = () => {
  const navigate = useNavigate();

  const handleManualInput = () => {
    navigate('/sketch');
  };

  const handleVoiceInput = () => {
    navigate('/voice-record'); // Update to navigate to the VoiceRecordPage
  };
  const handleVideoInput = () => {
    navigate('/video-input'); // Update to navigate to the VoiceRecordPage
  };
  return (
    <div>
      {/* Upper Section */}
      <div className="upper-section">
        <div className="content">
          <h1>FACE AURA - a forensic face sketching system</h1>
          <p>
            In forensic science, hand-drawn face sketches are often time-consuming and limited in their
            effectiveness for matching with databases. This system uses modern technology to create composite
            face sketches through a drag-and-drop interface, enabling faster and more accurate identification of
            suspects.
          </p>
          <p>
            Features include security measures like centralized server
            usage. The platform leverages various algorithms for face recognition, offering over 90% accuracy
            in tests, and supports  manually-drawn , giving voice commands and video records for database matching.
          </p>
        </div>

        {/* SVG Animation */}
        <div className="svg-container">
          <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 400" xmlns="http://www.w3.org/2000/svg" className="transition-all duration-300 ease-in-out">
            <path d="M 0,700 L 0,105 C 72.12426362297495,110.88595360824742 144.2485272459499,116.77190721649484 203,113 C 261.7514727540501,109.22809278350516 307.13015463917526,95.79832474226805 355,127 C 402.86984536082474,158.20167525773195 453.230854197349,234.034793814433 525,262 C 596.769145802651,289.965206185567 689.9464285714286,270.0625 753,292 C 816.0535714285714,313.9375 848.9834315169367,377.715206185567 904,420 C 959.0165684830633,462.284793814433 1036.119845360825,483.07667525773195 1101,503 C 1165.880154639175,522.923324742268 1218.5371870397644,541.9780927835052 1273,563 C 1327.4628129602356,584.0219072164948 1383.7314064801178,607.0109536082474 1440,630 L 1440,700 L 0,700 Z" stroke="none" strokeWidth="0" fill="#0693e3" fillOpacity="0.265" className="transition-all duration-300 ease-in-out delay-150 path-0" transform="rotate(-180 720 200)"/>
            <path d="M 0,700 L 0,245 C 67.52761413843888,222.4207474226804 135.05522827687776,199.8414948453608 196,209 C 256.94477172312224,218.1585051546392 311.30670103092785,259.05476804123714 360,309 C 408.69329896907215,358.94523195876286 451.71796759941094,417.9394329896907 507,445 C 562.2820324005891,472.0605670103093 629.8214285714286,467.18749999999994 706,472 C 782.1785714285714,476.81250000000006 866.9963181148748,491.31056701030934 930,518 C 993.0036818851252,544.6894329896907 1034.193298969072,583.5702319587629 1093,608 C 1151.806701030928,632.4297680412371 1228.2304860088366,642.4085051546392 1289,667 C 1349.7695139911634,691.5914948453608 1394.8847569955817,730.7957474226804 1440,770 L 1440,700 L 0,700 Z" stroke="none" strokeWidth="0" fill="#0693e3" fillOpacity="0.4" className="transition-all duration-300 ease-in-out delay-150 path-1" transform="rotate(-180 720 200)"/>
            <path d="M 0,700 L 0,385 C 76.37720913107512,354.8465574374079 152.75441826215024,324.6931148748159 205,342 C 257.24558173784976,359.3068851251841 285.35953608247416,424.0740979381444 345,470 C 404.64046391752584,515.9259020618556 495.8074374079529,543.0104933726068 565,555 C 634.1925625920471,566.9895066273932 681.4107142857142,563.8839285714287 728,582 C 774.5892857142858,600.1160714285713 820.54970544919,639.453792341679 875,665 C 929.45029455081,690.546207658321 992.3904639175257,702.3009020618556 1065,717 C 1137.6095360824743,731.6990979381444 1219.888438880707,749.3425994108984 1284,782 C 1348.111561119293,814.6574005891016 1394.0557805596463,862.3287002945508 1440,910 L 1440,700 L 0,700 Z" stroke="none" strokeWidth="0" fill="#0693e3" fillOpacity="0.53" className="transition-all duration-300 ease-in-out delay-150 path-2" transform="rotate(-180 720 200)"/>
            <path d="M 0,700 L 0,525 C 62.545103092783506,507.577411634757 125.09020618556701,490.154823269514 182,496 C 238.909793814433,501.845176730486 290.18427835051546,530.958118556701 357,569 C 423.81572164948454,607.041881443299 506.17268041237116,654.0127025036819 568,693 C 629.8273195876288,731.9872974963181 671.125,762.9910714285713 731,787 C 790.875,811.0089285714287 869.327319587629,828.0230117820323 922,852 C 974.672680412371,875.9769882179677 1001.5657216494844,906.9168814432991 1060,932 C 1118.4342783505156,957.0831185567009 1208.4097938144332,976.3094624447717 1277,995 C 1345.5902061855668,1013.6905375552283 1392.7951030927834,1031.8452687776141 1440,1050 L 1440,700 L 0,700 Z" stroke="none" strokeWidth="0" fill="#0693e3" fillOpacity="1" className="transition-all duration-300 ease-in-out delay-150 path-3" transform="rotate(-180 720 200)"/>
          </svg>
        </div>
      </div>

      {/* Lower Section */}
      <div className="lower-section">
        <h1>CHOOSE AN OPTION TO PROCEED</h1>
        <div className="input-boxes">
          <div className="input-box">
            <h3>Voice Input</h3>
            <button onClick={handleVoiceInput}>Record Voice</button> 
          </div>
          <div className="input-box">
            <h3>Video Input</h3>
            <button onClick={handleVideoInput}>Capture Video</button>
          </div>
          <div className="input-box">
            <h3>Manual Input</h3>
            <button onClick={handleManualInput}>Manual Input</button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default HomePage;
