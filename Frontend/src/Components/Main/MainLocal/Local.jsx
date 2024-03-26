import React, { useEffect, useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { useMusicContext } from '../../Context/SelectedSongContext';
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import "./Local.css";


const Local = () => {
    const { setSelectedSong } = useMusicContext();
    const [audioDurations, setAudioDurations] = useState({});

    const fetchArtists = async () => {
        const response = await fetch("http://localhost:3000/Lists");
        if (!response.ok) {
            throw new Error("Error fetching data");
        }
        return response.json();
    };

    const { data: artists, isLoading, isError, error } = useQuery({
        queryKey: ["artists"],
        queryFn: fetchArtists,
        
    });

    useEffect(() => {
        if (artists) {
            fetchAudioDurations(artists);
        }
    }, [artists]);

    const fetchAudioDurations = async (artistsData) => {
        const durations = {};
        for (const artist of artistsData) {
            try {
                const duration = await getAudioDuration(artist.audio);
                durations[artist.id] = duration;
            } catch (error) {
                console.error("Error loading audio duration:", error);
            }
        }
        setAudioDurations(durations);
    };

    const getAudioDuration = async (audioSrc) => {
        return new Promise((resolve, reject) => {
            const audio = new Audio(audioSrc);
            audio.addEventListener('loadedmetadata', () => {
                resolve(audio.duration);
            });
            audio.addEventListener('error', reject);
        });
    };

    const formatDuration = (durationInSeconds) => {
        const minutes = Math.floor(durationInSeconds / 60);
        const seconds = Math.floor(durationInSeconds % 60);
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleSongSelect = (song) => {
        setSelectedSong(song);
    };

    if (isError) {
        return <p style={{ color: "whitesmoke" }}>{error}</p>
    }

    if (isLoading) {
        return <p style={{ color: "whitesmoke" }}>Loading...</p>
    }

    return (
        <div className='sidegenres'>
            <div className='sidegenresdiv'>
                <div className='sidegenredivtexts'>
                   <h3>Local</h3>
                   <Link to="/explore" style={{textDecoration: "none", color: "inherit", cursor: "pointer"}}>
                   <RxCross2 style={{fontSize: "25px", cursor: "pointer"}}/>
                   </Link>
                </div>
                {/* <img src='./public/Artists/Images/Prabesh Kumar Shrestha.png' style={{ width: '100%', height: '30vh', objectFit: 'cover', borderRadius: "10px" }}/> */}
                <div className="localList">
                    {artists.map((artist, id) => (
                        <div className='localitemlists' key={id} onClick={() => handleSongSelect(artist)}>
                            <div className='searchimage'><img src={artist.img} alt={artist.title} /></div>
                            <div className='searchtext'><p>{artist.title}</p><p className='searchname'>{artist.name}</p></div>
                            <div className='listaudiolength'>{audioDurations[artist.id] ? formatDuration(audioDurations[artist.id]) : 'Loading...'}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Local;
