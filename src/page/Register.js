import React, { useState } from "react";
import axios from 'axios'
import { Navigate, useNavigate } from "react-router-dom";

export const Register = (props) => {
  const [errMsg, setErrMsg] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [indeks, setIndexNr] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);

    const user = {
      firstname,
      lastname,
      email,
      password,
      indeks
    }
    axios
      .post('https://project-rest-api-production.up.railway.app/api/register', user)
      .then((res) => {
        localStorage.setItem('token', res.data.accessToken)
        var value = res.headers['set-cookie']
        // console.log(value)
        // console.log(res.data)
        localStorage.setItem('user', JSON.stringify(res.data))

        navigate('/home', { replace: true })
      })
      .catch((err) => {
        setErrMsg(err)
        console.log(errMsg)
      })
  };

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          value={firstname}
          name="firstname"
          onChange={(e) => setFirstName(e.target.value)}
          id="firstname"
          placeholder="Firstname"
        />
        <input
          value={lastname}
          name="lastname"
          onChange={(e) => setLastName(e.target.value)}
          id="lastname"
          placeholder="Lastname"
        />
        <input
          value={indeks}
          name="indeks"
          type={"number"}
          onChange={(e) => setIndexNr(e.target.value)}
          id="indeks"
          placeholder="Index number"
        />
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
        <button type="submit" className="button-submit">Register</button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch("login")}>
        Already have an account? Login here.
      </button>
    </div>
  );
};
