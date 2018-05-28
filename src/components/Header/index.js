import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './styles.css';

const Header = ({ isLoggedIn, handleOAuthSignIn }) => {
  const authBtnText = isLoggedIn ? 'Sign Out' : 'Sign In';

  return (
    <header>
      <h1>Robo Report</h1>
      <NavLink to="/myReports">My Reports</NavLink>
      <button className="sign-in--button" onClick={handleOAuthSignIn}>
        {authBtnText}
      </button>
    </header>
  );
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  handleOAuthSignIn: PropTypes.func.isRequired
};

export default Header;
