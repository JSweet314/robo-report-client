import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import * as actions from '../../actions';
import firebase, { auth } from '../../firebase';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import Landing from '../../components/Landing';
import NewUserContainer from '../NewUserContainer';
import Loading from '../../components/Loading';
import './style.css';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    this.checkRedirectCredentials();
    this.checkActiveUserSession();
  }

  checkRedirectCredentials = () => {
    auth.getRedirectResult().then(result => {
      if (result.user) {
        const { isNewUser } = result.additionalUserInfo;
        if (isNewUser) {
          this.props.history.push('/welcomeNewUser', {
            name: result.user.displayName,
            email: result.user.email
          });
        }
      }
    });
  };

  checkActiveUserSession = () => {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.props.toggleUserStatus();
      }
      this.setState({ isLoading: !this.state.isLoading });
    });
  };

  handleOAuthSignIn = event => {
    event.preventDefault();
    const user = auth.currentUser;
    if (user) {
      auth.signOut();
      this.props.toggleUserStatus();
      this.setState({ isLoading: !this.state.isLoading });
    } else {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithRedirect(provider);
    }
  };

  render() {
    const { isLoggedIn } = this.props;
    const { isLoading } = this.state;

    if (isLoading) {
      return <Loading />;
    }

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
