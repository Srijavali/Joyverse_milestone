import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './TherapistStatusPage.css';

export const TherapistStatusPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) {
      navigate('/login');
      return;
    }
    setUser(stored ? JSON.parse(stored) : null);
  }, []);

  useEffect(() => {
    if (user && user.status === 'approved') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="status-container">
      <div className="status-card">
        <h2>Status Update</h2>
        {user.status === 'approved' ? (
          <p className="status-approved">
            🎉 Congratulations! Your therapist account has been approved. <br />
            You are now being redirected to your dashboard.
          </p>
        ) : user.status === 'rejected' ? (
          <>
            <p className="status-rejected">
              ❌ Sorry, your registration has been rejected by the admin. <br />
              Please contact support if you believe this is a mistake.
            </p>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <p className="status-pending">
              🕐 Your registration is under review. <br />
              You will be notified once the admin approves your account.
            </p>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        )}
      </div>
    </div>
  );
};

export default TherapistStatusPage;
