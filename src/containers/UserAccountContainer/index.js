import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import NewUserForm from '../../components/NewUserForm';
import UserInfo from '../../components/UserInfo';
import { updateUserInfo } from '../../actions';
import './styles.css';

export class UserAccountContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: this.props.user,
      isEditing: false
    };
  }

  handleOnChange = event => {
    const { id, value } = event.target;
    const userInfo = { ...this.state.userInfo, [id]: value };
    this.setState({ userInfo });
  };

  handleOnSubmit = event => {
    event.preventDefault();
    this.props.updateUserInfo(this.state.userInfo);
    this.toggleEdit();
  };

  toggleEdit = () => {
    this.setState({ isEditing: !this.state.isEditing });
  };

  render() {
    const { userInfo, isEditing } = this.state;
    return isEditing ? (
      <NewUserForm
        values={userInfo}
        handleOnSubmit={this.handleOnSubmit}
        handleOnChange={this.handleOnChange}
        pathname={this.props.location.pathname}
      />
    ) : (
      <UserInfo
        user={userInfo}
        toggleEdit={this.toggleEdit}
        handleOAuthSignOut={this.props.handleOAuthSignOut}
      />
    );
  }
}

UserAccountContainer.propTypes = {
  user: PropTypes.object.isRequired,
  handleOAuthSignOut: PropTypes.func.isRequired,
  updateUserInfo: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export const mapStateToProps = ({ user }) => ({
  user
});

export const mapDispatchToProps = dispatch => ({
  updateUserInfo: userInfo => dispatch(updateUserInfo(userInfo))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(
  UserAccountContainer
));
