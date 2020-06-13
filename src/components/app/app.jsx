import React from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';

const App = (props) => {
  const {rentCount, rentNames} = props;
  return <Main
    rentCount = {rentCount}
    rentNames = {rentNames}
  />;
};

App.propTypes = {
  rentCount: PropTypes.number.isRequired,
  rentNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

export default App;
