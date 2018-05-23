import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const NewUserWelcome = ({ toggleWelcome }) => {
  return (
    <article className='new-user-welcome'>
      <h2>Welcome aboard!</h2>
      <p>
        In order to make reporting unwanted robocalls to the FCC easier, we
        need to collect some information that is included with every report.
      </p>
      <p>
        Required information can include legal name, address, phone number
        (of course), type of phone, etc.
      </p>
      <button onClick={() => toggleWelcome()}>Get Started!</button>
    </article>
  );
};

NewUserWelcome.propTypes = {
  toggleWelcome: PropTypes.func.isRequired
};

export default NewUserWelcome;