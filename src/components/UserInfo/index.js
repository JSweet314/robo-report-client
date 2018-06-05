import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const UserInfo = ({ user, handleOAuthSignOut, toggleEdit }) => {
  return (
    <div className="user-info">
      <button
        className="user-info__button user-info__button--edit"
        onClick={toggleEdit}
      >
        Edit My Information
      </button>
      <p className="user-info__p">
        <strong>First Name: </strong>
        <span>{user.firstName}</span>
      </p>
      <p className="user-info__p">
        <strong>Last Name: </strong>
        <span>{user.lastName}</span>
      </p>
      <p className="user-info__p">
        <strong>Email: </strong>
        <span>{user.email}</span>
      </p>
      <p className="user-info__p">
        <strong>Phone: </strong>
        <span>{user.phone}</span>
      </p>
      <p className="user-info__p">
        <strong>Phone Type: </strong>
        <span>{user.phoneType}</span>
      </p>
      <p className="user-info__p">
        <strong>Phone Location: </strong>
        <span>{user.phoneLocation}</span>
      </p>
      <p className="user-info__p">
        <strong>Address: </strong>
        <span>{user.address}</span>
      </p>
      <p className="user-info__p">
        <strong>State: </strong>
        <span>{user.state}</span>
      </p>
      <p className="user-info__p">
        <strong>City: </strong>
        <span>{user.city}</span>
      </p>
      <p className="user-info__p">
        <strong>Zip Code: </strong>
        <span>{user.zipcode}</span>
      </p>
      <button className="user-info__button" onClick={handleOAuthSignOut}>
        Sign Out
      </button>
    </div>
  );
};

UserInfo.propTypes = {
  user: PropTypes.object.isRequired,
  handleOAuthSignOut: PropTypes.func.isRequired,
  toggleEdit: PropTypes.func.isRequired
};

export default UserInfo;
