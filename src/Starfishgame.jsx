import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import './Starfishgame.css';

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

  useEffect(() => {
    loadWord();
    startWebcam();
    return () => stopWebcam();
  }, [currentIndex]);

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
    }
  };

  const checkAnswer = () => {
    const userAnswer = drops.join("");
    const correctAnswer = words[currentIndex].answer;
    if (userAnswer === correctAnswer) {
      setScore(prev => prev + 3);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      setTimeout(() => setCurrentIndex(prev => (prev + 1) % words.length), 3000);
    } else {
      setAttempts(prev => prev + 1);
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

  return (
    <div id="ocean-background">
      <div id="score-board">Score: {score} ⭐</div>
      <img id="fish" className="marine" src="images/background/fish1.png" style={{ top: '30%', left: '10%' }} />
      <img id="starfish-animal" className="marine" src="images/starfish.png" style={{ bottom: '10%', left: '10%' }} />
      <img id="octopus" className="marine" src="images/octopus.png" style={{ top: '50%', right: '20%' }} />
      <img id="mermaid-img" className="mermaid" src="images/background/Mermaid.png" />

      <div id="game-container">
        <img id="word-image" src={words[currentIndex].image} alt="Word" />
        <div id="droppable-areas">
          {drops.map((drop, i) => (
            <div key={i} className="drop" onDrop={(e) => dropLetter(e, i)} onDragOver={allowDrop}>{drop}</div>
          ))}
        </div>
        <div id="starfish-letters">
          {letters.map((letter, i) => (
            <div key={i} className="starfish" draggable onDragStart={(e) => drag(e, letter)}>{letter}</div>
          ))}
        </div>
        <div id="buttons">
          <button onClick={checkAnswer}>Check</button>
          <button onClick={() => window.location.href = 'view.html'}>Exit</button>
        </div>
      </div>
      <video ref={webcamRef} autoPlay playsInline style={{ display: 'none' }} />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}
