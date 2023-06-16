import React, { useState } from 'react';
import TopBar from './TopBar';
import '../styles/Account.css';

export const Account = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdate = () => {
  };

  return (
    <>
      <TopBar />
      <div className="account-page">
        <h2>My Account</h2>
        <form>
          <label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
          </label>
          <label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </label>
          <label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
            />
          </label>
          <label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Old password"
            />
          </label>
          <button onClick={handleUpdate}>Update Account</button>
        </form>
      </div>
    </>
  );
};
