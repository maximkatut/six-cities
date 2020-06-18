import App from './components/app/app.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import {offerCards} from './mocks/offers.js';

const init = () => {
  ReactDOM.render(
      <App
        offerCards = {offerCards}
      />,
      document.querySelector(`#root`)
  );
};

init();
