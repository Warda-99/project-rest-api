import React, { useState } from 'react';
import '../styles/TopBar.css';
import Background from './Background';

const TopBar = () => {

     // Authorization session switch (true/false)
  const [isLoggedIn] = useState(true);
  
  // const navigate = useNavigate()

	// const logoutUser = () => {
	// 	localStorage.removeItem("user")
	// 	navigate('/')
	// 	window.location.reload();
	// }

  return (
    <div class="top-bar">
        <div><Background /></div>
        <a href="/home">Home</a>
        {isLoggedIn ? (
        // isLoggedIn
        <>
        <a href="/home">My Projects</a>
        <div className="dropdown">
        <div class="profile-icon">
            <img src={process.env.PUBLIC_URL + '/pbs.png'} alt="Profile Image"/>
        </div>
            <div className="dropdown-content">
                <a href="/account">My Account</a>
                <a href="/logout">Logout</a>
            </div>
          </div>
        </>
      ) : (
        // !isLoggedIn
        <a href="/">Login</a>
      )}
    </div>
  );
};

export default TopBar;
