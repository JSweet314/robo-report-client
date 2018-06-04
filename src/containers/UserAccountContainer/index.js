import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NewUserForm from '../../components/NewUserForm';
import UserInfo from '../../components/UserInfo';
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
  updateUserInfo: PropTypes.func.isRequired
};

export const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, null)(UserAccountContainer);
