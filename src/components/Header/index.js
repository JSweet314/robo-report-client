import React, { Component } from 'react';
import firebase from '../../firebase';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './styles.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authButtonText: 'Sign In'
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user.metadata.creationTime === user.metadata.lastSignInTime) {
        return this.props.history.push('/welcomeNewUser', {
          name: user.displayName,
          email: user.email
        });
      } else {
        return this.props.history.push('/');
      }
    });
  }

  handleOAuthSignIn = event => {
    event.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithRedirect(provider);
  };

  render() {
    return (
      <header>
        <h1>Robo Report</h1>
        <button className="sign-in--button" onClick={this.handleOAuthSignIn}>
          Sign In
        </button>
      </header>
    );
  }
}

Header.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired
};

export default withRouter(Header);
