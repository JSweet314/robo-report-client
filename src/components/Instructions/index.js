import React from 'react';
import './style.css';

const Instructions = () => {
  return (
    <div className="instructions">
      <h4 className='instructions__heading'>How it works:</h4>
      <p className='instructions__body'>
        When you choose to submit a new complaint, you will be taken through
        all of the questions needed to complete the report. The questions are
        taken directly from the FCC&#39;s complaint form for unwanted calls.
        Once you have completed all of the required parts of the form, Robo
        Report will pull up the FCC form and complete it for you! To finish
        the process, all you will need to do is:
        <ol>
          <li>
            Scoll through and review the form and make any edits you&#39;d
            like.
          </li>
          <li>Check the Captcha that you are not a robot (ironic, we know)</li>
          <li>Submit the form!</li>
        </ol>
      </p>
    </div>
  );
};

export default Instructions;