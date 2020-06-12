import React from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';

const App = (props) => {
  const {rentCount} = props;
  return <Main
    rentCount = {rentCount}
  />;
};

App.propTypes = {
  rentCount: PropTypes.number.isRequired
};

export default App;
