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


/*import React, { useState, useRef } from 'react';
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

export default Loginpage;*/
















import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Loginpage.css';
import API from './api';

function Loginpage({ onLogin }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const [mode, setMode] = useState('login');
  const [role, setRole] = useState('child');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [specialisation, setSpecialisation] = useState('');
  const [experience, setExperience] = useState('');
  const [certificateLink, setCertificateLink] = useState('');
  const [age, setAge] = useState('');
  const [learningChallenges, setLearningChallenges] = useState([]);
  const [emotionalState, setEmotionalState] = useState([]);
  const [parentSupport, setParentSupport] = useState('');
  const [behaviorHomeSchool, setBehaviorHomeSchool] = useState('');
  const [energy, setEnergy] = useState('');
  const [attentionSpan, setAttentionSpan] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const clickSoundRef = useRef(null);
  const navigate = useNavigate();

  const playClickSound = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.play().catch(err => console.log('Audio play failed:', err));
    }
  };

  useEffect(() => {
    // On mount, check localStorage for user
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      switch (user.role) {
        case 'therapist':
          if (user.status === 'approved') {
            navigate('/dashboard');
          } else {
            navigate('/therapist-status');
          }
          break;
        case 'child':
          navigate('/');
          break;
        case 'superadmin':
          navigate('/superadmindashboard');
          break;
        default:
          break;
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    playClickSound();
    console.log(`[DEBUG] Form submitted in '${mode}' mode`);

    if (!email || !password || (mode === 'register' && !name)) {
      alert('Please fill all required fields');
      return;
    }

    if (mode === 'login' && email === 'joyverse@gmail.com' && password === 'joyversejoyverse') {
      console.log('[DEBUG] Superadmin login triggered');
      const superadminUser = { name: 'Super Admin', email, role: 'superadmin', _id: 'superadmin123' };
      localStorage.setItem("user", JSON.stringify(superadminUser));
      localStorage.setItem("email", email);
      localStorage.setItem("role", 'superadmin');
      localStorage.setItem("name", 'Super Admin');
      if (onLogin) onLogin(superadminUser);
      navigate('/superadmindashboard');
      return;
    }

    try {
      const endpoint = mode === 'register' ? '/users/register' : '/users/login';

      const payload = mode === 'register' ? {
        email,
        password,
        role,
        ...(role === 'therapist' && {
          name,
          specialisation,
          experience,
          certificateLink
        }),
        ...(role === 'child' && {
          name,
          fullName: name,
          childAge: age,
          learning_challenges: learningChallenges,
          emotional_state: emotionalState,
          support_peer: parentSupport,
          behavior_description: behaviorHomeSchool,
          energy_levels: energy ? [energy] : [],
          attention_span: attentionSpan,
        }),
      } : { email, password };

      console.log(`[DEBUG] Sending request to: ${endpoint}`);
      console.log('[DEBUG] Payload:', payload);

      const res = await API.post(endpoint, payload);
      console.log('[DEBUG] API Response:', res.data);

      const data = res.data;
      const user = data.user || data;
      const token = data.token;

      if (token && user) {
        console.log(`[DEBUG] Login successful. Role: ${user.role}, Status: ${user.status}`);

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("name", user.name);
        localStorage.setItem("email", user.email);
        localStorage.setItem("role", user.role);

        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 1000);

        if (onLogin) onLogin(user);

        switch (user.role) {
          case 'therapist':
            console.log("Therapist login detected. Status:", user.status);
            if (user.status === 'approved') {
              navigate('/dashboard');
            } else {
              navigate('/therapist-status');
            }
            break;

          case 'child':
            navigate('/');
            break;

          case 'superadmin':
            navigate('/superadmindashboard');
            break;

          default:
            alert('Unknown role. Please contact support.');
            break;
        }

      } else {
        console.warn('[DEBUG] Login failed: Invalid response from server');
        alert("Login failed: Invalid response from server.");
      }

    } catch (err) {
      console.error('[ERROR] API call failed:', err);
      alert(`Error: ${err.response?.data?.message || 'Something went wrong.'}`);
    }
  };

  const handleModeSwitch = () => {
    playClickSound();
    setMode(mode === 'login' ? 'register' : 'login');
    setName('');
    setEmail('');
    setPassword('');
    setSpecialisation('');
    setExperience('');
    setCertificateLink('');
    console.log(`[DEBUG] Switched mode to: ${mode === 'login' ? 'register' : 'login'}`);
  };

  return (
    <div className="login-background">
      <audio ref={clickSoundRef} src="/Audio_files/applepay.mp3" preload="auto" />
      <div className="login-wrapper">
        <h1 className="game-title">JoyVerse Game</h1>
        <div className="login-container">
          {showSuccess && <div className="success-burst">🎉</div>}
          <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
          <form onSubmit={handleSubmit}>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="role-select" disabled={mode === 'login'}>
              <option value="child">Child</option>
              <option value="therapist">Therapist</option>
            </select>

            {mode === 'register' && (
              <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            )}

            {mode === 'register' && role === 'therapist' && (
              <>
                <input type="text" placeholder="Specialisation" value={specialisation} onChange={(e) => setSpecialisation(e.target.value)} required />
                <input type="number" placeholder="Experience (years)" value={experience} onChange={(e) => setExperience(e.target.value)} required min="0" />
                <input type="url" placeholder="Portfolio or LinkedIn URL" value={certificateLink} onChange={(e) => setCertificateLink(e.target.value)} required />
              </>
            )}

            {mode === 'register' && role === 'child' && (
              <div className="child-registration-form">
                <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />

                <div className="form-group dropdown-multiselect">
                  <label>Specific Learning Challenges:</label>
                  <div className="dropdown">
                    <button type="button" className="dropbtn">Select Challenges</button>
                    <div className="dropdown-content">
                      {['Reading', 'Spelling', 'Memory', 'ADHD', 'Speech Delay', 'Anxiety'].map(challenge => (
                        <label key={challenge}>
                          <input
                            type="checkbox"
                            value={challenge}
                            checked={learningChallenges.includes(challenge)}
                            onChange={(e) => {
                              const selected = e.target.checked
                                ? [...learningChallenges, challenge]
                                : learningChallenges.filter(c => c !== challenge);
                              setLearningChallenges(selected);
                            }}
                          />{challenge}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="form-group dropdown-multiselect">
                  <label>Emotional State & Self-esteem:</label>
                  <div className="dropdown">
                    <button type="button" className="dropbtn">Select Emotions</button>
                    <div className="dropdown-content">
                      {['Frustration', 'Shame', 'Low Confidence', 'Sad', 'Lonely', 'Confusion'].map(state => (
                        <label key={state}>
                          <input
                            type="checkbox"
                            value={state}
                            checked={emotionalState.includes(state)}
                            onChange={(e) => {
                              const selected = e.target.checked
                                ? [...emotionalState, state]
                                : emotionalState.filter(s => s !== state);
                              setEmotionalState(selected);
                            }}
                          />{state}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>How do you support your peer at home?</label>
                  <input type="text" value={parentSupport} onChange={(e) => setParentSupport(e.target.value)} required />
                </div>

                <div className="form-group">
                  <label>How do they behave at home and school? Are they interactive?</label>
                  <input type="text" value={behaviorHomeSchool} onChange={(e) => setBehaviorHomeSchool(e.target.value)} required />
                </div>

                <div className="form-group">
                  <label>Energy:</label>
                  <select value={energy} onChange={(e) => setEnergy(e.target.value)} required>
                    <option value="">Select</option>
                    <option value="Hyperactive">Hyperactive</option>
                    <option value="Lethargic">Lethargic</option>
                    <option value="Balanced">Balanced</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>How long can they stay attentive?</label>
                  <input type="text" value={attentionSpan} onChange={(e) => setAttentionSpan(e.target.value)} required />
                </div>
              </div>
            )}

            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength="6" />

            <button type="submit">{mode === 'login' ? 'Login' : 'Register'}</button>
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
              }}>
              {mode === 'login' ? 'Register here' : 'Login here'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Loginpage;
