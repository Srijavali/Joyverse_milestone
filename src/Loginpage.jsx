// import React, { useState } from 'react';
// import './Loginpage.css';
// import API from './api';

// function LoginPage({ onLogin }) {
//   const [mode, setMode] = useState('login'); // login or register
//   const [role, setRole] = useState('child');
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !password || (mode === 'register' && !name)) {
//       alert('Please fill all required fields');
//       return;
//     }

//     try {
//       const endpoint = mode === 'register' ? '/users/register' : '/users/login';
//       const payload =
//         mode === 'register'
//           ? { name, email, password, role }
//           : { email, password, role };

//       const res = await API.post(endpoint, payload);
//       console.log(`${mode === 'register' ? '✅ Registered' : '✅ Logged in'}:`, res.data);
//       onLogin(res.data.user || res.data); // support both return types
//     } catch (err) {
//       console.error(`${mode === 'register' ? '❌ Register' : '❌ Login'} failed:`, err);
//       alert(`Error: ${err.response?.data?.message || 'Try again'}`);
//     }
//   };

//   return (
//     <div className="login-background">
//       <div className="login-wrapper">
//         <h1 className="game-title">JoyVerse Game</h1>
//         <div className="login-container">
//           <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
//           <form onSubmit={handleSubmit}>
//             <select value={role} onChange={(e) => setRole(e.target.value)} className="role-select">
//               <option value="child">Child</option>
//               <option value="therapist">Therapist</option>
//             </select>

//             {mode === 'register' && (
//               <input
//                 type="text"
//                 placeholder="Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//             )}

//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />

//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />

//             <button type="submit">{mode === 'login' ? 'Login' : 'Register'}</button>
//           </form>

//           <p style={{ marginTop: '15px' }}>
//             {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
//             <button
//               type="button"
//               onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
//               style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer' }}
//             >
//               {mode === 'login' ? 'Register here' : 'Login here'}
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;


// import React, { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Loginpage.css';
// import API from './api'; // Make sure API has baseURL set correctly

// function Loginpage({ onLogin }) {
//   const navigate = useNavigate();
//   const [mode, setMode] = useState('login');
//   const [role, setRole] = useState('child');
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showSuccess, setShowSuccess] = useState(false);

//   const clickSoundRef = useRef(null);

//   const playClickSound = () => {
//     if (clickSoundRef.current) {
//       clickSoundRef.current.currentTime = 0;
//       clickSoundRef.current.play().catch(err => {
//         console.log('Audio play failed:', err);
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     playClickSound();

//     if (!email || !password || (mode === 'register' && !name)) {
//       alert('Please fill all required fields');
//       return;
//     }

//     try {
//       const endpoint = mode === 'register' ? '/users/register' : '/users/login';
//       const payload =
//         mode === 'register'
//           ? { name, email, password, role }
//           : { email, password, role };

//       const res = await API.post(endpoint, payload);
//       const data = res.data;

//       console.log("🧪 Login Response Data:", data);

//       const user = data.user || data;
//       const token = data.token;

//       if (token && user) {
//         // Store user info in localStorage
//         localStorage.setItem("token", token);
//         localStorage.setItem("user", JSON.stringify(user));
//         localStorage.setItem("name", user.name);
//         localStorage.setItem("email", user.email);
//         localStorage.setItem("role", user.role);

//         console.log("✅ Stored user:", user);

//         setShowSuccess(true);
//         setTimeout(() => setShowSuccess(false), 1000);

//         if (onLogin) {
//           onLogin(user); // Notify parent if callback provided
//         }

//         // Redirect based on role
//         setTimeout(() => {
//           if (user.role === 'child') {
//             navigate('/');
//           } else if (user.role === 'therapist') {
//             navigate('/marineinterface');
//           } else {
//             navigate('/');
//           }
//         }, 300); // Small delay to show 🎉
//       } else {
//         console.warn("⚠️ Missing token or user in response");
//         alert("Login failed: Invalid response from server.");
//       }

//     } catch (err) {
//       console.error(`${mode === 'register' ? '❌ Register' : '❌ Login'} failed:`, err);
//       alert(`Error: ${err.response?.data?.message || 'Something went wrong. Please try again.'}`);
//     }
//   };

