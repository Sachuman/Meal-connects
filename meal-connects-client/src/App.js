import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from "./components/Home";
import Details from "./components/Details";
import Display from "./components/Display";
import Navbar from "./components/Navbar";


function App() {
 

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/details" element={<Details />}/>
        <Route path="/display" element={<Display />}/> 

      </Routes>
    </Router>
    // I would like to thank Youtube to help me learn react js! The react js documentation is also good!
    
  );
}

export default App;