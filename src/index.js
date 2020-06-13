import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';

const init = () => {

  const data = {
    rentCount: 5,
    rentNames: [
      `Beautiful & luxurious apartment at great location`,
      `Wood and stone place`,
      `Nice, cozy, warm big bed apartment`,
      `Canal View Prinsengracht`,
      `Huge house with fireplace`
    ]
  };

  ReactDOM.render(
      <App
        rentCount = {data.rentCount}
        rentNames = {data.rentNames}
      />,
      document.querySelector(`#root`)
  );
};

init();
