import React, { useEffect, useState, useRef } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaRegUserCircle, FaHeart } from "react-icons/fa";
import "./Maintop.css";
import { useQuery } from "@tanstack/react-query";
import { useMusicContext } from '../../Context/SelectedSongContext';

const Maintop = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMusic, setFilteredMusic] = useState([]);
  const [showMusicList, setShowMusicList] = useState(false);
  const musicListRef = useRef(null);
  const [audioDurations, setAudioDurations] = useState({});
  const { setSelectedSong, handleHeartClick, setPlaylistSongs, handlePlaylist } = useMusicContext();
  
  const handleSongSelect = (song) => {
    setSelectedSong(song);
  };


  const settings = {
    fade: true,
    infinite: true,
    speed: 5000,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const Fetch = async () => {
    const response = await fetch("http://localhost:3000/Lists");
    if (!response.ok) {
      throw new Error("Error fetching data");
    }
    const data = await response.json();
    return data;
  }

  const { data: list, isLoading, isError, error } = useQuery({
    queryKey: ["list"],
    queryFn: Fetch,
    queries:
    {
      staleTime: Infinity,
      refetchOnMount: false,
    }
  });

  useEffect(() => {
    if (list) {
      const fetchAudioDurations = async () => {
        const durations = {};
        for (const type of list) {
          try {
            const duration = await getAudioDuration(type.audio);
            durations[type.id] = duration;
          } catch (error) {
            console.error("Error loading audio duration:", error);
          }
        }
        setAudioDurations(durations);
      };

      fetchAudioDurations();
    }
  }, [list]);

  const getAudioDuration = async (audioSrc) => {
    return new Promise((resolve, reject) => {
      const audio = new Audio(audioSrc);
      audio.addEventListener('loadedmetadata', () => {
        resolve(audio.duration);
      });
      audio.addEventListener('error', reject);
    });
  }

  const formatDuration = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setShowMusicList(true);
  };

  useEffect(() => {
    if (list) {
      const filteredList = list.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMusic(showMusicList ? filteredList : filteredList.slice(0, 4));
    }
  }, [list, searchQuery, showMusicList]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (musicListRef.current && !musicListRef.current.contains(event.target)) {
        setShowMusicList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <div className='maintop'>
      <div className='maintopicons'>
        <div className="search-box">
          <input
            className="input"
            type="text"
            placeholder="Search music..."
            required
            onClick={() => setShowMusicList(true)}
            onChange={handleInputChange}
          />
          {showMusicList && (
            <div className="musicList" ref={musicListRef}>
              {filteredMusic.map((type, id) => (
                <div className='searchlists' key={id}>
                  <div className='searchimage' onClick={() => handleSongSelect(type)}><img src={type.img} alt={type.title} /></div>
                  <div className='searchtext' onClick={() => handleSongSelect(type)}><p>{type.title}</p><p className='searchname'>{type.name}</p></div>
                  <div className='listaudiolength' onClick={() => handleSongSelect(type)}>{audioDurations[type.id] ? formatDuration(audioDurations[type.id]) : 'Loading...'}</div>
                  <button className='button' onClick={() => handlePlaylist(type)}>Add Playlist</button>
                </div>
              ))}
            </div>
          )}
        </div>
        <h4>Trending Now</h4>
      </div>
      <div className='slider'>
        {list && ( 
          <Slider {...settings} style={{ height: "40vh", width: "80vw", maxWidth: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "10px" }}>
            {list.map((type, id) => (
              <div key={id} className='slide'>
                <div className='listennow'>
                  <div className='listennow-buttons'>
                  <div className='listennow-buttons1'>
                      <h1>{type.title}</h1>
                      <span>{type.name}</span>
                    </div>
                    <div className='listennowtexts'>
                      <button className='button' onClick={() => handleSongSelect(type)}>Listen Now</button>
                      <button className='button' onClick={() => handleHeartClick(type)}>Add To Favourite</button>
                    </div>
                  </div>
                  <img src={type.img} alt={type.title} />
                </div>
              </div>
            ))}
          </Slider>
          )}
      </div>
    </div>
  );
};

export default Maintop;
