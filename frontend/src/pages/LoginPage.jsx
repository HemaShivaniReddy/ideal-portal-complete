import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [otpStep,setOtpStep]=useState(false);
  const [otp,setOtp]=useState('');
  const navigate = useNavigate();

  const sendLogin = async (e)=>{
    e.preventDefault();
    try{
      const res = await axios.post((import.meta.env.VITE_API_URL||'http://localhost:5001') + '/api/auth/login', { email, password });
      alert(res.data.message + (res.data.otp?(' | OTP: '+res.data.otp):''));
      setOtpStep(true);
    }catch(err){ alert(err.response?.data?.message || 'Error'); }
  };

  const verify = async (e)=>{
    e.preventDefault();
    try{
      const res = await axios.post((import.meta.env.VITE_API_URL||'http://localhost:5001') + '/api/auth/verify-otp', { email, code: otp });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    }catch(err){ alert(err.response?.data?.message || 'Error verifying'); }
  };

  return (<div className="container">
    <div className="nav"><div className="brand"><h1>Idea Portal</h1></div><div><Link to="/register" style={{color:'#9fb'}}>Register</Link></div></div>
    <div style={{height:24}} />
    <div className="card" style={{maxWidth:640, margin:'0 auto'}}>
      <h2>Login</h2>
      {!otpStep ? (
        <form onSubmit={sendLogin}>
          <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="button" type="submit">Send OTP</button>
        </form>
      ) : (
        <form onSubmit={verify}>
          <input className="input" placeholder="Enter OTP" value={otp} onChange={e=>setOtp(e.target.value)} />
          <button className="button" type="submit">Verify OTP</button>
        </form>
      )}
    </div>
  </div>);
}
