import React, { useState, useEffect } from 'react';
import "./Topcharts.css";
import { useQuery } from "@tanstack/react-query";
import { useMusicContext } from '../../../Context/SelectedSongContext';


const Topcharts = () => {

  const { setSelectedSong } = useMusicContext();
  
  const [audioDurations, setAudioDurations] = useState({});
  
  const handleSongSelect = (song) => {
    setSelectedSong(song);
  };


  async function Fetch() {
    const response = await fetch("http://localhost:3000/Lists");
    if (!response.ok) {
      throw new Error("Error fetching data");
    }
    const data = await response.json();
    return data;
  }

  const { data: chart, isLoading, isError, error } = useQuery({
    queryKey: ["chart"],
    queryFn: Fetch,
    queries:
    {
      staleTime: Infinity,
      refetchOnMount: false,
    }
  });

  useEffect(() => {
    if (chart) {
      const fetchAudioDurations = async () => {
        const durations = {};
        for (const type of chart) {
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
  }, [chart]);

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

  if (isError) {
    return <p style={{ color: "whitesmoke" }}>{error}</p>
  }
  if (isLoading || !chart) {
    return <p style={{ color: "whitesmoke" }}>Loading...</p>
  }

  return (
    <div className='topcharts'>
      <div className='topchartstext'>
        <span>Top Charts</span>
      </div>
      <div className='topchartslist'>
        {chart.map((type, id) => (
          <div className='chartslists' key={id} onClick={() => handleSongSelect(type)}>
            <div className='chartimg'><img src={type.img} alt={`${type.title} by ${type.name}`} /></div>
            <div className='chartname'><p>{type.title}<br />{type.name}</p></div>
            <div className='chartaudiolength'>{audioDurations[type.id] ? formatDuration(audioDurations[type.id]) : 'Loading...'}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Topcharts;
