import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Main from '../main/main.jsx';
import Offer from '../offer/offer.jsx';
import PropTypes from 'prop-types';
import React from 'react';

const handleMainCardTitleClick = () => {};

const App = (props) => {
  const {offerCards} = props;
  const renderApp = () => {
    return (
      <Main
        offerCards = {offerCards}
        onMainCardTitleClick = {handleMainCardTitleClick}
      />
    );
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {renderApp()}
        </Route>
        <Route exact path="/dev-offer">
          <Offer
            offerCard={offerCards[0]}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  offerCards: PropTypes.array.isRequired
};

export default App;
