import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterPage(){
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const navigate = useNavigate();

  const submit = async (e)=>{
    e.preventDefault();
    try{
      await axios.post((import.meta.env.VITE_API_URL||'http://localhost:5001') + '/api/auth/register', { name, email, password });
      alert('Registered, please login.');
      navigate('/');
    }catch(err){ alert(err.response?.data?.message || 'Error'); }
  };

  return (<div className="container">
    <div className="nav"><div className="brand"><h1>Idea Portal</h1></div><div><Link to="/" style={{color:'#9fb'}}>Login</Link></div></div>
    <div style={{height:24}} />
    <div className="card" style={{maxWidth:520, margin:'0 auto'}}>
      <h2>Register</h2>
      <input className="input" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
      <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button className="button" onClick={submit}>Register</button>
    </div>
  </div>)
}
