// This component shows up when we start the app
// Displays current time and the login button

import './Login.css';
import { FC, useEffect, useState } from 'react';
import Logo from '../images/Logo.svg';

// Components
import Button from './Button';
import { Link } from 'react-router-dom';

const Login: FC = () => {
  const [time, setTime] = useState<string>(
    new Date().toTimeString().substr(0, 5)
  );

  const id = 1;

  useEffect(() => {
    fetch(`/api/getpersonnel/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('role', JSON.stringify(data.personnel.role));
      });
  }, [id]);

  useEffect(() => {
    // Update the time state in intervals of 1 second to always have accurate time
    const timer = setInterval(() => {
      const currentTime: string = new Date().toTimeString().substr(0, 5);
      setTime(currentTime);
    }, 1000);

    // Clean up when this component unmounts so we don't keep calling the interval
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div className="container">
      <div className="time">
        <h1>{time}</h1>
      </div>
      <div className="login">
        <img src={Logo} alt="Region Östergötland Logo" />
        <Link to="/MyPatients" className="button-login">
          <Button text="Logga in" color="primary" />
        </Link>
      </div>
    </div>
  );
};

export default Login;
