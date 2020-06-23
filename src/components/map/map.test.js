import Map from './map.jsx';
import React from 'react';
import {offers} from '../../test-data';
import renderer from 'react-test-renderer';
// import leaflet from 'leaflet';

const cities = [{city: [52.38333, 4.9], name: `Gomel`}];

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

