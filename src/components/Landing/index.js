import React from 'react';
import PropTypes from 'prop-types';
import Instructions from '../Instructions';
import './styles.css';

const Landing = ({ user }) => {
  const welcomeText = user.id ? `Welcome Back ${user.firstName}!` :
    'Welcome to Robo Report!';

  return (
    <div className="landing">
      <h2 className='landing__h2'>{welcomeText}</h2>
      {
        user.id ? <Instructions /> : (
          <div>
            <p className='landing__p'>
              Robo calls have become the primary incoming phone calls to our 
              mobile devices. It&apos;s incredibly frustrating. However, the 
              annoyance of fielding and blocking those calls has not superseded 
              the annoyance of finding and filling out the FCC complaint form.
            </p>
            <p className='landing__p'>
              RoboReport is here to help.<br /> Create an account with our app, 
              and it will auto-populate the FCC complaint form, greatly reducing
              the primary barrier to getting this complaint data to the FCC, and
              hopefully, spurring the FCC to take action to stop these
              incessant, unwanted calls.
            </p>
          </div>
        )
      }
    </div>
  );
};

Landing.propTypes = {
  user: PropTypes.object.isRequired
};

export default Landing;
