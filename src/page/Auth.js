import '../styles/Login.css'
import { Register } from './Register';
import { Login } from './Login';
import { useState } from 'react';

export const Auth = () => {
    const [currentForm, setCurrentForm] = useState('login');

    const toggleForm = (formName) => {
      setCurrentForm(formName);
    }
  
    return (
      <div className="App">
        {
          currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
        }
      </div>
    );
}
