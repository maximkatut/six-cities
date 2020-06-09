import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './components/app.jsx';

const init = () => {
  const rentCount = 5;
  ReactDOM.render(
      <App
        rentCount = {rentCount}
      />,
      document.querySelector(`#root`)
  );
};

init();
