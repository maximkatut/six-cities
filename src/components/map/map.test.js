import Map from './map.jsx';
import React from 'react';
import {offers, cities} from '../../test-data';
import renderer from 'react-test-renderer';
// import leaflet from 'leaflet';

describe(`Map`, () => {
  it(`Map component should render correctly`, () => {
    const tree = renderer.create(
        <Map
          offers={offers}
          cities={cities}
        />,
        {createNodeMock: () => {
          return document.createElement(`div`);
        }})
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

