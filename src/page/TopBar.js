import React, { useState } from 'react';
import '../styles/TopBar.css';

const TopBar = () => {

     // Authorization session switch (true/false)
  const [isLoggedIn] = useState(true);

  return (
    <div class="top-bar">
        <a href="/home">Home</a>
        {isLoggedIn ? (
        // isLoggedIn
        <>
        <a href="#">My Projects</a>
        <div className="dropdown">
        <div class="profile-icon">
            <img src={process.env.PUBLIC_URL + '/pbs.png'} alt="Profile Image"/>
        </div>
            <div className="dropdown-content">
                <a href="#">My Account</a>
                <a href="#">Logout</a>
            </div>
          </div>
        </>
      ) : (
        // !isLoggedIn
        <a href="#">Login</a>
      )}
    </div>
  );
};

export default TopBar;
