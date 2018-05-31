import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import './styles.css';

const Header = ({ isLoggedIn, handleOAuthSignIn }) => {
  const authBtnText = isLoggedIn ? 'Sign Out' : 'Sign In';
  const myReportsBtnClassName = isLoggedIn ? 'display' : 'hidden';
  return (
    <header>
      <Link to="/">
        <h1>Robo Report</h1>
      </Link>
      <nav>
        <Link to="/">Home</Link>
        <NavLink to="/myReports" className={myReportsBtnClassName}>
          My Reports
        </NavLink>
        <button className="sign-in--button" onClick={handleOAuthSignIn}>
          {authBtnText}
        </button>
      </nav>
    </header>
  );
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  handleOAuthSignIn: PropTypes.func.isRequired
};

export default Header;
