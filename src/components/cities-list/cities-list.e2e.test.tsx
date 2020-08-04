import React from 'react';
import {render} from "react-dom";
import {MemoryRouter, Router} from 'react-router-dom';

import {createMemoryHistory} from "history";
import {act} from 'react-dom/test-utils';

import CitiesList from './cities-list';

describe(`CitiesList e2e`, () => {
  const root = document.createElement(`div`);
  document.body.appendChild(root);
  it(`Active city should have active class`, () => {
    render(
        <MemoryRouter>
          <CitiesList
            activeCityName={`Cologne`}
          />
        </MemoryRouter>,
        root
    );
    const goParis = document.querySelectorAll(`.locations__item-link`)[0];
    const goCologne = document.querySelectorAll(`.locations__item-link`)[1];

    expect(goParis.classList.contains(`tabs__item--active`)).toBe(false);
    expect(goCologne.classList.contains(`tabs__item--active`)).toBe(true);
  });

  it(`Click on city change location`, () => {
    const history = createMemoryHistory();
    render(
        <Router history={history}>
          <CitiesList
            activeCityName={`Cologne`}
          />
        </Router>,
        root
    );

    act(() => {
      const goParis = document.querySelectorAll(`.locations__item-link`)[0];
      goParis.dispatchEvent(new MouseEvent(`click`, {bubbles: true}));
    });

    expect(history.location.pathname).toBe(`/paris`);
  });
});
