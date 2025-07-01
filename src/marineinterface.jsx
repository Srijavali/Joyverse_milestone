// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./marineinterface.css";

// const App = () => {
//   useEffect(() => {
//     // Ensure ocean sound plays after first user interaction
//     const playOceanSound = () => {
//       const bgSound = document.getElementById("bgSound");
//       if (bgSound && bgSound.paused) {
//         bgSound.play();
//       }
//     };

//     window.addEventListener("click", playOceanSound);

//     return () => {
//       window.removeEventListener("click", playOceanSound);
//     };
//   }, []);

//   const playSound = (type) => {
//     const sound = document.getElementById(type === 'play' ? 'playSound' : 'exitSound');
//     sound.play();
//     sound.onended = () => {
//       window.location.href = type === 'play' ? 'StarfishSpelling game.html' : 'view.html';
//     };
//   };

//   return (
//     <div className="App">
//       {/* Ocean Floating Container */}
//       <div className="ocean-container">
//         <h1 className="title">Welcome to Ocean World!</h1>
//         <div className="button-wrapper">
//           <button className="play-btn" onClick={() => playSound('play')}>▶ Play</button>
//           <button className="exit-btn" onClick={() => playSound('exit')}>⛔ Exit</button>
//         </div>
//       </div>

//       {/* Click Sound Effects */}
//       <audio id="playSound" src="Audio_files/studio-audience-awwww-sound-fx.mp3" />
//       <audio id="exitSound" src="Audio_files/mouse-click-sound-fx.mp3" />

//       {/* Ocean Background Audio */}
//       <audio id="bgSound" autoPlay loop>
//         <source src="Audio_files/copy-of-ocean-wave-1-online-audio-converter.mp3" type="audio/mpeg" />
//       </audio>
//     </div>
//   );
// };
// export default MarineInterface;


import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './marineinterface.css';

const MarineInterface = () => {
  const bgSoundRef = useRef(null);
  const playSoundRef = useRef(null);
  const exitSoundRef = useRef(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    // Handle background sound on user interaction
    const handleClick = () => {
      if (bgSoundRef.current && bgSoundRef.current.paused) {
        bgSoundRef.current.play().catch(error => {
          console.log('Background audio play failed:', error);
        });
      }
    };

    // Add click listener to enable background sound
    window.addEventListener('click', handleClick);

    // Cleanup
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  const playSound = (type) => {
    if (type === 'play') {
      const sound = playSoundRef.current;
      if (sound) {
        sound.play().catch(error => {
          console.log('Play sound failed:', error);
        });
        
        sound.onended = () => {
          // Navigate to the game page
          //window.location.href = '';
          // Or if using React Router:
          navigate('/Starfishgame');
        };
      }
    } else if (type === 'exit') {
      const sound = exitSoundRef.current;
      if (sound) {
        sound.play().catch(error => {
          console.log('Exit sound failed:', error);
        });
        
        sound.onended = () => {
          // Navigate to the view page
          //window.location.href = 'view.html';
          // Or if using React Router:
          navigate('/Homepage');
        };
      }
    }
  };

  return (
    <div>
      {/* Fullscreen Background Video */}
      <video autoPlay muted loop playsInline id="bgVideo">
        <source src="video/Marine_interface_bg_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Background Ocean Sound */}
      <audio ref={bgSoundRef} id="bgSound" autoPlay loop>
        <source src="Audio_files/copy-of-ocean-wave-1-online-audio-converter.mp3" type="audio/mpeg" />
        Your browser does not support the audio tag.
      </audio>

      {/* Floating Container */}
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

      {/* Click Sounds */}
      <audio ref={playSoundRef} id="playSound" src="Audio_files/studio-audience-awwww-sound-fx.mp3" />
      <audio ref={exitSoundRef} id="exitSound" src="Audio_files/mouse-click-sound-fx.mp3" />
    </div>
  );
};

export default MarineInterface;
