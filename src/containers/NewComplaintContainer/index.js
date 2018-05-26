import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class NewComplaintContainer extends Component {
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

export default connect(mapStateToProps, null)(NewComplaintContainer);