import App from './components/app/app.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import {offers} from './mocks/offers.js';

const init = () => {
  ReactDOM.render(
      <App
        offers = {offers}
      />,
      document.querySelector(`#root`)
  );
};

init();
