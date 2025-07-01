// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Homepage.css";

// const HeroSection = () => {
//   // Enhanced smooth scroll function with better performance
//   const smoothScrollTo = (targetId, duration = 1200) => {
//     const targetElement = document.getElementById(targetId);
//     if (!targetElement) {
//       console.warn(`Element with id '${targetId}' not found`);
//       return;
//     }

//     // Get the target position with offset for better positioning
//     const targetPosition = targetElement.offsetTop - 60; // 60px offset for better view
//     const startPosition = window.pageYOffset || window.scrollY;
//     const distance = targetPosition - startPosition;
    
//     // If already at target, don't scroll
//     if (Math.abs(distance) < 5) return;
    
//     let startTime = null;

//     // Enhanced easing function for smoother animation
//     const easeInOutQuart = (t) => {
//       return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
//     };

//     const animation = (currentTime) => {
//       if (startTime === null) startTime = currentTime;
//       //console.log(currentTime)
//       const timeElapsed = currentTime - startTime;
//       const progress = Math.min(timeElapsed / duration, 1);
//       const ease = easeInOutQuart(progress);
      
//       const currentPosition = startPosition + distance * ease;
//       console.log(currentPosition)
//       window.scrollTo(0, currentPosition);
      
//       if (progress < 1) {
//         requestAnimationFrame(animation);
//       }
//     };

//     requestAnimationFrame(animation);
//   };

//   return (
//     <div className="hero-section">
//       <video 
//         autoPlay
//         muted
//         loop
//         playsInline
//         preload="auto"
//         style={{ display: "block" }}
//       >
//         <source src="\video\Untitled design (5).mp4" type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>



//       <div className="hero-content">
//         <h1>JoyVerse</h1>
//         <p>Spreading Joy Through Learning Adventures</p>
//         <div className="section-buttons">
//           <button 
//             onClick={() => {
//               console.log('🔄 Scrolling to parent section');
//               smoothScrollTo('parent');
//             }}
//             style={{ marginRight: '10px' }}
//           >
//             For Parents
//           </button>
//           <button 
//             onClick={() => {
//               console.log('🔄 Scrolling to child section');
//               smoothScrollTo('child');
//             }}
//           >
//             For Children
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const GameBox = ({ image, label, link }) => {
//   const navigate = useNavigate();
  
//   const handleClick = () => {
//     if (link) {
//       navigate(link);
//     }
//   };

//   return (
//     <div className="game-box" onClick={handleClick}>
//       <img className="game-image" src={image} alt={label} />
//       <div className="game-label">{label}</div>
//     </div>
//   );
// };

// const ChildSection = () => (
//   <section className="game-section" id="child" style={{ scrollMarginTop: '60px' }}>
//     <h2>Choose Your Adventure</h2>
//     <div className="game-grid">
//       <GameBox 
//         image="\images\Marine_explorer.png" 
//         label="🌊 Marine World" 
//         link="/marineinterface" 
//       />
//       <GameBox 
//         image="/images/Forest_explore.png" 
//         label="🌲 Forest Quest" 
//       />
//       <GameBox 
//         image="/images/Space_explore.png" 
//         label="🚀 Space Journey" 
//       />
//       <GameBox 
//         image="/images/Disney_explorer.png" 
//         label="🏰 Disney Dreams" 
//       />
//       <GameBox 
//         image="/images/Cartoon_explorer.png" 
//         label="🎨 Cartoon Land" 
//       />
//     </div>
//   </section>
// );

// const ParentSection = () => (
//   <section className="game-section" id="parent" style={{ scrollMarginTop: '60px' }}>
//     <h2>For Parents</h2>
//     <div className="info-box">
//       <p>
//         Learn about your child's progress, view reports, and connect with the JoyVerse community.
//       </p>
//       <a href="reports.html" className="primary-button">📊 View Reports</a>
//     </div>

//     <div className="dyslexia-box">
//       <h1>Dyslexic Association Of India</h1>
//       <p className="caption">Helping children bloom in their own season — and in their own way</p>
//       <p className="caption">Together with you, we rewrite the story of learning. 😊</p>
//       <a 
//         href="https://dyslexiaindia.org.in/" 
//         target="_blank" 
//         rel="noopener noreferrer"
//         className="primary-button"
//       >
//         🌐 Open
//       </a>
//     </div>
//   </section>
// );

// const Footer = () => (
//   <footer>
//     <p>
//       &copy; 2025 JoyVerse. All rights reserved. | 
//       <a href="#"> Privacy Policy</a> | 
//       <a href="#"> Contact Us</a>
//     </p>
//     <p>Crafted with ❤ for joyful learning and discovery.</p>
//   </footer>
// );

// const Homepage = () => {
//   return (
//     <>
//       <HeroSection />
//       <ChildSection />
//       <ParentSection />
//       <Footer />
//     </>
//   );
// };

// export default Homepage;



import React from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

const HeroSection = () => {
  // ✅ Simple scroll function using native smooth scroll
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      console.warn(`Element with id '${id}' not found`);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="hero-section">
      <video 
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="background-video"
      >
        <source src="/video/Untitled design (5).mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🔝 Navigation Bar */}
      <div className="nav-bar">
        <div className="nav-right">
          <button onClick={() => navigate("/login")}>Login/Register</button>
          {/*<button onClick={() => navigate("/signup")} style={{ marginLeft: '10px' }}>Sign Up</button>*/}
        </div>
      </div>

      <div className="hero-content">
        <h1>JoyVerse</h1>
        <p>Spreading Joy Through Learning Adventures</p>
        <div className="section-buttons">
          <button 
            onClick={() => scrollToSection("parent")}
            style={{ marginRight: '10px' }}
          >
            For Parents
          </button>
          <button 
            onClick={() => scrollToSection("child")}
          >
            For Children
          </button>
        </div>
      </div>
    </div>
  );
};

