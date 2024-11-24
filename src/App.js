import React from 'react';
import FaceBuilder from './components/FaceBuilder';

const features = {
  head: [
    '/features/head/head01.jpg', '/features/head/head02.jpg', '/features/head/head03.jpg',
    '/features/head/head04.jpg', '/features/head/head05.jpg', '/features/head/head06.jpg',
    '/features/head/head07.jpg', '/features/head/head08.jpg', '/features/head/head09.jpg',
    '/features/head/head10.jpg', '/features/head/head11.jpg', '/features/head/head12.jpg',
    '/features/head/head13.jpg', '/features/head/head14.jpg', '/features/head/head15.jpg',
    '/features/head/head16.jpg', '/features/head/head17.jpg', '/features/head/head18.jpg',
    '/features/head/head19.jpg', '/features/head/head20.jpg'
  ],
  hair: [
    '/features/hair/hair01.png', '/features/hair/hair02.jpg', '/features/hair/hair03.jpg',
    '/features/hair/hair04.jpg', '/features/hair/hair05.jpg', '/features/hair/hair06.jpg',
    '/features/hair/hair07.jpg', '/features/hair/hair08.jpg', '/features/hair/hair09.jpg',
    '/features/hair/hair10.jpg', '/features/hair/hair11.jpg', '/features/hair/hair12.jpg',
    '/features/hair/hair13.jpg', '/features/hair/hair14.jpg', '/features/hair/hair15.jpg',
    '/features/hair/hair16.jpg', '/features/hair/hair17.jpg', '/features/hair/hair18.jpg',
    '/features/hair/hair19.jpg', '/features/hair/hair20.jpg'
  ],
  eyes: [
    '/features/eyes/eyes01.png', '/features/eyes/eyes02.png', '/features/eyes/eyes03.jpg',
    '/features/eyes/eyes04.jpg', '/features/eyes/eyes05.jpg', '/features/eyes/eyes06.jpg',
    '/features/eyes/eyes07.jpg', '/features/eyes/eyes08.jpg', '/features/eyes/eyes09.jpg',
    '/features/eyes/eyes10.jpg', '/features/eyes/eyes11.jpg', '/features/eyes/eyes12.jpg',
    '/features/eyes/eyes13.jpg', '/features/eyes/eyes14.jpg', '/features/eyes/eyes15.jpg',
    '/features/eyes/eyes16.jpg', '/features/eyes/eyes17.jpg', '/features/eyes/eyes18.jpg',
    '/features/eyes/eyes19.jpg', '/features/eyes/eyes20.jpg'
  ],
  eyebrows: [
    '/features/eyebrows/eyebrows01.jpg', '/features/eyebrows/eyebrows02.jpg', '/features/eyebrows/eyebrows03.jpg',
    '/features/eyebrows/eyebrows04.jpg', '/features/eyebrows/eyebrows05.jpg', '/features/eyebrows/eyebrows06.jpg',
    '/features/eyebrows/eyebrows07.jpg', '/features/eyebrows/eyebrows08.jpg', '/features/eyebrows/eyebrows09.jpg',
    '/features/eyebrows/eyebrows10.jpg', '/features/eyebrows/eyebrows11.jpg', '/features/eyebrows/eyebrows12.jpg',
    '/features/eyebrows/eyebrows13.jpg', '/features/eyebrows/eyebrows14.jpg', '/features/eyebrows/eyebrows15.jpg',
    '/features/eyebrows/eyebrows16.jpg', '/features/eyebrows/eyebrows17.jpg', '/features/eyebrows/eyebrows18.jpg',
    '/features/eyebrows/eyebrows19.jpg', '/features/eyebrows/eyebrows20.jpg'
  ],
  nose: [
    '/features/nose/nose01.jpg', '/features/nose/nose02.jpg', '/features/nose/nose03.jpg',
    '/features/nose/nose04.jpg', '/features/nose/nose05.jpg', '/features/nose/nose06.jpg',
    '/features/nose/nose07.jpg', '/features/nose/nose08.jpg', '/features/nose/nose09.jpg',
    '/features/nose/nose10.jpg', '/features/nose/nose11.jpg', '/features/nose/nose12.jpg',
    '/features/nose/nose13.jpg', '/features/nose/nose14.jpg', '/features/nose/nose15.jpg',
    '/features/nose/nose16.jpg', '/features/nose/nose17.jpg', '/features/nose/nose18.jpg',
    '/features/nose/nose19.jpg', '/features/nose/nose20.jpg'
  ],
  lips: [
    '/features/lips/lips01.jpg', '/features/lips/lips02.jpg', '/features/lips/lips03.jpg',
    '/features/lips/lips04.jpg', '/features/lips/lips05.jpg', '/features/lips/lips06.jpg',
    '/features/lips/lips07.jpg', '/features/lips/lips08.jpg', '/features/lips/lips09.jpg',
    '/features/lips/lips10.jpg', '/features/lips/lips11.jpg', '/features/lips/lips12.jpg',
    '/features/lips/lips13.jpg', '/features/lips/lips14.jpg', '/features/lips/lips15.jpg',
    '/features/lips/lips16.jpg', '/features/lips/lips17.jpg', '/features/lips/lips18.jpg',
    '/features/lips/lips19.jpg', '/features/lips/lips20.jpg'
  ],
  moustache: [
    '/features/mustache/mustache01.jpg', '/features/mustache/mustache02.jpg', '/features/mustache/mustache03.jpg',
    '/features/mustache/mustache04.jpg', '/features/mustache/mustache05.jpg', '/features/mustache/mustache06.jpg',
    '/features/mustache/mustache07.jpg', '/features/mustache/mustache08.jpg', '/features/mustache/mustache09.jpg',
    '/features/mustache/mustache10.jpg', '/features/mustache/mustache11.jpg', '/features/mustache/mustache12.jpg',
    '/features/mustache/mustache13.jpg', '/features/mustache/mustache14.jpg', '/features/mustache/mustache15.jpg',
    '/features/mustache/mustache16.jpg', '/features/mustache/mustache17.jpg', '/features/mustache/mustache18.jpg',
    '/features/mustache/mustache19.jpg', '/features/mustache/mustache20.jpg'
  ],
  ear_and_neck: [
    '/features/ear-and-neck/ear_and_neck01.jpg', '/features/ear-and-neck/ear_and_neck02.jpg', '/features/ear-and-neck/ear_and_neck03.jpg',
    '/features/ear-and-neck/ear_and_neck04.jpg', '/features/ear-and-neck/ear_and_neck05.jpg', '/features/ear-and-neck/ear_and_neck06.jpg',
    '/features/ear-and-neck/ear_and_neck07.jpg', '/features/ear-and-neck/ear_and_neck08.jpg', '/features/ear-and-neck/ear_and_neck09.jpg',
    '/features/ear-and-neck/ear_and_neck10.jpg', '/features/ear-and-neck/ear_and_neck11.jpg', '/features/ear-and-neck/ear_and_neck12.jpg',
    '/features/ear-and-neck/ear_and_neck13.jpg', '/features/ear-and-neck/ear_and_neck14.jpg', '/features/ear-and-neck/ear_and_neck15.jpg',
    '/features/ear-and-neck/ear_and_neck16.jpg', '/features/ear-and-neck/ear_and_neck17.jpg', '/features/ear-and-neck/ear_and_neck18.jpg',
    '/features/ear-and-neck/ear_and_neck19.jpg', '/features/ear-and-neck/ear_and_neck20.jpg'
  ],
};

function App() {
  return (
    <div>
      <FaceBuilder features={features} />
    </div>
  );
}

export default App;
