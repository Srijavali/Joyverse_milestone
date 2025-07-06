// TherapistDashboard/src/components/ChildAnalysis.js
import React, { useEffect, useState } from 'react';
import API from '../api';

const ChildAnalysis = ({ userId }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get(`/users/${userId}`)
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, [userId]);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2>Child Analysis</h2>
      <p>Name: {data.name}</p>
      <p>Email: {data.email}</p>
      <h4>Progress:</h4>
      <ul>
        {data.progress.map((p, idx) => (
          <li key={idx}>{p.gameName}: {p.score}</li>
        ))}
      </ul>
      <h4>Emotions Logged:</h4>
      <ul>
        {data.emotionLogs.map((e, idx) => (
          <li key={idx}>{e.emotion} at {new Date(e.timestamp).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChildAnalysis;