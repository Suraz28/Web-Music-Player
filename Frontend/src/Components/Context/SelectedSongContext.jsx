import React, { createContext, useContext, useState, useEffect } from 'react';

const MusicContext = createContext();

export const useMusicContext = () => useContext(MusicContext);

export const MusicProvider = ({ children }) => {
  const [selectedSong, setSelectedSong] = useState(null);
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleHeartClick = (song) => {
    // Calculate duration for the selected song
    getAudioDuration(song.audio).then((duration) => {
      const songWithDuration = { ...song, duration };
      setFavoriteSongs((prevSongs) => [...prevSongs, songWithDuration]);
    });
  };
  const handlePlaylist = (song) => {
    // Calculate duration for the selected song
    getAudioDuration(song.audio).then((duration) => {
      const songWithDuration = { ...song, duration };
      setPlaylistSongs((prevSongs) => [...prevSongs, songWithDuration]);
    });
  };

  const getAudioDuration = async (audioSrc) => {
    return new Promise((resolve, reject) => {
      const audio = new Audio(audioSrc);
      audio.addEventListener("loadedmetadata", () => {
        resolve(audio.duration);
      });
      audio.addEventListener("error", reject);
    });
  };

  return (
    <MusicContext.Provider value={{ selectedSong, setSelectedSong, favoriteSongs, setFavoriteSongs, handleHeartClick, playlistSongs, setPlaylistSongs, handlePlaylist, audio, setAudio, isPlaying, setIsPlaying }}>
      {children}
    </MusicContext.Provider>
  );
};
