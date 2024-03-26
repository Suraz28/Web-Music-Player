import React from 'react';
import { FaRegUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useFormContext } from '../Context/Context';
import "./Signup.css";


const SignUp = () => {

  const {name, setName, password, email, setEmail, setPassword, ispasswordVisible, Toggle, handleSubmit, handleFields, isChecked, setIsChecked, handleSignUp, NewAccount, signupmessage} = useFormContext();
  return (
    <div className='signup'>
    <div className='form-container'>
      <div className='form-content'>
        <div className='form-header'>
            <img src='./public/Logos/logo-no-background.png' className='rotating-image'/>
          <h1>SignUp</h1>
        </div>
        <form className='form-body' onSubmit={handleSignUp}>
          <span className='text-sm'>{signupmessage}</span>
          <div className='input-group'>
            <input
              type="text"
              name='name'
              placeholder='Username'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='input-field'
              required
            />
            <FaRegUser className='icon' />
          </div>
          <div className='input-group'>
            <input
              type="email"
              name='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='input-field'
              required
              autoComplete='email'
            />
            <MdOutlineMail className='icon' />
          </div>
          <div className='input-group'>
            <input
              type={ispasswordVisible ? "text" : "password"}
              name="password"
              placeholder='Password'
              value={password}
              autoComplete='off'
              onChange={(e) => setPassword(e.target.value)}
              className='input-field'
              required
            />
            {ispasswordVisible ? (
              <FaEyeSlash className='icon' onClick={Toggle} />
            ) : (
              <FaEye className='icon' onClick={Toggle} />
            )}
          </div>
          <div className='checkbox-group'>
            <input
              type='checkbox'
              id='terms'
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <label htmlFor='terms' className='checkbox-label'>I agree with terms & conditions</label>
          </div>
          <div className='button-group'>
            <button type='Submit' className='submit-button' onClick={NewAccount}>Create Account</button>
          </div>
        <div className='link-group'>
          <Link to="/" className='signIn-link' onClick={handleFields} >Already have an account? LogIn</Link>
        </div>
        </form>
      </div>
    </div>
  </div>
);
};

export default SignUp;