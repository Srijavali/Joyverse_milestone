// // brain of react ui it defines what components/ pages should render and it pulls everything together from pages to styling 

// import React from "react";  // imports the react to file often used to define the react components that we will be using in our app such as jsx tags like ,<div> ,<Route> 
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // react router dom is used to handle routing in our application. It allows us to navigate between different pages or views within our app without reloading the entire page.
// // browserrouter is the base component enables the routing functionality by wrapping around your app's content. The Routes component is used to define multiple routes within your app, each with its own set of paths and corresponding components. And finally the Route component is used to specify individual routes within your app.
// import "./App.css";
// import Starfishgame from "./Starfishgame"; // ./ refers to the it is in the same folder as app.js if we remove the./ means we are tryng to import the file from the node modulels like we did in case of react 
// import MarineInterface from "./marineinterface"; // if the file is not in the same folder then we may use ./subfoldername/filename or ../filename if it is in parent folder telling to go up one level and look for the file there.
// import Homepage from "./Homepage";
// import Loginpage from "./Loginpage"; // importing the login page component which is used to handle user authentication and login functionality in our app.
// import GameReportGenerator from "./GameReportGenerator";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/marineinterface" element={<MarineInterface />} />
//         <Route path="/Starfishgame" element={<Starfishgame />} />
//         <Route path="/" element={<Homepage />} />
//         <Route path="/login" element={<Loginpage />} />
//         <Route path="/report" element={<GameReportGenerator />} />
//         {/* Optional: add this if you want to support the Exit route */}
//         {/* <Route path="/view" element={<ViewComponent />} /> */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// App.js
// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import "./App.css";

// // Pages & Components
// import Starfishgame from "./Starfishgame";
// import MarineInterface from "./marineinterface";
// import Homepage from "./Homepage";
// import Loginpage from "./Loginpage";
// import GameReportGenerator from "./GameReportGenerator";
// import TherapistDashboard from "./components/TherapistDashboard";
// import Login from "./components/Login"; // Optional, based on your usage

// function App() {
//   const [user, setUser] = useState(null);

//   return (
//     <Router>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Homepage />} />
//         <Route path="/login" element={<Loginpage onLoginSuccess={setUser} />} />
//         <Route path="/marineinterface" element={<MarineInterface />} />
//         <Route path="/Starfishgame" element={<Starfishgame />} />
//         <Route path="/report" element={<GameReportGenerator />} />

//         {/* Protected Therapist Dashboard */}
//         <Route
//           path="/dashboard"
//           element={
//             user ? (
//               user.role === "therapist" ? (
//                 <TherapistDashboard userId={user._id} />
//               ) : (
//                 <p>You are not authorized to access this dashboard.</p>
//               )
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

// import Homepage from './Homepage';
// import Loginpage from './Loginpage';
// import MarineInterface from './marineinterface';
// import Starfishgame from './Starfishgame';
// import GameReportGenerator from './GameReportGenerator';
// import TherapistDashboard from './components/TherapistDashboard';

// function App() {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Rehydrate user from localStorage on initial mount
//   useEffect(() => {
//     const storedUserStr = localStorage.getItem('user');
//     if (storedUserStr) {
//       try {
//         const storedUser = JSON.parse(storedUserStr);
//         if (storedUser && storedUser.email && storedUser.role) {
//           setUser(storedUser);
//         } else {
//           localStorage.removeItem('user'); // remove invalid data
//         }
//       } catch (err) {
//         console.error("Failed to parse stored user:", err);
//         localStorage.removeItem('user');
//       }
//     }
//   }, []);

//   // Navigate only if user logs in

// //   useEffect(() => {
// //   if (user) {
// //     if (user.role === 'therapist' && location.pathname !== '/dashboard') {
// //       navigate('/dashboard');
// //     } else if (user.role === 'child' && location.pathname !== '/') {
// //       navigate('/'); // redirect child to homepage
// //     }
// //   }
// // }, [user, navigate, location.pathname]);

// useEffect(() => {
//   console.log("🚨 App useEffect triggered: user =", user, "location =", location.pathname);
//   if (user) {
//     if (user.role === 'therapist' && location.pathname !== '/dashboard') {
//       navigate('/dashboard');
//     } else if (user.role === 'child' && location.pathname !== '/') {
//       navigate('/');
//     }
//   } 
// }, [user, navigate, location.pathname]);



