import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Landing from '../Landing';
import './style.css';

class App extends Component {
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
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn
});

export default connect(mapStateToProps, null)(App);