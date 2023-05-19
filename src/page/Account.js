import React, { useState, useEffect } from 'react';
import TopBar from './TopBar';
import '../styles/Account.css';

export const Account = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUpdate = () => {
    // logic to update account details goes here
  };

  return (
    <>
      <TopBar/>
      <div className="account-page">
        <h2>My Account</h2>
        <form>
          <label>
            Username:
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </label>
          <button onClick={handleUpdate}>Update Account</button>
        </form>
      </div>
    </>
  );
};
