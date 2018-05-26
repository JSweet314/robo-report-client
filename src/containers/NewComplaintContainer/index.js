import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

export class NewComplaintContainer extends Component {
  render() {
    return (
      <div>

      </div>
    );
  }
}

NewComplaintContainer.propTypes = {
  user: PropTypes.object
};

export const mapStateToProps = ({ user }) => ({
  user
});

export default withRouter(
  connect(mapStateToProps, null)(NewComplaintContainer)
);