import React from 'react'
import "./Maingenre.css";

import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom"


const Maingenre = () => {

  return (
    <div className='maingenre'>
        <div className='maingenrediv'>
      <div className='maingenre-text'>
        <span>Genres</span>
        <Link to="/explore">
        <RxCross2 style={{fontSize: "25px", color: "white", cursor: "pointer"}}/>
        </Link>
      </div>
      <div className='maingenre-cards'>
        <Link to="/mood_booster" style={{textDecoration: "none", color: "inherit", cursor: "pointer"}}>
    <div className='maingenre-singlecard'>
      Mood-Booster
    </div>
        </Link>
    <Link to="/mood_happy" style={{textDecoration: "none", color: "inherit", cursor: "pointer"}}>
    <div className='maingenre-singlecard'>
      Mood-Happy
    </div>
    </Link>
    <Link to="/mood_dohori" style={{textDecoration: "none", color: "inherit", cursor: "pointer"}}>
    <div className='maingenre-singlecard'>
      Mood-Dohori
    </div>
    </Link>
    <Link to="/mood_bhajan" style={{textDecoration: "none", color: "inherit", cursor: "pointer"}}>
    <div className='maingenre-singlecard'>
      Mood-Bhajan
    </div>
    </Link>
      </div>
        </div>
    </div>
  )
}

export default Maingenre;