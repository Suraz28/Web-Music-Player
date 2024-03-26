import React from 'react';
import "./User.css";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { useFormContext } from '../../Context/Context';

const User = () => {
    const { currentUser } = useFormContext();

    return (
        <div className='user'>
            <div className='userdiv'>
                <div className='userdivtexts'>
                   <h3>Profile</h3>
                   <Link to="/explore" style={{textDecoration: "none", color: "inherit", cursor: "pointer"}}>
                   <RxCross2 style={{fontSize: "25px", cursor: "pointer"}}/>
                   </Link>
                </div>
                <div className="userdetails">
                    <div className='info'>
                      <div className='profileicon'>
                          <FaUserAlt style={{fontSize: "100px", color: "var(--black)"}}/>
                      </div>
                      {currentUser && ( // Check if currentUser exists
                        <div className='credentials'>
                          <span><b>Name: {currentUser.name}</b></span>
                          <span><b>Email: {currentUser.email}</b></span>
                          <span><b>Password: {currentUser.password}</b></span>
                        </div>
                      )}
                    </div>
                </div>
                <div className='logout'>
                  <Link to="/"><button className='button'>Logout</button></Link>
                </div>
            </div>
        </div>
    );
}

export default User;