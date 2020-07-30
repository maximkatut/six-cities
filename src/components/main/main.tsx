import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import withSortType from '../../hocs/with-sort-type/with-sort-type';

import {ActionCreator} from '../../actions/offers-actions';
import {getOffersBySortType, getStatusRequest} from '../../reducers/data/selectors';
import {getActiveCity} from '../../reducers/offers/selectors';
import {offerPropType} from '../../types';
import {Pages, Cities, AppRoute} from '../../const';
import {capitalize} from '../../utils';
import history from '../../history';

import CitiesList from '../cities-list/cities-list';
import Map from '../map/map';
import NoOffers from '../no-offers/no-offers';
import OffersList from '../offers-list/offers-list';
import SortMenu from '../sort-menu/sort-menu';
import Header from '../header/header';
import Spinner from '../spinner/spinner';

const SortMenuWrapped = withSortType(SortMenu);

class Main extends React.PureComponent {
  componentDidMount() {
    const {setActiveCity, match} = this.props;
    const city = match.params.city;

    if (city) {
      const capitalizedCity = capitalize(city);

      if (!Cities.includes(capitalizedCity)) {
        history.push(AppRoute.ROOT);
        return;
      }
      setActiveCity(capitalizedCity);
    }
  }

  componentDidUpdate(prevProps) {
    const {setActiveCity, match} = this.props;
    const city = match.params.city;
    if (prevProps.match.params.city !== city && city) {
      setActiveCity(capitalize(city));
    }
  }

  renderOffersList() {
    const {offers, activeCityName} = this.props;

    return (
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length} places to stay in {activeCityName}</b>
          <SortMenuWrapped />
          <OffersList
            offers={offers}
            page={Pages.MAIN}
          />
        </section>
        <div className="cities__right-section">
          <section className="cities__map map">
            <Map />
          </section>
        </div>
      </div>
    );
  }

  renderNoOffers() {
    const {activeCityName} = this.props;

    return (
      <NoOffers activeCityName={activeCityName} />
    );
  }

  render() {
    const {offers, isBusy, activeCityName} = this.props;
    const isOffers = offers.length > 0;

    return (
      <div className="page page--gray page--main">
        <Header />
        <main className={`page__main page__main--index ${isOffers ? `` : `page__main--index-empty`}`}>
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <CitiesList
                activeCityName={activeCityName}
              />
            </section>
          </div>
          <div className="cities">
            {{
              'true-false': this.renderOffersList(),
              'false-true': <Spinner />,
              'false-false': this.renderNoOffers(),
            }[`${isOffers}-${isBusy}`]}
          </div>
        </main>
      </div>
    );
  }
}

Main.propTypes = {
  offers: PropTypes.arrayOf(offerPropType).isRequired,
  activeCityName: PropTypes.string.isRequired,
  isBusy: PropTypes.bool.isRequired,
  setActiveCity: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      city: PropTypes.string
    })
  })
};

const mapStateToProps = (state) => ({
  offers: getOffersBySortType(state),
  activeCityName: getActiveCity(state),
  isBusy: getStatusRequest(state)
});

const mapDispatchToProps = (dispatch) => ({
  setActiveCity(cityName) {
    dispatch(ActionCreator.changeCity(cityName));
  }
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
