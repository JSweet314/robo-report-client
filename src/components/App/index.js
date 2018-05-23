import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from '../Landing';
import './style.css';

class App extends Component {
  render() {
    const { userSignedIn } = this.props;
    return (
      <div>
        {/* <Header /> */}
        <Switch>
          <Route
            path="/"
            render={() => <Landing userSignedIn={userSignedIn} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
