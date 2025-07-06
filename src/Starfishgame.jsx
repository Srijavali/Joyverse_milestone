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
  const cameraRef = useRef(null);

  const [currentExpression, setCurrentExpression] = useState("neutral");



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
  // Stop MediaPipe Camera (this is what you need)
  if (cameraRef.current) {
    cameraRef.current.stop();
    cameraRef.current = null;
    console.log("✅ MediaPipe camera stopped");
  }

  // Also stop any direct stream if it exists
  if (webcamRef.current?.srcObject) {
    webcamRef.current.srcObject.getTracks().forEach((track) => track.stop());
    webcamRef.current.srcObject = null;
    console.log("✅ Raw webcam stream stopped");
  }
};


// const sendLandmarksToBackend = async (landmarks) => {
//   try {
//     // Ensure we only use 468 facial landmarks (ignore iris, etc.)
//     const sliced = landmarks.slice(0, 468);

//     const paddedLandmarks = sliced.map(landmark => {
//       const arr = [landmark.x, landmark.y, landmark.z];
//       while (arr.length < 64) arr.push(0); // pad to 64-dim
//       return arr;
//     });

//     // Extra safety check
//     if (paddedLandmarks.length !== 468) {
//       console.warn("⚠️ Landmarks length after slicing:", paddedLandmarks.length);
//       return;
//     }

//     const response = await fetch("http://localhost:8000/predict", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ landmarks: paddedLandmarks }),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       expressionRef.current = data.prediction_label || "neutral";
//       setCurrentExpression(data.prediction_label);
//       console.log("🧠 Expression:", data.prediction_label);
//     } else {
//       console.error("❌ Prediction failed:", await response.text());
//     }
//   } catch (error) {
//     console.error("❌ Error sending landmarks:", error);
//   }
// };


// const sendLandmarksToBackend = async (landmarks) => {
//   try {
//     console.log("🔍 Original landmarks length:", landmarks.length);
//     console.log("📊 Sample landmark structure:", landmarks[0]);
    
//     // Ensure we only use 468 facial landmarks (ignore iris, etc.)
//     const sliced = landmarks.slice(0, 468);
//     console.log("✂️ After slicing to 468:", sliced.length);
    
//     // Validate landmarks structure
//     if (!sliced[0] || typeof sliced[0].x === 'undefined') {
//       console.error("❌ Invalid landmark structure");
//       return;
//     }
    
//     const paddedLandmarks = sliced.map((landmark, index) => {
//       // Basic validation
//       if (!landmark || typeof landmark.x === 'undefined') {
//         console.warn(`⚠️ Invalid landmark at index ${index}:`, landmark);
//         return new Array(64).fill(0);
//       }
      
//       // Handle MediaPipe landmarks (normalized coordinates)
//       let x = landmark.x || 0;
//       let y = landmark.y || 0;
//       let z = landmark.z || 0;
      
//       // Check if coordinates are in normalized range [0,1] or pixel coordinates
//       // MediaPipe face landmarks are typically normalized
//       if (x > 1 || y > 1) {
//         console.warn("⚠️ Coordinates seem to be in pixel space, consider normalizing");
//       }
      
//       // Create feature vector - you might need to adjust this based on your training data
//       const arr = [
//         x, y, z,                          // Basic coordinates
//         landmark.visibility || 0,         // Visibility if available
//         // Add more features if your model was trained with them
//         x * x, y * y, z * z,             // Squared terms
//         x * y, y * z, x * z,             // Cross terms
//         Math.sqrt(x*x + y*y + z*z),      // Distance from origin
//         Math.atan2(y, x),                 // Angle in xy plane
//         Math.asin(z / Math.sqrt(x*x + y*y + z*z)) || 0, // Elevation angle
//       ];
      
//       // Pad to 64 dimensions with zeros
//       while (arr.length < 64) {
//         arr.push(0);
//       }
      
//       // Truncate if somehow longer than 64
//       return arr.slice(0, 64);
//     });
    
//     // Final validation
//     if (paddedLandmarks.length !== 468) {
//       console.error(`❌ Wrong number of landmarks: ${paddedLandmarks.length}, expected 468`);
//       return;
//     }
    
//     // Check for NaN or invalid values
//     const hasInvalidValues = paddedLandmarks.some(landmark => 
//       landmark.some(val => isNaN(val) || !isFinite(val))
//     );
    
