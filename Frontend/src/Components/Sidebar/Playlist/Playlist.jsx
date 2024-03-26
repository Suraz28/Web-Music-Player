import React from 'react';
import { useMusicContext } from '../../Context/SelectedSongContext';
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import "./Playlist.css";
import { PiSmileySadLight } from "react-icons/pi";

const Playlist = () => {
    const { playlistSongs, setSelectedSong, setPlaylistSongs } = useMusicContext();

    const formatDuration = (durationInSeconds) => {
        const minutes = Math.floor(durationInSeconds / 60);
        const seconds = Math.floor(durationInSeconds % 60);
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleSongSelect = (song) => {
        setSelectedSong(song);
    };

    const handleDelete = (id) => {
        const updatedSongs = playlistSongs.filter((song, index) => index !== id);
        setPlaylistSongs(updatedSongs);
    };

    // const addToPlaylist = (song) => {
    //     setPlaylistSongs(prevSongs => [...prevSongs, song]);
    // };

    return (
        <div className='sidegenres'>
            <div className='sidegenresdiv'>
                <div className='sidegenredivtexts'>
                    <h3>Playlist</h3>
                    <Link to="/explore" style={{textDecoration: "none", color: "inherit", cursor: "pointer"}}>
                        <RxCross2 style={{fontSize: "25px", cursor: "pointer"}}/>
                    </Link>
                </div>
                {playlistSongs.length === 0 ? (
                    <div style={{height: "100%", width: "100%", display:"flex", alignItems: "center", justifyContent: "center"}}>Your Playlist Is Empty <br/><PiSmileySadLight style={{color: "#dfdfdf", fontSize: "25px"}}/></div>
                ) : (
                    <div className="playlistList">
                        {playlistSongs.map((song, id) => (
                            <div className='playlistitemlists' key={id}>
                                <div className='searchimage' onClick={() => handleSongSelect(song)}><img src={song.img} alt={song.title} /></div>
                                <div className='searchtext' onClick={() => handleSongSelect(song)}><p>{song.title}</p><p className='searchname'>{song.name}</p></div>
                                <div className='listaudiolength' onClick={() => handleSongSelect(song)}>{song.duration ? formatDuration(song.duration) : 'Loading...'}</div>
                                <button className="button" onClick={() => handleDelete(id)}>Delete</button>
                                {/* <button className="button" onClick={() => addToPlaylist(song)}>Add to Playlist</button> */}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Playlist;
