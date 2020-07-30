import React from 'react';
import renderer from 'react-test-renderer';

import CitiesList from './cities-list.jsx';

import {BrowserRouter} from 'react-router-dom';

describe(`CitiesList`, () => {
  it(`CitiesList component should render correctly`, () => {

    const component = renderer.create(
        <BrowserRouter>
          <CitiesList
            activeCityName={`Gomel`}
          />
        </BrowserRouter>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
