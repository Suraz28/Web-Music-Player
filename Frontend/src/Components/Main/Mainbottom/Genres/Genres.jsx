import React from 'react'
import "./Genres.css";
import {useQuery} from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Genres = () => {

  return (
    <div className='genres'>
      <div className='genrestext'>
        <span>Genres</span>
        <Link to="/genres" style={{textDecoration: "none", color: "inherit", cursor: "pointer"}}>
        <span>See All</span>
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
  )
}

export default Genres;