// const handleLogout = () => {
//   console.log("🚨 Logging out...");
//   localStorage.clear();
//   setUser(null);
//   //window.location.href = '/';  // full page reload to homepage
//    navigate('/');
// };



//   return (
//     <Routes>
//       {/* Public Routes */}
//       <Route path="/" element={<Homepage />} />
//       <Route path="/login" element={<Loginpage onLogin={setUser} />} />
//       <Route path="/marineinterface" element={<MarineInterface />} />
//       <Route path="/Starfishgame" element={<Starfishgame />} />
//       <Route path="/report" element={<GameReportGenerator />} />

//       {/* Protected Therapist Dashboard */}
//       <Route
//         path="/dashboard"
//         element={
//           user ? (
//             user.role === "therapist" ? (
//               <TherapistDashboard userId={user._id} />
//             ) : (
//               <p>You are not authorized to access this dashboard.</p>
//             )
//           ) : (
//             <Navigate to="/login" />
//           )
//         }
//       />
//     </Routes>
//   );
// }

// export default function AppWrapper() {
//   return (
//     <Router>
//       <App />
//     </Router>
//   );
// }



// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

// import Homepage from './Homepage';
// import Loginpage from './Loginpage';
// import MarineInterface from './marineinterface';
// import Starfishgame from './Starfishgame';
// import GameReportGenerator from './GameReportGenerator';
// import TherapistDashboard from './components/TherapistDashboard';
// import TherapistListPage from './TherapistListPage';
// import { SuperAdminDashboard } from './SuperAdminDashboard';

// function App() {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Rehydrate user from localStorage on initial mount
//   useEffect(() => {
//     const storedUserStr = localStorage.getItem('user');
//     if (storedUserStr) {
//       try {
//         const storedUser = JSON.parse(storedUserStr);
//         if (storedUser && storedUser.email && storedUser.role) {
//           setUser(storedUser);
//         } else {
//           localStorage.removeItem('user'); // remove invalid data
//         }
//       } catch (err) {
//         console.error("Failed to parse stored user:", err);
//         localStorage.removeItem('user');
//       }
//     }
//   }, []);

//   // Redirect user after login based on role
//   useEffect(() => {
//   if (user) {
//     if (
//       user.role === 'therapist' &&
//       location.pathname !== '/dashboard'
//     ) {
//       navigate('/dashboard');
//     } else if (
//       user.role === 'child' &&
//       location.pathname !== '/' &&
//       location.pathname !== '/listoftherapists' // ✅ allow this page
//     ) {
//       navigate('/');
//     }else if (
//   user.role === 'superadmin' &&
//   location.pathname !== '/superadmindashboard'
// ) {
//   navigate('/superadmindashboard');
// }

//   }
// }, [user, navigate, location.pathname]);


//   const handleLogout = () => {
//     console.log("🚨 Logging out...");
//     localStorage.clear();
//     setUser(null);
//     navigate('/'); // navigate to homepage after logout
//   };

//   return (
//     <>

//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Homepage user={user} handleLogout={handleLogout} />} />
//         <Route path="/login" element={<Loginpage onLogin={setUser} />} />
//         <Route path="/marineinterface" element={<MarineInterface />} />
//         <Route path="/Starfishgame" element={<Starfishgame />} />
//         <Route path="/report" element={<GameReportGenerator />} />
//         <Route path="/listoftherapists" element={<TherapistListPage />} />
//         <Route path="/superadmindashboard" element={<SuperAdminDashboard />} />


//         {/* Protected Therapist Dashboard */}
//         <Route
//           path="/dashboard"
//           element={
//             user ? (
//               user.role === "therapist" ? (
//                 <TherapistDashboard userId={user._id} />
//               ) : (
//                 <p>You are not authorized to access this dashboard.</p>
//               )
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />
        
//       </Routes>

//     </>
//   );
// }

// export default function AppWrapper() {
//   return (
//     <Router>
//       <App />
//     </Router>
//   );
// }



// import React, { useState, useEffect } from 'react';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   useNavigate,
//   useLocation
// } from 'react-router-dom';

