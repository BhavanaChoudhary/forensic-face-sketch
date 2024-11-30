import React from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import HomePage from './components/HomePage'; 
import FaceBuilder from './components/FaceBuilder';  
import VoiceRecordPage from './components/VoiceRecordPage'; 
import VideoInputPage from './components/VideoInputPage';

const features = {
  head: [
    '/features/head/head01.png', '/features/head/head02.png', '/features/head/head03.png',
    '/features/head/head04.png', '/features/head/head05.png', '/features/head/head06.png',
    '/features/head/head07.png', '/features/head/head08.png', '/features/head/head09.png',
    '/features/head/head10.png', '/features/head/head11.png',  '/features/head/head12.png',
  ],
  hair: [
    '/features/hair/hair01.png', '/features/hair/hair02.png', '/features/hair/hair03.png',
    '/features/hair/hair04.png', '/features/hair/hair05.png', '/features/hair/hair06.png',
    '/features/hair/hair07.png', '/features/hair/hair08.png', '/features/hair/hair09.png',
    '/features/hair/hair10.png', '/features/hair/hair11.png', '/features/hair/hair12.png',
    '/features/hair/hair13.png', '/features/hair/hair14.png', '/features/hair/hair15.png',
    '/features/hair/hair16.png'
  ],
  eyes: [
    '/features/eyes/eyes01.png', '/features/eyes/eyes02.png', '/features/eyes/eyes03.png',
    '/features/eyes/eyes04.png', '/features/eyes/eyes05.png', '/features/eyes/eyes06.png',
    '/features/eyes/eyes07.png', '/features/eyes/eyes08.png', '/features/eyes/eyes09.png',
    '/features/eyes/eyes10.png', '/features/eyes/eyes11.png', '/features/eyes/eyes12.png',
    '/features/eyes/eyes13.png', '/features/eyes/eyes14.png'
  ],
  eyebrow: [
    '/features/eyebrow/eyebrow01.png', '/features/eyebrow/eyebrow02.png', '/features/eyebrow/eyebrow03.png',
    '/features/eyebrow/eyebrow04.png', '/features/eyebrow/eyebrow05.png', '/features/eyebrow/eyebrow06.png',
    '/features/eyebrow/eyebrow07.png', '/features/eyebrow/eyebrow08.png', '/features/eyebrow/eyebrow09.png',
    '/features/eyebrow/eyebrow10.png', '/features/eyebrow/eyebrow11.png', '/features/eyebrow/eyebrow12.png',
    '/features/eyebrow/eyebrow13.png', '/features/eyebrow/eyebrow14.png', '/features/eyebrow/eyebrow15.png',
    '/features/eyebrow/eyebrow16.png', '/features/eyebrow/eyebrow17.png', '/features/eyebrow/eyebrow18.png'
  ],
  nose: [
    '/features/nose/nose01.png', '/features/nose/nose02.png', '/features/nose/nose03.png',
    '/features/nose/nose04.png', '/features/nose/nose05.png', '/features/nose/nose06.png',
    '/features/nose/nose07.png', '/features/nose/nose08.png', '/features/nose/nose09.png',
    '/features/nose/nose10.png', '/features/nose/nose11.png', '/features/nose/nose12.png',
    '/features/nose/nose13.png', '/features/nose/nose14.png', '/features/nose/nose15.png',
    '/features/nose/nose16.png', '/features/nose/nose17.png', '/features/nose/nose18.png',
    '/features/nose/nose19.png', '/features/nose/nose20.png', '/features/nose/nose21.png'
  ],
  lips: [
    '/features/lips/lips01.png', '/features/lips/lips02.png', '/features/lips/lips03.png',
    '/features/lips/lips04.png', '/features/lips/lips05.png', '/features/lips/lips06.png',
    '/features/lips/lips07.png', '/features/lips/lips08.png', '/features/lips/lips09.png',
    '/features/lips/lips10.png', '/features/lips/lips11.png', '/features/lips/lips12.png',
    '/features/lips/lips13.png', '/features/lips/lips14.png', '/features/lips/lips15.png',
    '/features/lips/lips16.png', '/features/lips/lips17.png', '/features/lips/lips18.png'
  ],
  moustache: [
    '/features/moustache/moustache01.png', 
    '/features/moustache/moustache02.png', 
    '/features/moustache/moustache03.png',
    '/features/moustache/moustache04.png', 
    '/features/moustache/moustache05.png', 
    '/features/moustache/moustache06.png',
    '/features/moustache/moustache07.png', 
    '/features/moustache/moustache08.png', 
    '/features/moustache/moustache09.png',
    '/features/moustache/moustache10.png', 
    '/features/moustache/moustache11.png', 
    '/features/moustache/moustache12.png',
    '/features/moustache/moustache13.png', 
    '/features/moustache/moustache14.png', 
    '/features/moustache/moustache15.png'
  ],
  ear_and_neck: [
    '/features/ear and neck/ear and neck01.png', '/features/ear and neck/ear and neck02.png', 
    '/features/ear and neck/ear and neck03.png', '/features/ear and neck/ear and neck04.png',
    '/features/ear and neck/ear and neck05.png', '/features/ear and neck/ear and neck06.png',
    '/features/ear and neck/ear and neck07.png', '/features/ear and neck/ear and neck08.png', 
    '/features/ear and neck/ear and neck09.png', '/features/ear and neck/ear and neck10.png', 
    '/features/ear and neck/ear and neck11.png', '/features/ear and neck/ear and neck12.png', 
    '/features/ear and neck/ear and neck13.png', '/features/ear and neck/ear and neck14.png'
  ]
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sketch" element={<FaceBuilder features={features} />} />
        <Route path="/voice-record" element={<VoiceRecordPage />} />
        <Route path="/video-input" element={<VideoInputPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
