import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import './Starfishgame.css';
import { useNavigate } from 'react-router-dom';

// REMOVE these problematic imports:
// import { FaceMesh } from "@mediapipe/face_mesh";
// import { Camera } from "@mediapipe/camera_utils";

const wordsList = [
  { image: "images/Apple.png", answer: "APPLE" },
  { image: "images/fish2.png", answer: "FISH" },
  { image: "images/star.png", answer: "STAR" },
  { image: "images/hat.png", answer: "HAT" },
  { image: "images/sun.png", answer: "SUN" },
  { image: "images/Tree.png", answer: "TREE" },
  { image: "images/car.png", answer: "CAR" },
  { image: "images/bird.png", answer: "BIRD" },
  { image: "images/moon.png", answer: "MOON" },
  { image: "images/shoes.png", answer: "SHOE" },
  { image: "images/Fox.png", answer: "FOX" },
  { image: "images/Frog.png", answer: "FROG" },
  { image: "images/Deer.png", answer: "DEER" },
  { image: "images/Rain.png", answer: "RAIN" },
  { image: "images/Fan.png", answer: "FAN" },
  { image: "images/Cake.png", answer: "CAKE" },
  { image: "images/Pencil.png", answer: "PENCIL" },
  { image: "images/Book.png", answer: "BOOK" },
  { image: "images/Ship.png", answer: "SHIP" },
  { image: "images/Rose.png", answer: "ROSE" },
  { image: "images/bell.png", answer: "BELL" },
  { image: "images/coat.png", answer: "COAT" },
  { image: "images/Doll.png", answer: "DOLL" },
  { image: "images/Ice.png", answer: "ICE" }
];

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function StarfishGame() {
  const [words, setWords] = useState(shuffleArray(wordsList));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [letters, setLetters] = useState([]);
  const [drops, setDrops] = useState([]);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [mermaidMessage, setMermaidMessage] = useState("");
  const [showMermaid, setShowMermaid] = useState(false);
  const [shakeDrops, setShakeDrops] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const happySoundRef = useRef(null);
  const successSoundRef = useRef(null);
  const correctSoundRef = useRef(null);
  const dropSoundRef = useRef(null);
  const fishSoundRef = useRef(null);
  const starfishSoundRef = useRef(null);
  const octopusSoundRef = useRef(null);
  const faceMeshRef = useRef(null);
  const latestLandmarksRef = useRef(null);
  const expressionRef = useRef("neutral");
  const [faceMeshLoaded, setFaceMeshLoaded] = useState(false);
  const navigate = useNavigate();

  const myComponentStyle = {
    backgroundImage: 'url("images/download.jpg")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100vw'
  };

  const triggerAnimalAnimations = () => {
    const fish = document.getElementById("fish");
    const starfish = document.getElementById("starfish-animal");
    const octopus = document.getElementById("octopus");

    fish?.classList.add("fish-swim");
    starfish?.classList.add("starfish-bounce");
    octopus?.classList.add("octopus-dance");

    fishSoundRef.current?.play();
    starfishSoundRef.current?.play();
    octopusSoundRef.current?.play();

    setTimeout(() => {
      fish?.classList.remove("fish-swim");
      starfish?.classList.remove("starfish-bounce");
      octopus?.classList.remove("octopus-dance");
    }, 3000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (expressionRef.current !== "happy" && expressionRef.current !== "neutral") {
        triggerAnimalAnimations();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    loadWord();
    startWebcam();
    loadMediaPipe(); // Load MediaPipe scripts
    return () => stopWebcam();
  }, [currentIndex]);

  // NEW: Load MediaPipe via CDN scripts
  const loadMediaPipe = async () => {
    try {
      // Load MediaPipe scripts dynamically
      const scripts = [
        'https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js',
        'https://cdn.jsdelivr.net/npm/@mediapipe/control_utils/control_utils.js',
        'https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js',
        'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js'
      ];

      for (const src of scripts) {
        if (!document.querySelector(`script[src="${src}"]`)) {
          await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }
      }

      setFaceMeshLoaded(true);
      console.log("✅ MediaPipe loaded successfully");
    } catch (error) {
      console.error("❌ Failed to load MediaPipe:", error);
    }
  };

  const loadWord = () => {
    const word = words[currentIndex];
    const shuffled = shuffleArray(word.answer.split(''));
    setLetters(shuffled);
    setDrops(Array(word.answer.length).fill(""));
  };

  const drag = (e, letter) => {
    e.dataTransfer.setData("text", letter);
  };

  const allowDrop = (e) => e.preventDefault();

  const dropLetter = (e, index) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text");
    if (drops[index] === "") {
      const newDrops = [...drops];
      newDrops[index] = data;
      setDrops(newDrops);
      dropSoundRef.current?.play();
    }
  };

  const handleNext = () => {
    setAttempts(0);
    const nextIndex = (currentIndex + 1) % words.length;
    setCurrentIndex(nextIndex);
    const shuffled = shuffleArray(words[nextIndex].answer.split(''));
    setLetters(shuffled);
    setDrops(Array(words[nextIndex].answer.length).fill(""));
    setMermaidMessage("");
    setShowMermaid(false);
    setShakeDrops(false);
  };

  const encouragingMessages = [
    "Don't worry, you'll get it next time!",
    "You're doing great, try again!",
    "Oops! That was close!",
    "Keep going, champion!",
    "Mistakes help us learn!",
    "Almost there! You got this!"
  ];

  const handleWrongAnswer = () => {
    const randomMessage = encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
    setMermaidMessage(randomMessage);
    setShowMermaid(true);
    setShakeDrops(true);

    happySoundRef.current?.play();

    setTimeout(() => {
      setShowMermaid(false);
      setShakeDrops(false);
      loadWord();
    }, 8000);
  };

  const checkAnswer = () => {
    const userAnswer = drops.join("");
    const correctAnswer = words[currentIndex].answer;

    if (userAnswer === correctAnswer) {
      setScore(prev => prev + 3);
      successSoundRef.current?.play();
      setShowCelebration(true);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

      const stars = document.getElementById("celebration-stars");
      if (stars) stars.style.display = "flex";

      setTimeout(() => {
        if (stars) stars.style.display = "none";
        setCurrentIndex(prev => (prev + 1) % words.length);
      }, 3000);
    } else {
      setAttempts(prev => prev + 1);
      handleWrongAnswer();

      if (attempts >= 2) {
        setDrops(correctAnswer.split(""));
        setLetters([]);
      }
    }
  };

  const startWebcam = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (webcamRef.current) {
          webcamRef.current.srcObject = stream;
        }
      })
      .catch(err => console.error('Webcam error:', err));
  };

  const stopWebcam = () => {
    if (webcamRef.current?.srcObject) {
      webcamRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
  };

  const sendLandmarksToBackend = async (landmarks) => {
    try {
      const response = await fetch('http://your-backend-url/api/landmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ landmarks }),
      });
      
      if (response.ok) {
        const data = await response.json();
        expressionRef.current = data.expression || "neutral";
        console.log("Expression from model:", data.expression);
      }
    } catch (error) {
      console.error("❌ Failed to send landmarks:", error);
    }
  };

  // NEW: Initialize FaceMesh using global window object
  const initFaceMesh = () => {
    if (!window.FaceMesh || !window.Camera) {
      console.error("MediaPipe not loaded yet");
      return;
    }

    try {
      const faceMesh = new window.FaceMesh({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
      });

      faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      faceMesh.onResults((results) => {
        if (results.multiFaceLandmarks?.length > 0) {
          const landmarks = results.multiFaceLandmarks[0];
          latestLandmarksRef.current = landmarks;
          sendLandmarksToBackend(landmarks);
        }
      });

      faceMeshRef.current = faceMesh;

      // Start camera with MediaPipe
      if (webcamRef.current) {
        const camera = new window.Camera(webcamRef.current, {
          onFrame: async () => {
            if (faceMeshRef.current && webcamRef.current) {
              await faceMeshRef.current.send({ image: webcamRef.current });
            }
          },
          width: 640,
          height: 480,
        });
        camera.start();
      }

      console.log("✅ FaceMesh initialized successfully");
    } catch (error) {
      console.error("❌ Failed to initialize FaceMesh:", error);
    }
  };

  // Initialize FaceMesh when MediaPipe is loaded
  useEffect(() => {
    if (faceMeshLoaded) {
      initFaceMesh();
    }
  }, [faceMeshLoaded]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (latestLandmarksRef.current) {
        sendLandmarksToBackend(latestLandmarksRef.current);
      }
    }, 5000);

    return () => {
      stopWebcam();
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {showMermaid && (
        <div className="mermaid">
          <img src="/images/Mermaid.png" alt="Mermaid" className="mermaid" />
          <div className="mermaid-message-bubble">{mermaidMessage}</div>
        </div>
      )}

      <div style={myComponentStyle}>
        <div id="score-board">Score: {score} ⭐</div>

        <img id="fish" className="marine" src="/images/fish1.png" style={{ top: '30%', left: '10%' }} />
        <img id="starfish-animal" className="marine" src="images/starfish.png" style={{ bottom: '10%', left: '10%' }} />
        <img id="octopus" className="marine" src="images/octopus.png" style={{ top: '50%', right: '20%' }} />

        <audio id="happySound" ref={happySoundRef} src="Audio_files/Voicy_You can do it, Woody!.mp3"></audio>
        <audio id="successSound" ref={successSoundRef} src="Audio_files/aplausos_2_Ke6sVFG.mp3"></audio>
        <audio id="correctSound" ref={correctSoundRef} src="Audio_files/correct-ans_ZBwbPlU.mp3"></audio>
        <audio id="dropSound" ref={dropSoundRef} src="Audio_files/applepay.mp3"></audio>

        <audio ref={fishSoundRef} src="/Audio_files/cartoon-flip_0mhhTzj.mp3" />
        <audio ref={starfishSoundRef} src="/Audio_files/cartoonslip.mp3" />
        <audio ref={octopusSoundRef} src="/Audio_files/Voicy_You can do it, Woody!.mp3" />

        <div id="game-container">
          <img id="word-image" src={words[currentIndex].image} alt="Word" />

          <div id="droppable-areas">
            {drops.map((drop, i) => (
              <div
                key={i}
                className={`drop ${shakeDrops ? "shake" : ""}`}
                onDrop={(e) => dropLetter(e, i)}
                onDragOver={allowDrop}
              >
                {drop}
              </div>
            ))}
          </div>

          <div id="starfish-letters">
            {letters.map((letter, i) => (
              <div
                key={i}
                className="starfish"
                draggable
                onDragStart={(e) => drag(e, letter)}
              >
                {letter}
              </div>
            ))}
          </div>

          <div
            id="celebration-stars"
            className="star-celebration"
            style={{ display: showCelebration ? "flex" : "none" }}
          >
            <img src="/images/celebration_star.png" alt="Star" />
            <img src="/images/celebration_star.png" alt="Star" />
            <img src="/images/celebration_star.png" alt="Star" />
          </div>

          <div id="buttons">
            <button onClick={handleNext}>Next</button>
            <button onClick={checkAnswer}>Check</button>
            <button onClick={() => navigate('/Homepage')}>Exit</button>
          </div>
        </div>

        <video ref={webcamRef} autoPlay muted playsInline width="640" height="480" style={{ display: 'none' }} />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </>
  );
}