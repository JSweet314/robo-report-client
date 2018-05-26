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
import NewComplaintContainer from '../NewComplaintContainer';
import './style.css';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      isLoggedIn: false
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
        this.props.getSavedUserInfo(user.email);
        this.setState({ isLoggedIn: !this.state.isLoggedIn });
      }
      this.setState({ isLoading: !this.state.isLoading });
    });
  };

  handleOAuthSignIn = event => {
    event.preventDefault();
    const user = auth.currentUser;
    if (user) {
      auth.signOut();
      this.setState({
        isLoading: !this.state.isLoading,
        isLoggedIn: !this.state.isLoggedIn
      });
    } else {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithRedirect(provider);
    }
  };

  render() {
    const { isLoading, isLoggedIn } = this.state;

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
          <Route path="/newComplaint" component={NewComplaintContainer} />
        </Switch>
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  getSavedUserInfo: userEmail => dispatch(actions.getSavedUserInfo(userEmail))
});

export const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn
});

App.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  getSavedUserInfo: PropTypes.func.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