// import Homepage from './Homepage';
// import Loginpage from './Loginpage';
// import MarineInterface from './marineinterface';
// import Starfishgame from './Starfishgame';
// import GameReportGenerator from './GameReportGenerator';
// import TherapistDashboard from './components/TherapistDashboard';
// import TherapistListPage from './TherapistListPage';
// import TherapistStatusPage from './TherapistStatusPage'; // ✅ new
// import { SuperAdminDashboard } from './SuperAdminDashboard';

// function App() {
//   const [user, setUser] = useState(() => {
//     const storedUserStr = localStorage.getItem('user');
//     if (storedUserStr) {
//       try {
//         const storedUser = JSON.parse(storedUserStr);
//         if (storedUser && storedUser.email && storedUser.role) {
//           return storedUser;
//         } else {
//           localStorage.removeItem('user');
//         }
//       } catch (err) {
//         console.error("Failed to parse stored user:", err);
//         localStorage.removeItem('user');
//       }
//     }
//     return null;
//   });

//   const navigate = useNavigate();
//   const location = useLocation();




//   // Rehydrate user from localStorage on mount
//   useEffect(() => {
//     const storedUserStr = localStorage.getItem('user');
//     if (storedUserStr) {
//       try {
//         const storedUser = JSON.parse(storedUserStr);
//         if (storedUser && storedUser.email && storedUser.role) {
//           setUser(storedUser);
//         } else {
//           localStorage.removeItem('user');
//         }
//       } catch (err) {
//         console.error("Failed to parse stored user:", err);
//         localStorage.removeItem('user');
//       }
//     }
//   }, []);

//   // Role-based redirection after login
//   useEffect(() => {
//   if (!user) return; // don't do anything if no user yet

//   let targetPath = null;

//   if (user.role === 'therapist') {
//     if (user.status !== 'approved' && location.pathname !== '/therapist-status') {
//       targetPath = '/therapist-status';
//     } else if (user.status === 'approved' && location.pathname !== '/dashboard') {
//       targetPath = '/dashboard';
//     }
//   } else if (user.role === 'child' && !['/', '/listoftherapists'].includes(location.pathname)) {
//     targetPath = '/';
//   } else if (user.role === 'superadmin' && location.pathname !== '/superadmindashboard') {
//     targetPath = '/superadmindashboard';
//   }

//   if (targetPath && location.pathname !== targetPath) {
//     navigate(targetPath, { replace: true }); // avoid stacking history
//   }
// }, [user]); // 🚨 keep this dependency array simple with just user



//   const handleLogout = () => {
//     console.log("🚨 Logging out...");
//     localStorage.clear();
//     setUser(null);
//     navigate('/');
//   };

//   return (
//     <>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Homepage user={user} handleLogout={handleLogout} />} />
//         <Route path="/login" element={<Loginpage onLogin={setUser} navigate={navigate} />} />
//         <Route path="/marineinterface" element={<MarineInterface />} />
//         <Route path="/Starfishgame" element={<Starfishgame />} />
//         <Route path="/report" element={<GameReportGenerator />} />
//         <Route path="/listoftherapists" element={<TherapistListPage />} />
//         <Route path="/superadmindashboard" element={<SuperAdminDashboard />} />

//         {/* Therapist waiting for approval */}
//         <Route path="/therapist-status" element={<TherapistStatusPage />} />

//         {/* Therapist Dashboard (Protected) */}
//         <Route
//           path="/dashboard"
//           element={
//             user ? (
//               user.role === "therapist" ? (
//                 user.status === "approved" ? (
//                   <TherapistDashboard userId={user._id} />
//                 ) : (
//                   <Navigate to="/therapist-status" />
//                 )
//               ) : (
//                 <p>You are not authorized to access this dashboard.</p>
//               )
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />
//       </Routes>
//     </>
//   );
// }

// export default function AppWrapper() {
//   return (
//     <Router>
//       <App />
//     </Router>
//   );
// }




// import React, { useState, useEffect } from 'react';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   useNavigate,
//   useLocation
// } from 'react-router-dom';

// import {
//   Homepage,
//   Loginpage,
//   MarineInterface,
//   Starfishgame,
//   GameReportGenerator,
//   TherapistDashboard,
//   TherapistListPage,
//   TherapistStatusPage,
//   SuperAdminDashboard,
// } from './def';

