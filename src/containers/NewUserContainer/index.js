import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import NewUserWelcome from '../../components/NewUserWelcome';
import NewUserForm from '../../components/NewUserForm';
import './style.css';

export class NewUserContainer extends Component {
  constructor(props) {
    super(props);
    const { name, email } = props.location.state;
    const names = name.split(' ');
    const firstName = names[0];
    const lastName = names[names.length - 1];
    this.state = {
      email: email || '',
      phone: '',
      phoneType: '-',
      phoneLocation: '-',
      firstName: firstName || '',
      lastName: lastName || '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      welcomeDisplayed: true,
    };
  }

  toggleWelcome = () => {
    this.setState({ welcomeDisplayed: !this.state.welcomeDisplayed });
  };

  handleOnChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  handleOnSubmit = event => {
    event.preventDefault();
    const user = { ...this.state };
    delete user.welcomeDisplayed;
    this.props.submitNewUser(user);
  };

  render() {
    console.log(this.props);
    const { welcomeDisplayed } = this.state;
    return welcomeDisplayed ? (
      <NewUserWelcome toggleWelcome={this.toggleWelcome} />
    ) : (
      <NewUserForm
        values={this.state}
        handleOnSubmit={this.handleOnSubmit}
        handleOnChange={this.handleOnChange}
      />
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  submitNewUser: user => dispatch(actions.submitNewUser(user)),
});

NewUserContainer.propTypes = {
  submitNewUser: PropTypes.func.isRequired,
};

export default withRouter(connect(null, mapDispatchToProps)(NewUserContainer));
