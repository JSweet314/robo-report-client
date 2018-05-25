import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import * as actions from '../../actions';
import firebase from '../../firebase';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import Landing from '../../components/Landing';
import NewUserContainer from '../NewUserContainer';
import './style.css';

export class App extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        if (user.metadata.creationTime === user.metadata.lastSignInTime) {
          this.props.history.push('/welcomeNewUser', {
            name: user.displayName,
            email: user.email
          });
        } else {
          this.props.toggleUserStatus();
        }
      }
    });
  }

  handleOAuthSignIn = event => {
    event.preventDefault();
    const user = firebase.auth().currentUser;
    if (user) {
      firebase.auth().signOut();
      this.props.toggleUserStatus();
    } else {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    }
  };

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        <Header
          isLoggedIn={isLoggedIn}
          handleOAuthSignIn={this.handleOAuthSignIn}
        />
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

export const mapDispatchToProps = dispatch => ({
  toggleUserStatus: () => dispatch(actions.toggleUserStatus())
});

export const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn
});

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  toggleUserStatus: PropTypes.func.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