// function App() {
//   const [user, setUser] = useState(() => {
//     const storedUserStr = localStorage.getItem('user');
//     if (storedUserStr) {
//       try {
//         const storedUser = JSON.parse(storedUserStr);
//         if (storedUser && storedUser.email && storedUser.role) {
//           return storedUser;
//         } else {
//           localStorage.removeItem('user');
//         }
//       } catch (err) {
//         console.error("Failed to parse stored user:", err);
//         localStorage.removeItem('user');
//       }
//     }
//     return null;
//   });

//   const navigate = useNavigate();
//   const location = useLocation();

//   // Rehydrate user from localStorage on mount
//   useEffect(() => {
//     const storedUserStr = localStorage.getItem('user');
//     if (storedUserStr) {
//       try {
//         const storedUser = JSON.parse(storedUserStr);
//         if (storedUser && storedUser.email && storedUser.role) {
//           setUser(storedUser);
//         } else {
//           localStorage.removeItem('user');
//         }
//       } catch (err) {
//         console.error("Failed to parse stored user:", err);
//         localStorage.removeItem('user');
//       }
//     }
//   }, []);

//   // Role-based redirection after login
//   useEffect(() => {
//     if (!user) return;

//     let targetPath = null;

//     if (user.role === 'therapist') {
//       if (user.status !== 'approved' && location.pathname !== '/therapist-status') {
//         targetPath = '/therapist-status';
//       } else if (user.status === 'approved' && location.pathname !== '/dashboard') {
//         targetPath = '/dashboard';
//       }
//     } else if (user.role === 'child' && !['/', '/listoftherapists'].includes(location.pathname)) {
//       targetPath = '/';
//     } else if (user.role === 'superadmin' && location.pathname !== '/superadmindashboard') {
//       targetPath = '/superadmindashboard';
//     }

//     if (targetPath && location.pathname !== targetPath) {
//       navigate(targetPath, { replace: true });
//     }
//   }, [user]);

//   const handleLogout = () => {
//     console.log("🚨 Logging out...");
//     localStorage.clear();
//     setUser(null);
//     navigate('/');
//   };

//   return (
//     <>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Homepage user={user} handleLogout={handleLogout} />} />
//         <Route path="/login" element={<Loginpage onLogin={setUser} navigate={navigate} />} />
//         <Route path="/marineinterface" element={<MarineInterface />} />
//         <Route path="/Starfishgame" element={<Starfishgame />} />
//         <Route path="/report" element={<GameReportGenerator />} />
//         <Route path="/listoftherapists" element={<TherapistListPage />} />
//         <Route path="/superadmindashboard" element={<SuperAdminDashboard />} />

//         {/* Therapist waiting for approval */}
//         <Route path="/therapist-status" element={<TherapistStatusPage />} />

//         {/* Therapist Dashboard (Protected) */}
//         <Route
//           path="/dashboard"
//           element={
//             user ? (
//               user.role === "therapist" ? (
//                 user.status === "approved" ? (
//                   <TherapistDashboard userId={user._id} />
//                 ) : (
//                   <Navigate to="/therapist-status" />
//                 )
//               ) : (
//                 <p>You are not authorized to access this dashboard.</p>
//               )
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />
//       </Routes>
//     </>
//   );
// }

// export default function AppWrapper() {
//   return (
//     <Router>
//       <App />
//     </Router>
//   );
// }





























import React, { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation
} from 'react-router-dom';

import {
  Homepage,
  Loginpage,
  MarineInterface,
  Starfishgame,
  GameReportGenerator,
  TherapistDashboard,
  TherapistListPage,
  TherapistStatusPage,
  SuperAdminDashboard,
} from './def';

