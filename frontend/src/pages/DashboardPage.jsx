import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function DashboardPage(){
  const [user,setUser]=useState(JSON.parse(localStorage.getItem('user')));
  const [ideas,setIdeas]=useState([]);

  useEffect(()=>{ fetchIdeas(); },[]);

  async function fetchIdeas(){
    try{
      const res = await axios.get((import.meta.env.VITE_API_URL||'http://localhost:5001') + '/api/ideas');
      setIdeas(res.data);
    }catch(e){ console.error(e); }
  }

  return (<div className="container">
    <div className="nav"><div className="brand"><h1>Idea Portal</h1></div><div><Link to="/board" style={{color:'#9fb'}}>Board</Link></div></div>
    <div style={{height:24}} />
    <div className="card">
      <h2>Welcome, {user?.name || user?.email}</h2>
      <p className="small">Role: {user?.role} | Points: {user?.points || 0}</p>
      <div style={{height:12}} />
      <Link to="/submit" className="button" style={{textDecoration:'none'}}>Submit Idea</Link>
      <div style={{height:18}} />
      <h3>Recent Ideas</h3>
      <div>
        {ideas.map(i=> (
          <div key={i._id} className="card" style={{marginBottom:12}}>
            <strong>{i.title}</strong>
            <div className="small">by {i.author?.name || i.author}</div>
            <div className="small">Status: {i.status}</div>
          </div>
        ))}
      </div>
    </div>
  </div>)
}
