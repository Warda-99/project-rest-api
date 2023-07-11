import React, { useState } from "react";
import axios from 'axios'
import { Navigate, useNavigate } from "react-router-dom";

export const Login = (props) => {
  const [errMsg, setErrMsg] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = { email, password }
		axios
			.post('https://project-rest-api-production.up.railway.app/api/login', user)
			.then((res) => {
				var value = res.headers['set-cookie']
				console.log(res.data)
				localStorage.setItem('user', JSON.stringify(res.data))
        localStorage.setItem('token', res.data.token)

        navigate('/home', { replace: true })
			})
			.catch((err) => {
				setErrMsg(err)
				console.log(errMsg)
			})
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          id="email"
          name="email"
        />
        <input
          value={password}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        <button type="submit" className="button-submit">Login</button>
      </form>
      <button
        className="link-btn"
        onClick={() => props.onFormSwitch("register")}
      >
        Don't have an account? Register here.
      </button>
    </div>
  );
};