//   const handleModeSwitch = () => {
//     playClickSound();
//     setMode(mode === 'login' ? 'register' : 'login');
//     setName('');
//     setEmail('');
//     setPassword('');
//   };

//   return (
//     <div className="login-background">
//       <audio
//         ref={clickSoundRef}
//         src="/Audio_files/applepay.mp3"
//         preload="auto"
//         onError={() => console.log('Audio file not found')}
//       />
//       <div className="login-wrapper">
//         <h1 className="game-title">JoyVerse Game</h1>
//         <div className="login-container">
//           {showSuccess && <div className="success-burst">🎉</div>}
//           <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
//           <form onSubmit={handleSubmit}>
//             <select
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="role-select"
//             >
//               <option value="child">Child</option>
//               <option value="therapist">Therapist</option>
//             </select>

//             {mode === 'register' && (
//               <input
//                 type="text"
//                 placeholder="Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//             )}

//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />

//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               minLength="6"
//             />

//             <button type="submit">
//               {mode === 'login' ? 'Login' : 'Register'}
//             </button>
//           </form>

//           <p style={{ marginTop: '15px' }}>
//             {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
//             <button
//               type="button"
//               onClick={handleModeSwitch}
//               style={{
//                 background: 'none',
//                 border: 'none',
//                 color: '#007bff',
//                 textDecoration: 'underline',
//                 cursor: 'pointer'
//               }}
//             >
//               {mode === 'login' ? 'Register here' : 'Login here'}
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Loginpage;


import React, { useState, useRef } from 'react';
import './Loginpage.css';
import API from './api';

function Loginpage({ onLogin }) {
  const [mode, setMode] = useState('login');
  const [role, setRole] = useState('child');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const clickSoundRef = useRef(null);

  const playClickSound = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.play().catch(err => {
        console.log('Audio play failed:', err);
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    playClickSound();

    if (!email || !password || (mode === 'register' && !name)) {
      alert('Please fill all required fields');
      return;
    }

    try {
      const endpoint = mode === 'register' ? '/users/register' : '/users/login';
      const payload =
        mode === 'register'
          ? { name, email, password, role }
          : { email, password };

      const res = await API.post(endpoint, payload);
      const data = res.data;

      console.log("🧪 Server Response:", data);

      const user = data.user || data;
      const token = data.token;

      if (token && user) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("name", user.name);
        localStorage.setItem("email", user.email);
        localStorage.setItem("role", user.role);

        console.log("✅ User stored in localStorage:", user);

        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 1000);

        if (onLogin) {
          onLogin(user);  // ✅ App handles navigation
        }

      } else {
        console.warn("⚠️ Login failed: Missing token or user in response");
        alert("Login failed: Invalid response from server.");
      }

    } catch (err) {
      console.error("❌ Error during authentication:", err.response?.data || err.message || err);
      alert(`Error: ${err.response?.data?.message || 'Something went wrong. Please try again.'}`);
    }
  };

  const handleModeSwitch = () => {
    playClickSound();
    setMode(mode === 'login' ? 'register' : 'login');
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="login-background">
      <audio
        ref={clickSoundRef}
        src="/Audio_files/applepay.mp3"
        preload="auto"
        onError={() => console.log('Audio file not found')}
      />
      <div className="login-wrapper">
        <h1 className="game-title">JoyVerse Game</h1>
        <div className="login-container">
          {showSuccess && <div className="success-burst">🎉</div>}
          <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
          <form onSubmit={handleSubmit}>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="role-select"
              disabled={mode === 'login'} // 🔒 Only selectable during registration
            >
              <option value="child">Child</option>
              <option value="therapist">Therapist</option>
            </select>

            {mode === 'register' && (
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
            />

            <button type="submit">
              {mode === 'login' ? 'Login' : 'Register'}
            </button>
          </form>

          <p style={{ marginTop: '15px' }}>
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              type="button"
              onClick={handleModeSwitch}
              style={{
                background: 'none',
                border: 'none',
                color: '#007bff',
                textDecoration: 'underline',
                cursor: 'pointer'
              }}
            >
              {mode === 'login' ? 'Register here' : 'Login here'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Loginpage;
