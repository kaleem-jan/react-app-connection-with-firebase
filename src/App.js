
import './App.css';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
import Landing from './components/Landing';
import Signup from './components/Sginup';
import Private from './components/Private';


import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react'

function App() {

  const [isSignedIn, setIsSignedIn] = useState();

  const signin = () => {
    setIsSignedIn(true);
  }
  const signout = () => {
    setIsSignedIn(false);
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={
          <Private isSignedIn={isSignedIn}>
            <Dashboard />
          </Private>
        }
        />
      </Routes>
    </BrowserRouter>

  );
}

export default App;