import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {offerFullPropType} from '../../types';
import Main from '../main/main.jsx';
import Offer from '../offer/offer.jsx';
import {oneOfType, oneOf} from 'prop-types';
import {getActiveOffer} from '../../reducers/offers/selectors';

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
    const {activeOffer} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
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
  activeOffer: oneOfType([offerFullPropType.isRequired, oneOf([null])])
};

const mapStateToProps = (state) => ({
  activeOffer: getActiveOffer(state)
});

export default connect(mapStateToProps, null)(App);
