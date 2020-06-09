import React from 'react';
import {Main} from './main.jsx';

export const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {rentCount} = props;
  return <Main
    rentCount = {rentCount}
  />;
};
