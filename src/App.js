// brain of react ui it defines what components/ pages should render and it pulls everything together from pages to styling 

import React from "react";  // imports the react to file often used to define the react components that we will be using in our app such as jsx tags like ,<div> ,<Route> 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // react router dom is used to handle routing in our application. It allows us to navigate between different pages or views within our app without reloading the entire page.
// browserrouter is the base component enables the routing functionality by wrapping around your app's content. The Routes component is used to define multiple routes within your app, each with its own set of paths and corresponding components. And finally the Route component is used to specify individual routes within your app.
import "./App.css";
import Starfishgame from "./Starfishgame"; // ./ refers to the it is in the same folder as app.js if we remove the./ means we are tryng to import the file from the node modulels like we did in case of react 
import MarineInterface from "./marineinterface"; // if the file is not in the same folder then we may use ./subfoldername/filename or ../filename if it is in parent folder telling to go up one level and look for the file there.
import Homepage from "./Homepage";
import Loginpage from "./Loginpage"; // importing the login page component which is used to handle user authentication and login functionality in our app.

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/marineinterface" element={<MarineInterface />} />
        <Route path="/Starfishgame" element={<Starfishgame />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Loginpage />} />
        {/* Optional: add this if you want to support the Exit route */}
        {/* <Route path="/view" element={<ViewComponent />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

