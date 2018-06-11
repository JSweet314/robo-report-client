import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const ProgressMeter = ({ blockIndex, min, max }) => {
  return (
    <div className='complaint-progress'>
      <meter value={blockIndex} min={min} max={max}/>
    </div>
  );
};

ProgressMeter.propTypes = {
  blockIndex: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired
};

export default ProgressMeter;