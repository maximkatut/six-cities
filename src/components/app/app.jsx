import {bool, oneOf, oneOfType, shape, string} from 'prop-types';
import React from 'react';
import Notifications, {notify} from 'react-notify-toast';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {getErrorStatus} from '../../reducers/data/selectors';
import {getActiveOffer} from '../../reducers/offers/selectors';
import {offerFullPropType} from '../../types';

import Main from '../main/main.jsx';
import Offer from '../offer/offer.jsx';

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
    const {activeOffer, isError} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Notifications />
            {this._renderApp()}
            {isError.status ? notify.show(`${isError.message}`, `error`) : ``}
          </Route>
          <Route exact path="/dev-offer">
            <Offer
              offer={activeOffer}
            />
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
  }).isRequired
};

const mapStateToProps = (state) => ({
  activeOffer: getActiveOffer(state),
  isError: getErrorStatus(state)
});

export default connect(mapStateToProps, null)(App);
