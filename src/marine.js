// // marineinterface.js
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./marineinterface.css"; // Assuming you're using a CSS file

// function MarineInterface() {
//   const navigate = useNavigate();

//   const handlePlay = () => {
//     navigate("/game");
//   };

//   return (
//     <div className="marine-interface">
//       <h1>Welcome to JoyVerse!</h1>
//       <button className="play-button" onClick={handlePlay}>
//         Play
//       </button>
//     </div>
//   );
// }

// export default MarineInterface;

import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import this
import './marineinterface.css';

const MarineInterface = () => {
  const navigate = useNavigate(); // ✅ Define it here

  const bgSoundRef = useRef(null);
  const playSoundRef = useRef(null);
  const exitSoundRef = useRef(null);

  useEffect(() => {
    const handleClick = () => {
      if (bgSoundRef.current && bgSoundRef.current.paused) {
        bgSoundRef.current.play().catch(error => {
          console.log('Background audio play failed:', error);
        });
      }
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const playSound = (type) => {
    if (type === 'play') {
      const sound = playSoundRef.current;
      if (sound) {
        sound.play().catch(error => {
          console.log('Play sound failed:', error);
          navigate('/Starfishgame'); // Fallback in case audio fails
        });

        sound.onended = () => {
          navigate('/Starfishgame'); // ✅ Navigate when audio ends
        };
      }
    } else if (type === 'exit') {
      const sound = exitSoundRef.current;
      if (sound) {
        sound.play().catch(error => {
          console.log('Exit sound failed:', error);
        });

        sound.onended = () => {
          // Optional navigation
          // navigate('/view');
        };
      }
    }
  };

  return (
    <div className="marine-interface">
      <video autoPlay muted loop playsInline id="bgVideo">
        <source src="video/Marine_interface_bg_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <audio ref={bgSoundRef} id="bgSound" autoPlay loop>
        <source src="Audio_files/copy-of-ocean-wave-1-online-audio-converter.mp3" type="audio/mpeg" />
        Your browser does not support the audio tag.
      </audio>

      <div className="ocean-container">
        <h1 className="title">Welcome to Ocean World!</h1>
        <div className="button-wrapper">
          <button className="play-btn" onClick={() => playSound('play')}>
            ▶ Play
          </button>
          <button className="exit-btn" onClick={() => playSound('exit')}>
            ⛔ Exit
          </button>
        </div>
      </div>

      <audio ref={playSoundRef} id="playSound" src="Audio_files/studio-audience-awwww-sound-fx.mp3" />
      <audio ref={exitSoundRef} id="exitSound" src="Audio_files/mouse-click-sound-fx.mp3" />
    </div>
  );
};

export default MarineInterface;
