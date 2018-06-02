import React from 'react';

const ComplaintSubmitPrompt = () => {
  return (
    <div className='complaint-submit-prompt'>
      <p>
        Once you hit the <strong>Report It!</strong> button, the FCC form will pull up
        and your answers will appear. Just remember,
      </p>
      <ol>
        <li>
        Scoll through and review the form and make any edits you&#39;d
        like.
        </li>
        <li>Check the Captcha that you are not a robot (ironic, we know)</li>
        <li>Submit the form!</li>
      </ol>
      <p>
        Once finished, you should receive an email from the FCC confirming your 
        report. Check out the <strong>My Reports</strong> section to view past reports.
      </p>
    </div>
  );
};

export default ComplaintSubmitPrompt;