const GameBox = ({ image, label, link }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <div className="game-box" onClick={handleClick}>
      <img className="game-image" src={image} alt={label} />
      <div className="game-label">{label}</div>
    </div>
  );
};

const ChildSection = () => (
  <section className="game-section" id="child" style={{ scrollMarginTop: '60px' }}>
    <h2>Choose Your Adventure</h2>
    <div className="game-grid">
      <GameBox 
        image="/images/Marine_explorer.png" 
        label="🌊 Marine World" 
        link="/marineinterface" 
      />
      <GameBox 
        image="/images/Forest_explore.png" 
        label="🌲 Forest Quest" 
      />
      <GameBox 
        image="/images/Space_explore.png" 
        label="🚀 Space Journey" 
      />
      <GameBox 
        image="/images/Disney_explorer.png" 
        label="🏰 Disney Dreams" 
      />
      <GameBox 
        image="/images/Cartoon_explorer.png" 
        label="🎨 Cartoon Land" 
      />
    </div>
  </section>
);

const ParentSection = () => (
  <section className="game-section" id="parent" style={{ scrollMarginTop: '60px' }}>
    <h2>For Parents</h2>
    <div className="info-box">
      <p>
        Learn about your child's progress, view reports, and connect with the JoyVerse community.
      </p>
      <a href="reports.html" className="primary-button">📊 View Reports</a>
    </div>

    <div className="dyslexia-box">
      <h1>Dyslexic Association Of India</h1>
      <p className="caption">Helping children bloom in their own season — and in their own way</p>
      <p className="caption">Together with you, we rewrite the story of learning. 😊</p>
      <a 
        href="https://dyslexiaindia.org.in/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="primary-button"
      >
        🌐 Open
      </a>
    </div>
  </section>
);

const Footer = () => (
  <footer>
    <p>
      &copy; 2025 JoyVerse. All rights reserved. | 
      <a href="#"> Privacy Policy</a> | 
      <a href="#"> Contact Us</a>
    </p>
    <p>Crafted with ❤ for joyful learning and discovery.</p>
  </footer>
);

const Homepage = () => {
  return (
    <>
      <HeroSection />
      <ChildSection />
      <ParentSection />
      <Footer />
    </>
  );
};

export default Homepage;