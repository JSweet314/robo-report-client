import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const BlockNavBtnGroup = (
  { handleQuestionBlockNavigation, isNextBtnDisabled, blockIndex }
) => {
  let nextText = 'Next';
  if (blockIndex === 4) {
    nextText = 'Report It!';
  }
  if (blockIndex === 5) {
    nextText = 'Home';
  }

  return (
    <div className='question-block-nav-group'>
      <button
        className='question-block-nav-btn back-btn'
        name='back'
        onClick={event => handleQuestionBlockNavigation(event)}
      >
        Back
      </button>
      <button
        disabled={isNextBtnDisabled && blockIndex !== 4}
        className='question-block-nav-btn next-btn'
        name='next'
        onClick={event => handleQuestionBlockNavigation(event)}
      >
        { nextText }
      </button>
    </div>
  );
};

BlockNavBtnGroup.propTypes = {
  handleQuestionBlockNavigation: PropTypes.func.isRequired,
  isNextBtnDisabled: PropTypes.bool.isRequired,
  blockIndex: PropTypes.number.isRequired
};

export default BlockNavBtnGroup;