import React from 'react';
import Login from './components/screens/login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/screens/register/Register';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
