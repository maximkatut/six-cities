import React from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';

const handleMainCardTitleClick = () => {};

const App = (props) => {
  const {offerCards} = props;
  return <Main
    offerCards = {offerCards}
    onMainCardTitleClick = {handleMainCardTitleClick}
  />;
};

App.propTypes = {
  offerCards: PropTypes.array.isRequired
};

export default App;
