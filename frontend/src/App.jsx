import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';
import BoardPage from './pages/BoardPage';
import SubmitPage from './pages/SubmitPage';

export default function App(){
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route path='/board' element={<BoardPage />} />
        <Route path='/submit' element={<SubmitPage />} />
      </Routes>
    </Router>
  );
}