export default function MainRouter() {
  const [user, setUser] = useState(() => {
    const storedUserStr = localStorage.getItem('user');
    if (storedUserStr) {
      try {
        const storedUser = JSON.parse(storedUserStr);
        if (storedUser?.email && storedUser?.role) {
          return storedUser;
        }
      } catch (err) {
        localStorage.removeItem('user');
      }
    }
    return null;
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUserStr = localStorage.getItem('user');
    if (storedUserStr) {
      try {
        const storedUser = JSON.parse(storedUserStr);
        if (storedUser?.email && storedUser?.role) {
          setUser(storedUser);
        } else {
          localStorage.removeItem('user');
        }
      } catch (err) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  useEffect(() => {
    if (!user) return;

    let targetPath = null;

    if (user.role === 'therapist') {
      if (user.status !== 'approved' && location.pathname !== '/therapist-status') {
        targetPath = '/therapist-status';
      } else if (user.status === 'approved' && location.pathname !== '/dashboard') {
        targetPath = '/dashboard';
      }
    } else if (user.role === 'child' && !['/', '/listoftherapists'].includes(location.pathname)) {
      targetPath = '/';
    } else if (user.role === 'superadmin' && location.pathname !== '/superadmindashboard') {
      targetPath = '/superadmindashboard';
    }

    if (targetPath && location.pathname !== targetPath) {
      navigate(targetPath, { replace: true });
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate('/');
  };

  return (
    <Routes>
      <Route path="/" element={<Homepage user={user} handleLogout={handleLogout} />} />
      <Route path="/login" element={<Loginpage onLogin={setUser} />} />
      <Route path="/marineinterface" element={<MarineInterface />} />
      <Route path="/Starfishgame" element={<Starfishgame />} />
      <Route path="/report" element={<GameReportGenerator />} />
      <Route path="/listoftherapists" element={<TherapistListPage />} />
      <Route path="/superadmindashboard" element={<SuperAdminDashboard />} />
      <Route path="/therapist-status" element={<TherapistStatusPage />} />
      <Route
        path="/dashboard"
        element={
          user?.role === "therapist" && user?.status === "approved" ? (
            <TherapistDashboard userId={user._id} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}





// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

// import Homepage from './Homepage';
// import Loginpage from './Loginpage';
// import MarineInterface from './marineinterface';
// import Starfishgame from './Starfishgame';
// import GameReportGenerator from './GameReportGenerator';
// import TherapistDashboard from './components/TherapistDashboard';
// import TherapistListPage from './TherapistListPage';
// import { SuperAdminDashboard } from './SuperAdminDashboard';

// function App() {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Load user from localStorage when the app starts
//   useEffect(() => {
//     const storedUserStr = localStorage.getItem('user');
//     if (storedUserStr) {
//       try {
//         const storedUser = JSON.parse(storedUserStr);
//         if (storedUser && storedUser.email && storedUser.role) {
//           setUser(storedUser);
//         } else {
//           localStorage.removeItem('user');
//         }
//       } catch (err) {
//         console.error("Failed to parse stored user:", err);
//         localStorage.removeItem('user');
//       }
//     }
//   }, []);

//   // Redirect user after login based on their role
// useEffect(() => {
//   if (!user) {
//     // User not logged in, send them to landing page unless already there
//     if (location.pathname !== '/') {
//       navigate('/');
//     }
//   } else {
//     // Logged-in user
//     if (user.role === 'therapist' && location.pathname !== '/dashboard') {
//       navigate('/dashboard');
//     } else if (
//       user.role === 'child' &&
//       location.pathname !== '/' &&
//       location.pathname !== '/listoftherapists'
//     ) {
//       navigate('/');
//     } else if (
//       user.role === 'superadmin' &&
//       location.pathname !== '/superadmindashboard'
//     ) {
//       navigate('/superadmindashboard');
//     }
//   }
// }, [user, navigate, location.pathname]);


//   const handleLogout = () => {
//     console.log("🚨 Logging out...");
//     localStorage.clear();
//     setUser(null);
//     navigate('/'); // go to homepage after logout
//   };

//   return (
//     <>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Homepage user={user} handleLogout={handleLogout} />} />
//         <Route path="/login" element={<Loginpage onLogin={setUser} />} />
//         <Route path="/marineinterface" element={<MarineInterface />} />
//         <Route path="/Starfishgame" element={<Starfishgame />} />
//         <Route path="/report" element={<GameReportGenerator />} />
//         <Route path="/listoftherapists" element={<TherapistListPage />} />

//         {/* Superadmin Protected Route */}
//         <Route
//           path="/superadmindashboard"
//           element={
//             user && user.role === "superadmin" ? (
//               <SuperAdminDashboard />
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />

//         {/* Therapist Protected Route */}
//         <Route
//           path="/dashboard"
//           element={
//             user && user.role === "therapist" ? (
//               <TherapistDashboard userId={user._id} />
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />
//       </Routes>
//     </>
//   );
// }

// // Wrapper for Router setup
// export default function AppWrapper() {
//   return (
//     <Router>
//       <App />
//     </Router>
//   );
// }

