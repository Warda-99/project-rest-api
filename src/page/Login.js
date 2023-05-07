import React, { useState } from "react";
import axios from 'axios'
import { Navigate, useNavigate } from "react-router-dom";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    //http://46.239.134.230:8080/api/test
    e.preventDefault();
    //console.log(email);

    //navigate('/home', { replace: true })

    const user = { email, pass }
		axios
			.post('https://project-rest-api-production.up.railway.app/api/login', user)
			.then((res) => {
				// localStorage.setItem('token', res.data.accessToken)
				// var value = res.headers['set-cookie']
				// console.log(value)
				// console.log(res.data)
				// setUser('')
				// setpassword('')
				// setSuccess(true)
				// localStorage.setItem('user', JSON.stringify(res.data))
        console.log(res)
			})
			.catch((err) => {
				// if (err.response) {
				// 	setErrMsg(`${err.response.data.error}`)
				// } else if (err.response.status === 400) {
				// 	setErrMsg(`${err.response.data.error}`)
				// } else if (err.response.status === 401) {
				// 	setErrMsg(`${err.response.data.error}`)
				// } else {
				// 	setErrMsg(`${err.response.data.error}`)
				// }
				// errRef.current.focus()
				console.log(err)
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
          value={pass}
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
