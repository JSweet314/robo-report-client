import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Landing from '../Landing';
import NewUserContainer from '../../containers/NewUserContainer';
import './style.css';

export class App extends Component {
  render() {
    const { isLoggedIn } = this.props;
    
    return (
      <div>
        {/* <Header /> */}
        <Switch>
          <Route
            path="/"
            render={() => <Landing isLoggedIn={isLoggedIn} />}
          />
        </Switch>
        <NewUserContainer />
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn
});

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, null)(App);