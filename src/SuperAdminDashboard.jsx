import React, { useEffect, useState } from "react";
import axios from "axios";
import './SuperAdminDashboard.css';
import { TherapistCard } from "./TherapistCard";
import { useNavigate } from "react-router-dom";

export const SuperAdminDashboard = () => {
  const [therapists, setTherapists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Real API call to fetch pending therapists
    axios.get("http://localhost:5000/api/users/pending-therapists")
      .then(res => setTherapists(res.data))
      .catch(err => console.error("❌ Failed to fetch pending therapists:", err));
  }, []);

  const handleAction = (id, action) => {
    const newStatus = action === "accept" ? "approved" : "rejected";

    axios.put(`http://localhost:5000/api/users/therapists/${id}/status`, { status: newStatus })
      .then(() => {
        setTherapists(prev => prev.filter(t => t._id !== id)); // Remove updated therapist
        alert(`✅ Therapist ${newStatus.toUpperCase()}!`);
      })
      .catch(err => console.error(`❌ Failed to update therapist status to ${newStatus}:`, err));
  };

  const handleExit = () => {
    navigate('/');
  };

  return (
    <div className="dashboard">
      <button className="exit-button" onClick={handleExit}>
        Exit
      </button>

      <h2>SuperAdmin Dashboard</h2>

      <div className="therapist-list">
        {therapists.length === 0 ? (
          <p>No pending therapists.</p>
        ) : (
          therapists.map(therapist => (
            <TherapistCard
              key={therapist._id}
              therapist={therapist}
              onAction={handleAction}
            />
          ))
        )}
      </div>
    </div>
  );
};






// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import './SuperAdminDashboard.css';
// import { TherapistCard } from "./TherapistCard";

// export const SuperAdminDashboard = () => {
//   const [therapists, setTherapists] = useState([]);

//   useEffect(() => {
//     // Fetch all therapists with pending status
//     axios.get("http://localhost:5000/api/users/pending-therapists")
//       .then(res => setTherapists(res.data))
//       .catch(err => console.error("Failed to fetch pending therapists", err));
//   }, []);

//   const handleAction = (id, action) => {
//     const url = `http://localhost:5000/api/users/therapists/${id}/${action}`;
    
//     axios.patch(url)
//       .then(() => {
//         setTherapists(prev => prev.filter(t => t._id !== id));
//         alert(`Therapist ${action === 'approve' ? 'Approved' : 'Rejected'} ✅`);
//       })
//       .catch(err => console.error("Error updating therapist status", err));
//   };

//   return (
//     <div className="dashboard">
//       <h2>SuperAdmin Dashboard</h2>
//       <div className="therapist-list">
//         {therapists.length === 0 ? (
//           <p>No pending therapists.</p>
//         ) : (
//           therapists.map(therapist => (
//             <TherapistCard
//               key={therapist._id}
//               therapist={therapist}
//               onAction={handleAction}
//             />
//           ))
//         )}
//       </div>
//     </div>
//   );
// };
