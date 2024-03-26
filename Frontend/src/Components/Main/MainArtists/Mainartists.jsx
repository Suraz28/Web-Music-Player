import React from 'react'
import "./Mainartists.css";

import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom"


const Mainartists = () => {

  return (
    <div className='maingenre'>
        <div className='maingenrediv'>
      <div className='maingenre-text'>
        <span>Artists</span>
        <Link to="/explore">
        <RxCross2 style={{fontSize: "25px", color: "white", cursor: "pointer"}}/>
        </Link>
      </div>
      <div className='maingenre-cards'>
        <Link to="/prabesh_k_shrestha" style={{textDecoration: "none", color: "inherit", cursor: "pointer"}}>
    <div className='maingenre-singlecard'>
      Prabesh .K Shrestha
    </div>
        </Link>
    <Link to="/bipul_chhetri" style={{textDecoration: "none", color: "inherit", cursor: "pointer"}}>
    <div className='maingenre-singlecard'>
      Bipul Chhetri
    </div>
    </Link>
    <Link to="/sujan_chapagain" style={{textDecoration: "none", color: "inherit", cursor: "pointer"}}>
    <div className='maingenre-singlecard'>
      Sujan Chapagain
    </div>
    </Link>
    <Link to="/the_elements" style={{textDecoration: "none", color: "inherit", cursor: "pointer"}}>
    <div className='maingenre-singlecard'>
      The Elements
    </div>
    </Link>
    <Link to="/tribal_rain" style={{textDecoration: "none", color: "inherit", cursor: "pointer"}}>
    <div className='maingenre-singlecard'>
      Tribal Rain
    </div>
    </Link>
      </div>
        </div>
    </div>
  )
}

export default Mainartists;