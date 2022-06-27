
import './App.css';
import { Navbar } from './Components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Home } from './Components/Home';
import { About } from './Components/About';
import { All } from './Components/All';
import NoteState from './Context/Notes/NoteState';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Alert from './Components/Alert';
import React, { useState } from 'react';
import background from "./img/laura-chouette-u9zMfQexlwk-unsplash.jpg";



function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })

    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <div style={{
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'repeat-y',
    width:'100vw',
    backgroundSize: 'cover' }} >

      <NoteState>
        <Router>
        <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element = {<Home showAlert={showAlert} />} />
              <Route exact path="/about" element = {<About/>} />
              <Route exact path="/all" element= {<All/>} />
              <Route exact path="/login" element = {<Login showAlert={showAlert} />} />
              <Route exact path="/signup" element = {<Signup showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
