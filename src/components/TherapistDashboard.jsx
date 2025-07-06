// import React, { useEffect, useState } from 'react';
// import './TherapistDashboard.css';
// import API from '../api';

// function TherapistDashboard() {
//   const [children, setChildren] = useState([]);
//   const [selectedEmail, setSelectedEmail] = useState('');
//   const [analysis, setAnalysis] = useState(null);
//   const [error, setError] = useState('');

//   // Fetch all child users
//   useEffect(() => {
//     API.get('/children')
//       .then(res => setChildren(res.data))
//       .catch(err => {
//         console.error('Failed to load children:', err);
//         setChildren([]);
//       });
//   }, []);

//   // Fetch analysis when a child is selected
//   const fetchChildAnalysis = async () => {
//     if (!selectedEmail) return;

//     try {
//       const res = await API.get(`/analysis-by-email/${encodeURIComponent(selectedEmail)}`);
//       setAnalysis(res.data);
//       setError('');
//     } catch (err) {
//       console.error('Error fetching analysis:', err);
//       setAnalysis(null);
//       setError('❌ Could not fetch analysis. Check email.');
//     }
//   };

//   return (
//     <div className="dashboard">
//       <h1>Therapist Dashboard</h1>

//       <h3>Select a Child:</h3>
//       <select
//         value={selectedEmail}
//         onChange={(e) => setSelectedEmail(e.target.value)}
//       >
//         <option value="">-- Select Child Email --</option>
//         {children.map((child) => (
//           <option key={child._id} value={child.email}>
//             {child.name} ({child.email})
//           </option>
//         ))}
//       </select>

//       <button onClick={fetchChildAnalysis} disabled={!selectedEmail}>
//         View Analysis
//       </button>

//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {analysis && (
//         <>
//           <h2>Child Profile</h2>
//           <p><strong>Name:</strong> {analysis.name}</p>
//           <p><strong>Email:</strong> {analysis.email}</p>

//           <h3>Game Scores 🎮</h3>
//           <ul>
//             {analysis.scores.map((s, idx) => (
//               <li key={idx}>{s.gameName}: {s.score}</li>
//             ))}
//           </ul>

//           <h3>Emotion Summary 😊</h3>
//           <ul>
//             {Object.entries(analysis.emotionSummary || {}).map(([emotion, count]) => (
//               <li key={emotion}>{emotion}: {count}</li>
//             ))}
//           </ul>
//         </>
//       )}
//     </div>
//   );
// }

// export default TherapistDashboard; 


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';   // ✅ IMPORT THIS
import './TherapistDashboard.css';
import API from '../api';

function TherapistDashboard() {
  const navigate = useNavigate(); // ✅ INITIALIZE NAVIGATE
  const [children, setChildren] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState('');

  // Fetch child users on mount
  useEffect(() => {
    API.get('/users/children')
      .then(res => setChildren(res.data))
      .catch(err => {
        console.error('Failed to load children:', err);
        setChildren([]);
      });
  }, []);

  const fetchChildAnalysis = async () => {
    if (!selectedEmail) return;
    try {
      const res = await API.get(`/analysis-by-email/${encodeURIComponent(selectedEmail)}`);
      setAnalysis(res.data);
      setError('');
    } catch (err) {
      console.error('Error fetching analysis:', err);
      setAnalysis(null);
      setError('❌ Could not fetch analysis. Check email.');
    }
  };

const handleExit = () => {
  console.log("Exit button clicked! Logging out and navigating to home...");
  localStorage.clear();
  navigate('/');
  window.location.reload(); // optional: force App.js to pick up user=null immediately
};


  return (
    <div className="dashboard">
      <button
        onClick={handleExit}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          zIndex: 1000,
        }}
      >
        Exit to Home
      </button>

      <h1>Therapist Dashboard</h1>

      <h3>Select a Child:</h3>
      <select
        value={selectedEmail}
        onChange={(e) => setSelectedEmail(e.target.value)}
      >
        <option value="">-- Select Child Email --</option>
        {children.map((child) => (
          <option key={child._id} value={child.email}>
            {child.name} ({child.email})
          </option>
        ))}
      </select>

      <button onClick={fetchChildAnalysis} disabled={!selectedEmail}>
        View Analysis
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {analysis && (
        <>
          <h2>Child Profile</h2>
          <p><strong>Name:</strong> {analysis.name}</p>
          <p><strong>Email:</strong> {analysis.email}</p>

          <h3>Game Scores 🎮</h3>
          <ul>
            {analysis.scores.map((s, idx) => (
              <li key={idx}>{s.gameName}: {s.score}</li>
            ))}
          </ul>

          <h3>Emotion Summary 😊</h3>
          <ul>
            {Object.entries(analysis.emotionSummary || {}).map(([emotion, count]) => (
              <li key={emotion}>{emotion}: {count}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default TherapistDashboard;
