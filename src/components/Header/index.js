import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import './styles.css';

const Header = ({ user, handleOAuthSignIn }) => {
  const myAccountNavLink = (
    <NavLink to="/myAccount" className="header__link">
      MY ACCOUNT
    </NavLink>
  );

  const signInButton = (
    <button
      className="header__link header__link--sign-in-btn"
      onClick={handleOAuthSignIn}
    >
      SIGN IN
    </button>
  );

  const myReportsNavLink = (
    <NavLink
      to="/myReports"
      className="header__link header__link--reports-button"
    >
      MY REPORTS
    </NavLink>
  );

  const accountButton = user.id ? myAccountNavLink : signInButton;

  const myReportsButton = user.id ? myReportsNavLink : null;
  return (
    <header className="header">
      <Link to="/">
        <h1 className="header__header">Robo Report</h1>
      </Link>
      <nav className="header__nav">
        <Link to="/" className="header__link header__link--home">
          HOME
        </Link>
        {myReportsButton}
        {accountButton}
      </nav>
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.object.isRequired,
  handleOAuthSignIn: PropTypes.func.isRequired
};

export default Header;