//     if (hasInvalidValues) {
//       console.warn("⚠️ Found NaN or infinite values in landmarks");
//       // Clean up invalid values
//       paddedLandmarks.forEach(landmark => {
//         for (let i = 0; i < landmark.length; i++) {
//           if (isNaN(landmark[i]) || !isFinite(landmark[i])) {
//             landmark[i] = 0;
//           }
//         }
//       });
//     }
    
//     console.log("📤 Sending landmarks with shape:", paddedLandmarks.length, "x", paddedLandmarks[0].length);
//     console.log("🔢 Sample landmark vector:", paddedLandmarks[0].slice(0, 10), "...");
    
//     const response = await fetch("http://localhost:8000/predict", {
//       method: "POST",
//       headers: { 
//         "Content-Type": "application/json",
//         "Accept": "application/json"
//       },
//       body: JSON.stringify({ landmarks: paddedLandmarks }),
//     });
    
//     if (response.ok) {
//       const data = await response.json();
//       console.log("✅ Backend response:", data);
      
//       expressionRef.current = data.prediction_label || "neutral";
//       setCurrentExpression(data.prediction_label);
      
//       console.log(`🧠 Expression: ${data.prediction_label} (confidence: ${(data.confidence * 100).toFixed(1)}%)`);
      
//       // Log all probabilities for debugging
//       if (data.all_probabilities) {
//         console.log("📊 All class probabilities:", data.all_probabilities);
//       }
//     } else {
//       const errorText = await response.text();
//       console.error("❌ Prediction failed:", response.status, errorText);
      
//       // Try to parse error details
//       try {
//         const errorData = JSON.parse(errorText);
//         console.error("📋 Error details:", errorData);
//       } catch (e) {
//         console.error("📋 Raw error:", errorText);
//       }
//     }
//   } catch (error) {
//     console.error("❌ Error sending landmarks:", error);
//     console.error("📋 Error stack:", error.stack);
//   }
// };

// // Optional: Add a function to test the connection
// const testBackendConnection = async () => {
//   try {
//     const response = await fetch("http://localhost:8000/health");
//     if (response.ok) {
//       const data = await response.json();
//       console.log("✅ Backend health check:", data);
//       return true;
//     } else {
//       console.error("❌ Backend health check failed:", response.status);
//       return false;
//     }
//   } catch (error) {
//     console.error("❌ Cannot connect to backend:", error);
//     return false;
//   }
// };

// // Call this when your app starts to verify backend connection
// testBackendConnection();


