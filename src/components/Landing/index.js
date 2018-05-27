import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './styles.css';

const Landing = ({ isLoggedIn }) => {
  const landingDiv = isLoggedIn ? (
    <div className="landing">
      <h2>Welcome Back!</h2>
      <Link to="/newComplaint">
        Submit New Complaint
      </Link>
    </div>
  ) : (
    <div className="landing">
      <h2>Welcome to Robo Report!</h2>
      <p>
        Robo calls have become the primary incoming phone calls to our mobile
        devices. It&apos;s incredibly frustrating. However, the annoyance of
        fielding and blocking those calls has not superseded the annoyance of
        finding and filling out the FCC complaint form.<br />RoboReport is here
        to help. Create an account with our app, and it will auto-populate the
        FCC complaint form, greatly reducing the primary barrier to getting this
        complaint data to the FCC, and hopefully, spurring the FCC to take
        action to stop these incessant,unwanted calls.
      </p>
    </div>
  );

  return landingDiv;
};

Landing.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default Landing;
