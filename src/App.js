
import './App.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsFillPersonFill } from 'react-icons/bs';
import { RiLoader4Line } from 'react-icons/ri';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://reqres.in/api/users?page=1');
      setUsers(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-brand">
          <BsFillPersonFill className="brand-icon" />
          <span className="brand-name">Brand Name</span>
        </div>
        <button className="get-users-btn" onClick={fetchUsers} disabled={loading}>
          {loading ? <RiLoader4Line className="loading-icon" /> : 'Get Users'}
        </button>
      </nav>
      <div className="user-grid">
        {loading ? (
          <div className="loader">
            <RiLoader4Line className="loading-spinner" />
          </div>
        ) : (
          users.map((user) => (
            <div className="user-card" key={user.id}>
              <img className="avatar" src={user.avatar} alt={user.first_name} />
              <h3 className="user-name">{`${user.first_name} ${user.last_name}`}</h3>
              <p className="user-email">{user.email}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
