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
      welcomeDisplayed: true
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
  };

  filterFormValuesFromState = () => {
    const values = { ...this.state };

    delete values.welcomeDisplayed;

    return values;
  }

  render() {
    const { welcomeDisplayed } = this.state;
    const { isLoggedIn, error } = this.props;
    const values = this.filterFormValuesFromState();

    if (isLoggedIn) {
      return <Redirect to='/' />;
    }

    if (error) {
      return (
        <div>
          <h2>{error}</h2>
        </div>
      );
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

export const mapStateToProps = ({ isLoggedIn, error }) => ({
  isLoggedIn,
  error
});

NewUserContainer.propTypes = {
  submitNewUser: PropTypes.func.isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewUserContainer)
);
