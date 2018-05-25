import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import Landing from '../../components/Landing';
import NewUserContainer from '../NewUserContainer';
import './style.css';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      authButtonText: 'Sign In'
    };
  }

  // componentDidMount() {
  //   firebase.auth().onAuthStateChanged(user => {
  //     if (user.metadata.creationTime === user.metadata.lastSignInTime) {
  //       return this.props.history.push('/welcomeNewUser', {
  //         name: user.displayName,
  //         email: user.email
  //       });
  //     } else {
  //       return this.props.history.push('/');
  //     }
  //   });
  // }

  // handleOAuthSignIn = event => {
  //   event.preventDefault();
  //   const provider = new firebase.auth.GoogleAuthProvider();

  //   firebase.auth().signInWithRedirect(provider);
  // };

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Landing isLoggedIn={isLoggedIn} />}
          />
          <Route path="/welcomeNewUser" component={NewUserContainer} />
        </Switch>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn
});

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default withRouter(connect(mapStateToProps, null)(App));
