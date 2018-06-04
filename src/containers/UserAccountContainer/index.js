import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './styles.css';

export const UserAccountContainer = ({ user, handleOAuthSignOut }) => {
  return (
    <div className="user-account-container">
      <p className="user-account-container__p">
        <strong>First Name: </strong>
        {user.firstName}
      </p>
      <p className="user-account-container__p">
        <strong>Last Name: </strong>
        {user.lastName}
      </p>
      <p className="user-account-container__p">
        <strong>Email: </strong>
        {user.email}
      </p>
      <p className="user-account-container__p">
        <strong>phone: </strong>
        {user.phone}
      </p>
      <p className="user-account-container__p">
        <strong>Phone Type: </strong>
        {user.phoneType}
      </p>
      <p className="user-account-container__p">
        <strong>Phone Location: </strong>
        {user.phoneLocation}
      </p>
      <p className="user-account-container__p">
        <strong>Address: </strong>
        {user.address}
      </p>
      <p className="user-account-container__p">
        <strong>State: </strong>
        {user.state}
      </p>
      <p className="user-account-container__p">
        <strong>City: </strong>
        {user.city}
      </p>
      <p className="user-account-container__p">
        <strong>Zip Code: </strong>
        {user.zipcode}
      </p>
      <button className="user-account-container__button">
        Edit My Information
      </button>
      <button
        className="user-account-container__button"
        onClick={handleOAuthSignOut}
      >
        Sign Out
      </button>
    </div>
  );
};

UserAccountContainer.propTypes = {
  user: PropTypes.object.isRequired,
  handleOAuthSignOut: PropTypes.func.isRequired
};

export const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, null)(
  UserAccountContainer
);
