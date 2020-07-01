import App from './components/app/app.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {offers} from './mocks/offers.js';
import {store} from './store';

ReactDOM.render(
    <Provider store={store}>
      <App
        offers={offers}
      />
    </Provider>,
    document.querySelector(`#root`)
);
