import {bool, oneOf, oneOfType, shape, string} from 'prop-types';
import React from 'react';
import Notifications, {notify} from 'react-notify-toast';
import {connect} from 'react-redux';
import {Router, Route, Switch} from 'react-router-dom';

import {getErrorStatus} from '../../reducers/data/selectors';
import {getActiveOffer} from '../../reducers/offers/selectors';
import {offerFullPropType} from '../../types';
import history from '../../history';

import Main from '../main/main.jsx';
import Offer from '../offer/offer.jsx';
import SignIn from '../sign-in/sign-in.jsx';

class App extends React.PureComponent {
  _renderApp() {
    const {activeOffer} = this.props;
    if (activeOffer) {
      return (
        <Offer
          offer={activeOffer}
        />
      );
    } else {
      return (
        <Main/>
      );
    }
  }

  render() {
    const {isError} = this.props;
    return (
      <Router history={history}>
        <Notifications />
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
            {isError.status ? notify.show(`${isError.message}`, `error`) : ``}
          </Route>
          <Route exact path="/login">
            <SignIn/>
          </Route>
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  activeOffer: oneOfType([offerFullPropType.isRequired, oneOf([null])]),
  isError: shape({
    status: bool.isRequired,
    message: string.isRequired
  }).isRequired
};

const mapStateToProps = (state) => ({
  activeOffer: getActiveOffer(state),
  isError: getErrorStatus(state)
});

export default connect(mapStateToProps, null)(App);
