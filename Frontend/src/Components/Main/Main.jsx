import React from 'react';
import "./Main.css";
import Maintop from "./MainTop/Maintop";
import Mainbottom from './Mainbottom/Mainbottom';

const Main = () => {
  return (
    <div className='main'>
        <Maintop/>
        <Mainbottom/>
    </div>
  )
}

export default Main;