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
        <h2>Moje konto</h2>
        <form>
          <label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nazwa użytkownika"
            />
          </label>
          <label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
            />
          </label>
          <label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nowe hasło"
            />
          </label>
          <label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Stare hasło"
            />
          </label>
          <button onClick={handleUpdate}>Zaktualizuj konto</button>
        </form>
      </div>
    </>
  );
};
