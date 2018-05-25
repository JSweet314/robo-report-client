import React from 'react';
import loadingGif from '../../assets/images/loading.gif';
import './style.css';

const Loading = () => {
  return (
    <div className='loading-div'>
      <img src={loadingGif} alt=""/>
    </div>
  );
};

export default Loading;