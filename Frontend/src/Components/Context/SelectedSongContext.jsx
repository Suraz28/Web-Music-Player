import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useQuery } from "@tanstack/react-query";

const MusicContext = createContext();

export const useMusicContext = () => useContext(MusicContext);

export const MusicProvider = ({ children }) => {
  const [selectedSong, setSelectedSong] = useState(null);
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [repeatMode, setRepeatMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffleMode, setShuffleMode] = useState(false);

  const audioRef = useRef(null);
  
  
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
  });
  
  useEffect(() => {
    if (!isLoading && !isError && songsList) {
      // Reset currentIndex when fetching new songs
      setCurrentIndex(0);
    }
  }, [songsList, isLoading, isError]);

  const toggleRepeatMode = () => {
    setRepeatMode(!repeatMode);
  };

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

  
  // Function to handle heart click and add song to favorites
  const handleHeartClick = (song) => {
    // Add song to favorites
    setFavoriteSongs((prevSongs) => [...prevSongs, song]);
  };
  
  // Function to handle adding a song to the playlist
  const handlePlaylist = (song) => {
    // Add song to playlist
    setPlaylistSongs((prevSongs) => [...prevSongs, song]);
  };
  
  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  const playPreviousSong = () => {
    const newIndex = currentIndex === 0 ? songsList.length - 1 : currentIndex - 1;
    setSelectedSong(songsList[newIndex]);
    setCurrentIndex(newIndex);
  };
  
  const toggleShuffleMode = () => {
    setShuffleMode(!shuffleMode);
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

  useEffect(() => {
    if(audio){
      audio.pause();
    }
    // When selectedSong changes, load and play the audio
    if (selectedSong) {
      const newAudio = new Audio(selectedSong.audio);
      setAudio(newAudio);
      newAudio.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error('Failed to play audio:', error);
        });
    } else {
      // If there's no selected song, pause the audio
      if (audio) {
        audio.pause();
        setIsPlaying(false);
      }
    }

    // Cleanup function
    return () => {
      if (audio) {
        audio.pause();
        setAudio(null);
        setIsPlaying(false);
      }
    };
  }, [selectedSong]);
  

  // Update selected song and play it
  const playSong = (song) => {
    setSelectedSong(song);
  };

  return (
    <MusicContext.Provider
      value={{
        selectedSong,
        setSelectedSong,
        favoriteSongs,
        setFavoriteSongs,
        handleHeartClick,
        playlistSongs,
        setPlaylistSongs,
        handlePlaylist,
        audio,
        isPlaying,
        playSong,
        togglePlay,
        currentTime,
        duration,
        setDuration,
        formatTime,
        handleTimeChange,
        repeatMode,
        setRepeatMode,
        toggleRepeatMode,
        playNextSong,
        playPreviousSong,
        currentIndex,
        setCurrentIndex,
        songsList,
        audioRef,
        toggleShuffleMode,
        shuffleMode,
        setShuffleMode
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
