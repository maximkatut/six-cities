import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {offerPropType} from '../../types';
import Main from '../main/main.jsx';
import Offer from '../offer/offer.jsx';

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
    if (this.state.activeOffer) {
      return (
        <Offer
          offer={this.state.activeOffer}
          onMainCardTitleClick = {this._handleMainCardTitleClick}
        />
      );
    } else {
      return (
        <Main
          onMainCardTitleClick = {this._handleMainCardTitleClick}
        />
      );
    }

  }

  render() {
    const {offers} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-offer">
            <Offer
              offer={offers[0]}
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
};

const mapStateToProps = (state) => ({
  offers: state.offers
});

export default connect(mapStateToProps, null)(App);
