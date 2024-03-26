import React from 'react'
import "./Mainbottom.css";
import Topartists from './TopArtists/Topartists';
import Genres from './Genres/Genres';
import Topcharts from './TopChart/Topcharts';
import Player from './Player/Player';

const Mainbottom = () => {
  return (
    <div className='mainbottom'>
      <div className='mainbottom1'>
        <div className="artgenchart">
        <Topartists/>
        <div className='genchart'>
        <Genres/>
        <Topcharts/>
        </div>
        </div>
      </div>
      <div className='mainplayer'>
        <Player/> 
      </div>
    </div>
  )
}

export default Mainbottom;