const sendLandmarksToBackend = async (landmarks) => {
  try {
    console.log("🔍 Original landmarks length:", landmarks.length);
    console.log("📊 Sample landmark structure:", landmarks[0]);
    
    // Ensure we only use 468 facial landmarks (ignore iris, etc.)
    const sliced = landmarks.slice(0, 468);
    console.log("✂️ After slicing to 468:", sliced.length);
    
    // Validate landmarks structure
    if (!sliced[0] || typeof sliced[0].x === 'undefined') {
      console.error("❌ Invalid landmark structure");
      return;
    }
    
    const paddedLandmarks = sliced.map((landmark, index) => {
      // Basic validation
      if (!landmark || typeof landmark.x === 'undefined') {
        console.warn(`⚠️ Invalid landmark at index ${index}:`, landmark);
        return new Array(64).fill(0);
      }
      
      // Handle MediaPipe landmarks (normalized coordinates)
      let x = landmark.x || 0;
      let y = landmark.y || 0;
      let z = landmark.z || 0;
      
      // Check if coordinates are in normalized range [0,1] or pixel coordinates
      // MediaPipe face landmarks are typically normalized
      if (x > 1 || y > 1) {
        console.warn("⚠️ Coordinates seem to be in pixel space, consider normalizing");
      }
      
      // Create feature vector - you might need to adjust this based on your training data
      const arr = [
        x, y, z,                          // Basic coordinates
        landmark.visibility || 0,         // Visibility if available
        // Add more features if your model was trained with them
        x * x, y * y, z * z,             // Squared terms
        x * y, y * z, x * z,             // Cross terms
        Math.sqrt(x*x + y*y + z*z),      // Distance from origin
        Math.atan2(y, x),                 // Angle in xy plane
        Math.asin(z / Math.sqrt(x*x + y*y + z*z)) || 0, // Elevation angle
      ];
      
      // Pad to 64 dimensions with zeros
      while (arr.length < 64) {
        arr.push(0);
      }
      
      // Truncate if somehow longer than 64
      return arr.slice(0, 64);
    });
    
    // Final validation
    if (paddedLandmarks.length !== 468) {
      console.error(`❌ Wrong number of landmarks: ${paddedLandmarks.length}, expected 468`);
      return;
    }
    
    // Check for NaN or invalid values
    const hasInvalidValues = paddedLandmarks.some(landmark => 
      landmark.some(val => isNaN(val) || !isFinite(val))
    );
    
    if (hasInvalidValues) {
      console.warn("⚠️ Found NaN or infinite values in landmarks");
      // Clean up invalid values
      paddedLandmarks.forEach(landmark => {
        for (let i = 0; i < landmark.length; i++) {
          if (isNaN(landmark[i]) || !isFinite(landmark[i])) {
            landmark[i] = 0;
          }
        }
      });
    }
    
    console.log("📤 Sending landmarks with shape:", paddedLandmarks.length, "x", paddedLandmarks[0].length);
    console.log("🔢 Sample landmark vector:", paddedLandmarks[0].slice(0, 10), "...");
    
    const response = await fetch("http://localhost:8000/predict", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ landmarks: paddedLandmarks }),
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log("✅ Backend response:", data);

      // ADD THESE DEBUG LINES:
      console.log("🔍 prediction_label:", data.prediction_label);
      console.log("🔍 prediction_index:", data.prediction_index);
      console.log("🔍 Type of prediction_label:", typeof data.prediction_label);
      
      expressionRef.current = data.prediction_label || "neutral";
      setCurrentExpression(data.prediction_label);

      console.log("🔍 Set currentExpression to:", data.prediction_label); // ADD THIS
      
      console.log(`🧠 Expression: ${data.prediction_label} (confidence: ${(data.confidence * 100).toFixed(1)}%)`);
      
      // Log all probabilities for debugging
      if (data.emotion_probabilities) {
        console.log("🎭 Emotion probabilities:", data.emotion_probabilities);
        // Log top 3 emotions
        const sortedEmotions = Object.entries(data.emotion_probabilities)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 3);
        console.log("🏆 Top 3 emotions:", sortedEmotions.map(([emotion, prob]) => 
          `${emotion}: ${(prob * 100).toFixed(1)}%`
        ).join(', '));
      }
      
      if (data.all_probabilities) {
        console.log("📊 Raw probabilities:", data.all_probabilities);
      }
    } else {
      const errorText = await response.text();
      console.error("❌ Prediction failed:", response.status, errorText);
      
      // Try to parse error details
      try {
        const errorData = JSON.parse(errorText);
        console.error("📋 Error details:", errorData);
      } catch (e) {
        console.error("📋 Raw error:", errorText);
      }
    }
  } catch (error) {
    console.error("❌ Error sending landmarks:", error);
    console.error("📋 Error stack:", error.stack);
  }
};

// Optional: Add a function to test the connection and check emotion mapping
const testBackendConnection = async () => {
  try {
    const response = await fetch("http://localhost:8000/health");
    if (response.ok) {
      const data = await response.json();
      console.log("✅ Backend health check:", data);
      
      // Also check emotion mapping
      const emotionsResponse = await fetch("http://localhost:8000/emotions");
      if (emotionsResponse.ok) {
        const emotionsData = await emotionsResponse.json();
        console.log("🎭 Emotion mapping:", emotionsData);
      }
      
      return true;
    } else {
      console.error("❌ Backend health check failed:", response.status);
      return false;
    }
  } catch (error) {
    console.error("❌ Cannot connect to backend:", error);
    return false;
  }
};

// Call this when your app starts to verify backend connection
// testBackendConnection();




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
        cameraRef.current = camera; // 👈 Save the camera so we can stop it later
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

      <div style={{ position: "absolute", top: "10px", right: "10px", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px" }}>
  <div id="score-board">Score: {score} ⭐</div>
  <div id="emotion-box">Emotion: {currentExpression}</div>
</div>



      {/*<div id="score-board">Score: {score} ⭐</div>*/}

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
            <button
              onClick={() => {
                stopWebcam();        // Stop the webcam (MediaPipe + raw stream)
                navigate('/');       // Then navigate to the home page
            }}
        >
        Exit
        </button>

          </div>
        </div>

        <video ref={webcamRef} autoPlay muted playsInline width="640" height="480" style={{ display: 'none' }} />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </>
  );
}