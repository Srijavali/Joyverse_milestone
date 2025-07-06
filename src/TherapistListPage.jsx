import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TherapistListPage.css'; // create the styles as below

const TherapistListPage = () => {
  const navigate = useNavigate();
  const [chosen, setChosen] = useState(false);

  const handleChooseTherapist = (therapistId) => {
    if (!localStorage.getItem("user")) {
      alert("🚨 Please login/register before choosing a therapist.");
      return;
    }
    if (chosen) {
      alert("✅ You have already chosen a therapist. You cannot choose another.");
      return;
    }
    // Here you can call your API to save the choice.
    alert(`🎉 You have chosen therapist ID: ${therapistId}`);
    setChosen(true);
  };

  return (
    <div className="therapist-list-page">
      <h1>Choose Your Therapist</h1>

      <div className="therapist-card">
        <h2>Dr. Sri</h2>
        <p><strong>Specialization:</strong> Dyslexia & Learning Disabilities</p>
        <p><strong>Experience:</strong> 7 years helping children with dyslexia.</p>
        <p><strong>Approach:</strong> Fun, engaging methods to improve reading and writing skills with personalized plans.</p>
        <button 
          className="choose-button" 
          onClick={() => handleChooseTherapist("therapist-sri")}
          disabled={chosen}
        >
          ✅ {chosen ? "Chosen" : "Choose Therapist"}
        </button>
      </div>

      <button 
        className="back-button"
        onClick={() => navigate('/')}
      >
        ⬅️ Back to Home
      </button>
    </div>
  );
};

export default TherapistListPage;
