import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { AuthRoute } from './components/AuthRoute';
import { Projects } from './pages/projects/Projects';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* <AuthRoute> */}
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
        {/* </AuthRoute> */}

    </Routes>
    </BrowserRouter>
  );
}
