import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Main from '../main/main.jsx';
import Offer from '../offer/offer.jsx';
import PropTypes from 'prop-types';
import React from 'react';
import {offerPropType, citiesPropTypes} from '../../types';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeOffer: null
    };

    this._handleMainCardTitleClick = this._handleMainCardTitleClick.bind(this);
  }

  _handleMainCardTitleClick(offer) {
    this.setState({
      activeOffer: offer
    });
  }

  _renderApp() {
    const {offers, cities} = this.props;
    if (this.state.activeOffer) {
      return (
        <Offer
          offer={this.state.activeOffer}
          offers={offers}
          cities={cities}
          onMainCardTitleClick = {this._handleMainCardTitleClick}
        />
      );
    } else {
      return (
        <Main
          offers={offers}
          cities={cities}
          onMainCardTitleClick = {this._handleMainCardTitleClick}
        />
      );
    }

  }

  render() {
    const {offers, cities} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-offer">
            <Offer
              offer={offers[0]}
              offers={offers}
              cities={cities}
              onMainCardTitleClick = {this._handleMainCardTitleClick}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  offers: PropTypes.arrayOf(offerPropType).isRequired,
  cities: citiesPropTypes
};

export default App;
