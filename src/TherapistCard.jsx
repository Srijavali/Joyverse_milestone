import React from 'react';
import './TherapistCard.css';

// export const TherapistCard = ({ therapist, onAction }) => {
//   return (
//     <div className="therapist-card">
//       <h3>{therapist.name}</h3>
//       <p><strong>Email:</strong> {therapist.email}</p>
//       <p><strong>Specialization:</strong> {therapist.specialization}</p>
//       <a href={therapist.certificateUrl} target="_blank" rel="noopener noreferrer">
//         View Certificate
//       </a>
//       <div className="action-buttons">
//         <button className="accept-btn" onClick={() => onAction(therapist._id, 'accepted')}>Accept</button>
//         <button className="reject-btn" onClick={() => onAction(therapist._id, 'rejected')}>Reject</button>
//       </div>
//     </div>
//   );
// };


export const TherapistCard = ({ therapist, onAction }) => (
  <div className="therapist-card">
    <h3>{therapist.name}</h3>
    <p><strong>Email:</strong> {therapist.email}</p>
    <p><strong>Specialization:</strong> {therapist.specialisation || therapist.specialization}</p>
    <p><strong>Experience:</strong> {therapist.experience} years</p> {/* ✅ New line */}
    <p><strong>Status:</strong> {therapist.status}</p>
    {therapist.certificateLink && (
      <p>
        <strong>Certificate:</strong> <a href={therapist.certificateLink} target="_blank" rel="noopener noreferrer">View Certificate</a>
      </p>
    )}
    <div className="action-buttons">
      <button onClick={() => onAction(therapist._id, 'accept')} className="accept-button">Accept</button>
      <button onClick={() => onAction(therapist._id, 'reject')} className="reject-button">Reject</button>
    </div>
  </div>
);





// import React from "react";
// import './TherapistCard.css';

// export const TherapistCard = ({ therapist, onAction }) => {
//   return (
//     <div className="therapist-card">
//       <h3>{therapist.name}</h3>
//       <p><strong>Email:</strong> {therapist.email}</p>
//       <p><strong>Specialization:</strong> {therapist.specialization || 'N/A'}</p>
//       {therapist.certificateUrl && (
//         <a href={therapist.certificateUrl} target="_blank" rel="noopener noreferrer">
//           View Certificate
//         </a>
//       )}
//       <div className="buttons">
//         <button onClick={() => onAction(therapist._id, 'approve')} className="approve">✅ Approve</button>
//         <button onClick={() => onAction(therapist._id, 'reject')} className="reject">❌ Reject</button>
//       </div>
//     </div>
//   );
// };
