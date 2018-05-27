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
      isLoading: false
    };
  }

  componentDidMount() {
    this.checkRedirectCredentials();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.id !== this.props.user.id) {
      this.setState({ isLoading: false });
    }
  }

  checkRedirectCredentials = () => {
    this.setState({ isLoading: true });
    auth.getRedirectResult().then(result => {
      if (result.user) {
        this.setState({ isLoading: false });
        const { isNewUser } = result.additionalUserInfo;
        if (isNewUser) {
          this.props.history.push('/welcomeNewUser', {
            name: result.user.displayName,
            email: result.user.email
          });
        } else {
          this.setState({ isLoading: true });
          this.props.getSavedUserInfo(result.user.email);
        }
      } else {
        this.checkActiveUserSession();
      }
    });
  };

  checkActiveUserSession = () => {
    const user = auth.currentUser;
    if (user) {
      this.props.getSavedUserInfo(user.email);
    } else {
      this.setState({ isLoading: false });
    }
  };

  handleOAuthSignIn = event => {
    event.preventDefault();
    const user = auth.currentUser;
    if (user) {
      auth.signOut();
      this.props.captureUser({});
    } else {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithRedirect(provider);
    }
  };

  render() {
    const { isLoading } = this.state;
    const isLoggedIn = this.props.user.id ? true : false;

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
  getSavedUserInfo: userEmail => dispatch(actions.getSavedUserInfo(userEmail)),
  captureUser: user => dispatch(actions.captureUser(user))
});

export const mapStateToProps = state => ({
  user: state.user
});

App.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  getSavedUserInfo: PropTypes.func.isRequired,
  captureUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
