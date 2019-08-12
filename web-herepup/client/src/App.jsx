import React from 'react';
import { Router, Route } from 'react-router-dom';
import { RoutesWithoutHeader, RoutesWithHeader } from './routes';
import { history } from './services/history';

class RouterSwitch extends React.Component {
  previousLocation = this.props.location;

  componentWillUpdate(nextProps) {
    this.previousLocation = this.props.location;
  }

  render() {
    const { location } = this.props;
    const signup = !!( location.pathname === '/signup' );
    const signin = !!( location.pathname === '/signin' );

    return (
      (signup || signin) ? RoutesWithoutHeader(location) : RoutesWithHeader(location)
    );
  }
}

class App extends React.Component {
  render() {
    return(
      <Router history={history}>
        <Route component={RouterSwitch} />
      </Router>
    );
  }
}

export default App;
