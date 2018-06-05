import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import NewUserWelcome from '../../components/NewUserWelcome';
import NewUserForm from '../../components/NewUserForm';
import Loading from '../../components/Loading';
import './style.css';

export class NewUserContainer extends Component {
  constructor() {
    super();
    this.state = {
      values: {
        email: '',
        phone: '',
        phoneType: '-',
        phoneLocation: '-',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '-',
        zipcode: ''
      },
      welcomeDisplayed: true,
      isLoading: false
    };
  }

  componentDidMount() {
    this.captureRedirectedCredentials();
  }

  captureRedirectedCredentials = () => {
    const { state } = this.props.location;
    if (state) {
      const { name, email } = state;
      const names = name.split(' ');
      const firstName = names[0] || '';
      const lastName = names[names.length - 1] || '';
      const values = {
        ...this.state.values, 
        firstName,
        lastName,
        email
      };
      this.setState({ values, isLoading: false });
    }
  };

  toggleWelcome = () => {
    this.setState({ welcomeDisplayed: !this.state.welcomeDisplayed });
  };

  handleOnChange = event => {
    const { id, value } = event.target;
    const values = { ...this.state.values, [id]: value };
    this.setState({ values});
  };

  handleOnSubmit = event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    this.props.submitNewUser(this.state.values);
  };

  render() {
    const { welcomeDisplayed, isLoading, values } = this.state;
    const { user, error } = this.props;
    const isLoggedIn = user.id ? true : false;

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

    if (isLoading) {
      return <Loading />;
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

export const mapStateToProps = ({ user, error }) => ({
  user,
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
  user: PropTypes.object.isRequired,
  error: PropTypes.string
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewUserContainer)
);
