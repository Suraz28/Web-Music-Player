import React, { useEffect, useState } from 'react';
import { MdHome, MdRecentActors } from 'react-icons/md';
import { BsVinyl } from 'react-icons/bs';
import { IoMdMicrophone, IoIosAlbums, IoMdMusicalNote, IoMdCreate, IoMdAppstore } from 'react-icons/io';
import { FaHeartPulse } from 'react-icons/fa6';
import { Link, useLocation } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

import './Sidebar.css';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('explore');
  const location = useLocation();

  function redirectToAppStore() {
    window.open('https://www.apple.com/app-store/', '_blank');
  }

  useEffect(() => {
    // Set the active menu based on the current pathname
    const pathname = location.pathname.substring(1); // Remove the leading '/'
    setActiveMenu(pathname || 'explore');
  }, [location]);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };
  const isActiveCategory = (...categories) => {
    return categories.some(category => category === activeMenu);
  };

  return (
    <aside className={`sidebar ${isSidebarOpen ? '' : 'collapsed'}`}>
      <div className='menulogo'>
        <div className='logo' onClick={handleToggleSidebar}>
          <img src='./public/Logos/logo-no-background.png' alt='Logo' />
        </div>
        <nav className='sidebarcategory'>
          <div className='menu'>
            <h5  className={isActiveCategory('explore', "genres", "albums", "artists") ? 'active' : ''}>MENU</h5>
            <div className='menuitems'>
              <span className={activeMenu === 'explore' ? 'active' : ''} onClick={() => handleMenuClick('explore')}>
                <MdHome />Explore
              </span>
              <Link to="/genres" style={{textDecoration: "none", color: "inherit", cursor: "pointer"}}>
              <span className={activeMenu === 'genres' ? 'active' : ''} onClick={() => handleMenuClick('genres')}>
                <BsVinyl />Genres
              </span>
                </Link>
              {/* <span className={activeMenu === 'albums' ? 'active' : ''} onClick={() => handleMenuClick('albums')}>
                <IoIosAlbums />Albums
              </span> */}
              <Link to="/artists" style={{textDecoration: "none", color: "inherit", cursor: "pointer"}}>
              <span className={activeMenu === 'artists' ? 'active' : ''} onClick={() => handleMenuClick('artists')}>
                <IoMdMicrophone />Artists
              </span>
              </Link>
            </div>
          </div>
          <div className='library'>
            <h5 className={isActiveCategory('recents', 'collection', 'favourites', 'local') ? 'active' : ''}>LIBRARY</h5>
            <div className='menuitems'>
              {/* <span className={activeMenu === "recents" ? "active" : ""} onClick={() => handleMenuClick("recents")}><MdRecentActors />Recents</span>
              <span className={activeMenu === "collection" ? "active": ""} onClick={() => handleMenuClick("collection")}><IoIosAlbums />Collection</span> */}
              <Link to="/favourites" style={{textDecoration: "none", color: "inherit", cursor: "pointer"}}>
              <span className={activeMenu === "favourites" ? "active" : ""} onClick={() => handleMenuClick("favourites")}><FaHeartPulse />Favourites</span>
              </Link>
              <Link to="/local" style={{textDecoration: "none", color: "inherit", cursor: "pointer"}}>
              <span className={activeMenu === "local" ? "active" : ""} onClick={() => handleMenuClick("local")}><IoMdMusicalNote />Local</span>
              </Link>
            </div>
          </div>
          <div className='playlist'>
            <h5 className={isActiveCategory('createnew') ? 'active' : ''}>PLAYLIST</h5>
            <div className='menuitems'>
            <Link to="/playlist" style={{textDecoration: "none", color: "inherit", cursor: "pointer"}}>
              <span  className={activeMenu === "createnew" ? "active": ""} onClick={() => handleMenuClick("createnew")}><IoMdCreate />Manage Playlist</span>
            </Link>
            </div>
          </div>
        </nav>
      </div>
      <div className='appbutton'>
      <Link to="/userinfo" style={{textDecoration: "none", color: "inherit", cursor: "pointer"}}>
        <span className={activeMenu === 'usericon' ? 'active' : ''} onClick={() => handleMenuClick('usericon')}>
        <FaRegUserCircle className="usericon" style={{fontSize: "30px"}}/>
        </span>
        </Link>
        <button className='button appstore' onClick={redirectToAppStore}><IoMdAppstore style={{fontSize: "25px"}}/><br/>Soon in App Store</button>
      </div>
    </aside>
  );
};

export default Sidebar;
