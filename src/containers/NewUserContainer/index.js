import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import NewUserWelcome from '../../components/NewUserWelcome';
import NewUserForm from '../../components/NewUserForm';
import './style.css';

export class NewUserContainer extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      phone: '',
      phoneType: '-',
      phoneLocation: '-',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      welcomeDisplayed: true,
      formCompleted: false
    };
  }

  componentDidMount() {
    this.captureRedirectedCredentials();
  }

  captureRedirectedCredentials = () => {
    const { state } = this.props.location;
    if (state.name && state.email) {
      const { name, email } = state;
      const names = name.split(' ');
      const firstName = names[0];
      const lastName = names[names.length - 1];
      this.setState({
        firstName,
        lastName,
        email
      });
    }
  };

  toggleWelcome = () => {
    this.setState({ welcomeDisplayed: !this.state.welcomeDisplayed });
  };

  handleOnChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  handleOnSubmit = event => {
    event.preventDefault();
    const user = this.filterFormValuesFromState();
    this.props.submitNewUser(user);
    this.setState({ formCompleted: true });
  };

  filterFormValuesFromState = () => {
    const values = { ...this.state };

    delete values.welcomeDisplayed;
    delete values.formCompleted;

    return values;
  }

  render() {
    const { welcomeDisplayed, formCompleted } = this.state;
    const values = this.filterFormValuesFromState();

    if (formCompleted) {
      return <Redirect to='/' />;
    }

    return welcomeDisplayed ? (
      <NewUserWelcome toggleWelcome={this.toggleWelcome} />
    ) : (
      <NewUserForm
        values={values}
        handleOnSubmit={this.handleOnSubmit}
        handleOnChange={this.handleOnChange}
      />
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  submitNewUser: user => dispatch(actions.submitNewUser(user))
});

NewUserContainer.propTypes = {
  submitNewUser: PropTypes.func.isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default withRouter(connect(null, mapDispatchToProps)(NewUserContainer));
