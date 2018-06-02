import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import './styles.css';

const Header = ({ user, handleOAuthSignIn }) => {
  const authBtnText = user.id ? 'Sign Out' : 'Sign In';
  const myReportsBtnClassName = user.id ? 'display' : 'hidden';
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
  user: PropTypes.object.isRequired,
  handleOAuthSignIn: PropTypes.func.isRequired
};

export default Header;
