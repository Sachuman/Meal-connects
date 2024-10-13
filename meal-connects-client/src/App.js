import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from "./components/Home";
import Details from "./components/Details";
import DisplayDonors from "./components/DisplayDonors"; 
import DisplayShelters from "./components/DisplayShelters"; // 
import Navbar from "./components/Navbar";
import ImpactTracker from "./components/ImpactTracker";
import GoogleMaps from "./components/GoogleMaps";
import ChatbotGemini from "./components/ChatbotGemini";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="tracker" element={<ImpactTracker />} />
        <Route path="/details" element={<Details />} />
        <Route path="/display/donors" element={<DisplayDonors />} /> {/* Route for donor display */}
        <Route path="/display/shelters" element={<DisplayShelters />} /> {/* Route for shelter display */}
        <Route path="/tracker" element={<ImpactTracker />} />
        <Route path="/maps" element={<GoogleMaps />} />

      </Routes>
      <ChatbotGemini />
    </Router>
  );
}

export default App;
