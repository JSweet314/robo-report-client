import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions';

/* eslint-disable no-unused-vars */
export const UserAccountContainer = props => {
  return <div>UserAccountContainer</div>;
};

UserAccountContainer.propTypes = {
  user: PropTypes.object.isRequired,
  captureUser: PropTypes.func.isRequired
};

export const mapStateToProps = state => ({
  user: state.user
});

export const mapDispatchToProps = dispatch => ({
  captureUser: user => dispatch(actions.captureUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  UserAccountContainer
);
