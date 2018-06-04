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
import UserComplaintsContainer from '../UserComplaintsContainer';
import UserAccountContainer from '../UserAccountContainer';
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
      if (this.props.user.id) {
        this.props.getUserComplaints(this.props.user.id);
      } else {
        this.props.captureDbComplaints([]);
      }
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
    const { user } = this.props;

    return isLoading ? (
      <Loading />
    ) : (
      <div className="app">
        <Header user={user} handleOAuthSignIn={this.handleOAuthSignIn} />
        <Switch>
          <Route exact path="/" render={() => <Landing user={user} />} />
          <Route path="/welcomeNewUser" component={NewUserContainer} />
          <Route path="/newComplaint" component={NewComplaintContainer} />
          <Route path="/myReports" component={UserComplaintsContainer} />
          <Route path="/myAccount" component={UserAccountContainer} />
        </Switch>
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  getSavedUserInfo: userEmail => dispatch(actions.getSavedUserInfo(userEmail)),
  captureUser: user => dispatch(actions.captureUser(user)),
  getUserComplaints: userId => dispatch(actions.getUserComplaints(userId)),
  captureDbComplaints: complaints =>
    dispatch(actions.captureDbComplaints(complaints))
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
  getUserComplaints: PropTypes.func.isRequired,
  captureDbComplaints: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
