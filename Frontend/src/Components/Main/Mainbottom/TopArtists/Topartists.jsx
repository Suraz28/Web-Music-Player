import React from 'react';
import "./Topartists.css";
import { Link } from "react-router-dom";


const Topartists = () => {


  return (
    <div className='topartists'>
      <div className='toparttext'>
        <span>Top Artists</span>
        <Link to="/artists" style={{textDecoration: "none", color: "inherit", cursor: "pointer"}}>
        <span>See All</span>
        </Link>
      </div>
      <div className='topartistlists'>
          <Link to="/prabesh_k_shrestha" style={{textDecoration: "none", color: "inherit", cursor: "pointer"}}>
          <div className='topartistlists-content'>
            <img src="./public/Artists/Images/Prabesh Kumar Shrestha.png" />
            <span className='artistname'>Prabesh .k Shrestha</span>
          </div>
          </Link>
          <Link to="/bipul_chhetri" style={{textDecoration: "none", color: "inherit", cursor: "pointer"}}>
          <div className='topartistlists-content'>
            <img src="./public/Artists/Images/Bipul Chhetri.jpg" />
            <span className='artistname'>Bipul Chhetri</span>
          </div>
          </Link>
          <Link to="/sujan_chapagain" style={{textDecoration: "none", color: "inherit", cursor: "pointer"}}>
          <div className='topartistlists-content'>
            <img src="./public/Artists/Images/Sujan Chapagain.jpg" />
            <span className='artistname'>Sujan Chapagain</span>
          </div>
          </Link>
          <Link to="/the_elements" style={{textDecoration: "none", color: "inherit", cursor: "pointer"}}>
          <div className='topartistlists-content'>
            <img src="./public/Artists/Images/The Elements.jpg" />
            <span className='artistname'>The Elements</span>
          </div>
          </Link>
          <Link to="/tribal_rain" style={{textDecoration: "none", color: "inherit", cursor: "pointer"}}>
          <div className='topartistlists-content'>
            <img src="./public/Artists/Images/Tribal Rain.jpg" />
            <span className='artistname'>Tribal Rain</span>
          </div>
          </Link>
      </div>
    </div>
  );
};

export default Topartists;
