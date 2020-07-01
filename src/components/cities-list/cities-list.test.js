import CitiesList from './cities-list.jsx';
import React from 'react';
import {cities} from '../../test-data';
import renderer from 'react-test-renderer';

describe(`CitiesList`, () => {
  it(`CitiesList component should render correctly`, () => {
    const tree = renderer.create(
        <CitiesList
          cities={cities}
          onCityClick={() => { }}
          activeCityName={`Gomel`}
        />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
