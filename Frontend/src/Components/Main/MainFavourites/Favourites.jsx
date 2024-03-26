import React from 'react';
import { useMusicContext } from '../../Context/SelectedSongContext';
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import "./Favourites.css";
import { PiSmileySadLight } from "react-icons/pi";


const Favourites = () => {
    const { favoriteSongs, setSelectedSong, setFavoriteSongs } = useMusicContext();

    const formatDuration = (durationInSeconds) => {
        const minutes = Math.floor(durationInSeconds / 60);
        const seconds = Math.floor(durationInSeconds % 60);
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleSongSelect = (song) => {
        setSelectedSong(song);
    };

    const handleDelete = (id) => {
        const updatedSongs = favoriteSongs.filter((song, index) => index !== id);
        setFavoriteSongs(updatedSongs);
    };

    return (
        <div className='sidegenres'>
            <div className='sidegenresdiv'>
                <div className='sidegenredivtexts'>
                    <h3>Favourites</h3>
                    <Link to="/explore" style={{textDecoration: "none", color: "inherit", cursor: "pointer"}}>
                        <RxCross2 style={{fontSize: "25px", cursor: "pointer"}}/>
                    </Link>
                </div>
                {favoriteSongs.length === 0 ? (
                    <div style={{height: "100%", width: "100%", display:"flex", alignItems: "center", justifyContent: "center"}}>No Favourite Songs <br/><PiSmileySadLight style={{color: "#dfdfdf", fontSize: "25px"}}/></div>
                ) : (
                    <div className="favouriteList">
                        {favoriteSongs.map((song, id) => (
                            <div className='favouriteitemlists' key={id}>
                                <div className='searchimage' onClick={() => handleSongSelect(song)}><img src={song.img} alt={song.title} /></div>
                                <div className='searchtext' onClick={() => handleSongSelect(song)}><p>{song.title}</p><p className='searchname'>{song.name}</p></div>
                                <div className='listaudiolength' onClick={() => handleSongSelect(song)}>{song.duration ? formatDuration(song.duration) : 'Loading...'}</div>
                                <button className="button" onClick={() => handleDelete(id)}>Remove</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Favourites;
