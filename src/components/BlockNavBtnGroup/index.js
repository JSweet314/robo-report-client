import React from 'react';
import PropTypes from 'prop-types';

const BlockNavBtnGroup = ({ handleQuestionBlockNavigation }) => {
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
        className='question-block-nav-btn next-btn'
        name='next'
        onClick={event => handleQuestionBlockNavigation(event)}
      >
        Next
      </button>
    </div>
  );
};

BlockNavBtnGroup.propTypes = {
  handleQuestionBlockNavigation: PropTypes.func.isRequired
};

export default BlockNavBtnGroup;