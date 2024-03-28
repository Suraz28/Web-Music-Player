import React from 'react';
import "./Player.css";
import { IoIosShuffle, IoMdRepeat } from "react-icons/io";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import { FaPlay, FaPause } from "react-icons/fa";
import { useMusicContext } from '../../../Context/SelectedSongContext';


const Player = () => {
  const { selectedSong, isPlaying,togglePlay , currentTime,
    duration,
    formatTime,
    handleTimeChange, repeatMode, toggleRepeatMode, playPreviousSong, playNextSong,
    audioRef, shuffleMode, toggleShuffleMode} = useMusicContext();

  return (
    <div className='player'>
      <div className='playertext'>
        <span>Divine Music Player</span>
      </div>
      <div className='playerdiv'>
        {selectedSong && (
          <div>
            <div className='playerimage'>
              <img src={selectedSong.img} alt={`Cover for ${selectedSong.title}`} />
            </div>
            <div className='playertexts'>
              <h3>{selectedSong.title}</h3>
              <span>{selectedSong.name}</span>
            </div>
            <div className='audioplayer'>
              <div className='audio'>
                <audio id='myAudio' controls ref={audioRef}>
                  <source
                    id='mySource'
                    src={selectedSong.audio}
                    type='audio/mpeg'
                    accept='.mp3, audio'
                  />
                </audio>
                <input
                  id='myProgress'
                  type='range'
                  value={currentTime}
                  max={duration}
                  onChange={handleTimeChange}
                />
                <div className='songTime'>
                  <p id='startTime'>{formatTime(currentTime)}</p>
                  <p id='endTime'>{formatTime(duration)}</p>
                </div>
              </div>
            </div>
            <div className='playerbuttons'>
              <button className='playerbutton' onClick={toggleShuffleMode}>
                <IoIosShuffle color={shuffleMode ? '#02adc0' : ''} />
              </button>
              <button className='playerbutton' onClick={playPreviousSong}>
                <MdSkipPrevious />
              </button>
              <button className='playerbutton' onClick={togglePlay}>
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <button className='playerbutton' onClick={playNextSong}>
                <MdSkipNext />
              </button>
              <button className='playerbutton' onClick={toggleRepeatMode}>
                <IoMdRepeat color={repeatMode ? '#02adc0' : ''} />
              </button>
            </div>
          </div>
        )}
        {!selectedSong && (
          <div>
            <div className='playerimage'>
              <img src="./public/Logos/logo-no-background.png" alt="Logo" />
            </div>
            <div className='playertexts'>
              <h3>DIVINE MUSIC PLAYER</h3>
              <span className='slogan'>Harmony in Every Note,<br/>Rhythm in Every Heartbeat</span>
              <br/>
              <span className='playertextsnames'>Designed and Coded<br/>by<br/><br/>SURAZ SUBEDI</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Player;
