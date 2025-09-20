import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminPage(){
  const [users,setUsers]=useState([]);

  useEffect(()=>{ fetchUsers(); },[]);

  async function fetchUsers(){
    try{
      const token = localStorage.getItem('token');
      const res = await axios.get((import.meta.env.VITE_API_URL||'http://localhost:5001') + '/api/users', { headers: { Authorization: 'Bearer '+token } });
      setUsers(res.data);
    }catch(e){ alert('Error fetching users'); }
  }

  async function changeRole(id,role){
    try{
      const token = localStorage.getItem('token');
      await axios.put((import.meta.env.VITE_API_URL||'http://localhost:5001') + '/api/users/' + id + '/role', { role }, { headers: { Authorization: 'Bearer '+token } });
      fetchUsers();
    }catch(e){ alert('Error updating role'); }
  }

  return (<div className="container">
    <div className="nav"><div className="brand"><h1>Idea Portal</h1></div><div></div></div>
    <div style={{height:24}} />
    <div className="card">
      <h2>Admin - Manage Users</h2>
      <table style={{width:'100%'}}>
        <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Action</th></tr></thead>
        <tbody>
          {users.map(u=> (
            <tr key={u._id}><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td>
              <td>
                <select onChange={(e)=>changeRole(u._id,e.target.value)} value={u.role} className="select">
                  <option value="user">user</option>
                  <option value="manager">manager</option>
                  <option value="expert">expert</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>)
}
