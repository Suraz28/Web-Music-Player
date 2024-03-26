import React, { useState, useEffect, useRef } from 'react';
import "./Player.css";
import { IoIosShuffle, IoMdRepeat } from "react-icons/io";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import { FaPlay, FaPause } from "react-icons/fa";
import { useMusicContext } from '../../../Context/SelectedSongContext';
import { useQuery } from "@tanstack/react-query";

const Player = () => {
  const { selectedSong, setSelectedSong, audio, setAudio, isPlaying, setIsPlaying } = useMusicContext();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [repeatMode, setRepeatMode] = useState(false);
  const [shuffleMode, setShuffleMode] = useState(false);
  const audioRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const Fetch = async () => {
    const response = await fetch("http://localhost:3000/Lists");
    if (!response.ok) {
      throw new Error("Error fetching data");
    }
    const data = await response.json();
    return data.songs;
  };
  const { data: songsList, isLoading, isError, error } = useQuery({
    queryKey: ["list"],
    queryFn: Fetch,
    queries:
    {
      staleTime: Infinity,
      refetchOnMount: false,
    }
  });
  
  useEffect(() => {
    if (!isLoading && !isError && songsList) {
      // Reset currentIndex when fetching new songs
      setCurrentIndex(0);
    }
  }, [songsList, isLoading, isError]);

  useEffect(() => {
    if (!isLoading && !isError && songsList && selectedSong) {
      // Check if the selected song is part of the newly fetched song list
      const newIndex = songsList.findIndex(song => song.id === selectedSong.id);
      if (newIndex === -1) {
        // If selected song is not found in the new list, select the first song
        setSelectedSong(songsList[0]);
        setCurrentIndex(0);
      }
    }
  }, [songsList, isLoading, isError, selectedSong, setSelectedSong]);

  const toggleShuffleMode = () => {
    setShuffleMode(!shuffleMode);
  };

  const playPreviousSong = () => {
    const newIndex = currentIndex === 0 ? songsList.length - 1 : currentIndex - 1;
    setSelectedSong(songsList[newIndex]);
    setCurrentIndex(newIndex);
  };

  const playNextSong = () => {
    let newIndex;
    // Check if shuffle mode is enabled
    if (shuffleMode) {
      do {
        newIndex = Math.floor(Math.random() * songsList.length);
      } while (newIndex === currentIndex);
    } else {
      newIndex = (currentIndex + 1) % songsList.length;
    }
    setSelectedSong(songsList[newIndex]);
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      if (repeatMode) {
        audio.currentTime = 0;
        audio.play();
        setIsPlaying(true);
      } else {
        playNextSong();
      }
    };

    if (audio) {
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [audio, repeatMode, playNextSong]);


  useEffect(() => {
    if (selectedSong) {
      if (audio) {
        audio.pause();
      }
  
      const newAudio = new Audio(selectedSong.audio);
      setAudio(newAudio);
      newAudio.play();
      setIsPlaying(true);
      setCurrentTime(0);
  
      return () => {
        newAudio.pause();
      };
    }
  }, [selectedSong]);

  // useEffect(() => {
  //   if (audio) {
  //     audio.pause();
  //   }

  //   if (selectedSong) {
  //     const newAudio = new Audio(selectedSong.audio);
  //     setAudio(newAudio);
  //     setIsPlaying(true);
  //     newAudio.play();
  //   }

  //   return () => {
  //     if (audio) {
  //       audio.pause();
  //       setAudio(null);
  //       setIsPlaying(false);
  //     }
  //   };
  // }, [selectedSong]);
  

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeChange = (e) => {
    const newTime = e.target.value;
    setCurrentTime(newTime);
    audio.currentTime = newTime;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const toggleRepeatMode = () => {
    setRepeatMode(!repeatMode);
  };

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
              <button className='playerbutton' onClick={toggleShuffleMode
}>
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
