import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import './styles.css';

const Header = ({ user, handleOAuthSignIn }) => {
  const authBtnText = user.id ? 'SIGN OUT' : 'SIGN IN';
  const myReportsBtnClassName = user.id
    ? 'header__link header__link--reports-button'
    : 'header__link hidden';
  return (
    <header className="header">
      <Link to="/">
        <h1 className="header__header">Robo Report</h1>
      </Link>
      <nav className="header__nav">
        <Link to="/" className="header__link header__link--home">
          HOME
        </Link>
        <NavLink to="/myReports" className={myReportsBtnClassName}>
          MY REPORTS
        </NavLink>
        <button
          className="header__link header__link--sign-in-btn"
          onClick={handleOAuthSignIn}
        >
          {authBtnText}
        </button>
      </nav>
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.object.isRequired,
  handleOAuthSignIn: PropTypes.func.isRequired
};

export default Header;
