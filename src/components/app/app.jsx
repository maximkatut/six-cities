import {bool, oneOf, oneOfType, shape, string} from 'prop-types';
import React from 'react';
import Notifications, {notify} from 'react-notify-toast';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {getErrorStatus} from '../../reducers/data/selectors';
import {getActiveOffer} from '../../reducers/offers/selectors';
import {getUserStatus} from '../../reducers/user/selectors';
import {offerFullPropType} from '../../types';

import Main from '../main/main.jsx';
import Offer from '../offer/offer.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import {AuthorizationStatus} from '../../reducers/user/user-reducer';

class App extends React.PureComponent {
  _renderApp() {
    const {activeOffer, userStatus} = this.props;
    if (userStatus === AuthorizationStatus.AUTH) {
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
    } else {
      return <SignIn/>;
    }
  }

  render() {
    const {isError} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login">
            <SignIn/>
          </Route>
          <Route exact path="/">
            <Notifications />
            {this._renderApp()}
            {isError.status ? notify.show(`${isError.message}`, `error`) : ``}
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  activeOffer: oneOfType([offerFullPropType.isRequired, oneOf([null])]),
  isError: shape({
    status: bool.isRequired,
    message: string.isRequired
  }).isRequired,
  userStatus: string.isRequired
};

const mapStateToProps = (state) => ({
  activeOffer: getActiveOffer(state),
  isError: getErrorStatus(state),
  userStatus: getUserStatus(state)
});

export default connect(mapStateToProps, null)(App);
