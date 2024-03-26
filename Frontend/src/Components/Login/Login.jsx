import React, { useState } from 'react';
import { FaRegUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate  } from 'react-router-dom';
import { useFormContext } from '../Context/Context';
import "./Login.css";
import { MdOutlineMail } from "react-icons/md";


const LogIn = () => {
  const { name, setName, email, setEmail, password, setPassword, ispasswordVisible, Toggle, handleSubmit, handleFields, loginmessage, RevokeLogin, setLoginMessage } = useFormContext();
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const navigate = useNavigate();

  const handleAdminLoginClick = () => {
    setShowAdminLogin(!showAdminLogin);
  };

  const handleAdminLoginFormSubmit = (e) => {
    e.preventDefault();
    if (password === "adminadmin") {
      setLoginMessage(<p style={{ color:"#4299e1", marginBottom:"1rem", fontSize:"15px" }}>Logging in...</p>);
      setTimeout(() => {
        setPassword("");
        setLoginMessage("");
        navigate("/admin");
      }, 3000);
    } else {
     setLoginMessage(<p style={{ color:"#ef4444", marginBottom:"1rem", fontSize:"15px" }}>Incorrect Password</p>);
     setPassword("");
     setTimeout(() => {
      setLoginMessage('');
    }, 3000);
    }
  };

  return (
    <div className='login'>
      <div className='logindiv'>
        <div className='logindiv1'>
          <div className='logindiv2' onClick={handleAdminLoginClick}>
            <img src='./public/Logos/logo-no-background.png' className='rotating-image' alt="Logo" />
            <h1 className='text-2xl font-bold'>LogIn</h1>
          </div>
          {showAdminLogin && (
            <form className='loginform' onSubmit={handleAdminLoginFormSubmit}>
              <span className='loginmessage'>{loginmessage}</span>
              <div className='logininputdiv'>
                <input
                  type="password"
                  name="password"
                  placeholder='ENTER-ADMIN-CODE'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='input-field'
                  required
                />
              </div>
              <div className='loginbutton'>
                <button type='submit' className='loginbutton-button'>Log In</button>
              </div>
            </form>
          )}
          {!showAdminLogin && (
            <form action='POST' className=' loginform' onSubmit={handleSubmit}>
            <span className='loginmessage'>{loginmessage}</span>
              <div className='logininputdiv'>
                <input type="text" name='name' placeholder='Username' value={name} onChange={(e) => setName(e.target.value)} className='input-field' required /><FaRegUser style={{ position: "absolute", top: "0.75rem", transform: "translate-y-1/2", right: "0.75rem", color: "GrayText" }} />
                <input type="email" name='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className='input-field' required /><MdOutlineMail style={{ position: "absolute", top: "4rem", transform: "translate-y-1/2", right: "0.75rem", color: "GrayText" }} />
                <input type={ispasswordVisible ? "text" : "password"} name="password" placeholder='Password' value={password} autoComplete='off' onChange={(e) => setPassword(e.target.value)} className='input-field' required />{ispasswordVisible ? (<FaEyeSlash style={{ position: "absolute", top: "80%", transform: "translate-y-1/2", right: "0.75rem", color: "GrayText" }} onClick={Toggle} />) : (<FaEye style={{ position: "absolute", top: "80%", transform: "translate-y-1/2", right: "0.75rem", color: "GrayText" }} onClick={Toggle} />)}
              </div>
              <div className='loginbutton'>
                <button type='submit' className='loginbutton-button' onClick={RevokeLogin}><Link to='/admin' style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}>LogIn</Link></button>
              </div>
          <div className='link-group'>
            <Link to="/signup" className='signIn-link' onClick={handleFields}>Dont't have an account? SignUp</Link>
          </div>
            </form>
            )}
        </div>
      </div>
    </div>
  )
}

export default LogIn;
