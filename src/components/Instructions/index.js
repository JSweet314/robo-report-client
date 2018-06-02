import React from 'react';
import { Link } from 'react-router-dom';
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
        Report will pull up the FCC form and complete it for you! <br /><br />
        To finish the process, all you will need to do is:
      </p>
      <ol>
        <li>
            Scoll through and review the form, making any edits as needed.
        </li>
        <li>Read and click the attest statement near the bottom.</li>
        <li>Check the Captcha that you are not a robot (ironic, we know)</li>
        <li>Submit the form!</li>
      </ol>
      <Link
        className='submit-new-complaint-btn'
        to="/newComplaint">
        Submit New Complaint
      </Link>
    </div>
  );
};

export default Instructions;