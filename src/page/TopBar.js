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
        <a href="/home">Strona główna</a>
        {isLoggedIn ? (
        // isLoggedIn
        <>
        <a href="/myProjects" class="large-screen">Moje projekty</a>
        <a href="/chat" class="large-screen">Czat</a>
        <div class="dropdown">
          <div class="profile-icon">
              <img src={process.env.PUBLIC_URL + '/pbs.png'} alt="Profile Image"/>
          </div>
          <div class="dropdown-content">
              <a href="/myProjects" class="small-screen">Moje projekty</a>
              <a href="/chat" class="small-screen">Czat</a>
              <a href="/account">Moje konto</a>
              <a href="/logout">Wyloguj się</a>
          </div>
        </div>
        </>
      ) : (
        // !isLoggedIn
        <a href="/">Zaloguj się</a>
      )}
    </div>
  );
};

export default TopBar;
