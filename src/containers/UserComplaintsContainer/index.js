import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const UserComplaintsContainer = () => {
  return (
    <div>
      UserComplaintsContainer
    </div>
  );
};

UserComplaintsContainer.propTypes = {
  complaints: PropTypes.array.isRequired
};

export const mapStateToProps = state => ({
  complaints: state.complaints
});

export default connect(mapStateToProps)(UserComplaintsContainer);