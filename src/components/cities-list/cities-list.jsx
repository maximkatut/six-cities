import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../actions/offers-actions';

const CitiesList = (props) => {

  const {cities, onCityClick, activeCityName} = props;

  return (
    <ul className="locations__list tabs__list ">
      {cities.map((city, index) => {
        const activeClass = activeCityName === city.name ? `tabs__item--active` : ``;
        return (
          <li key={city.name + index} className="locations__item">
            <a
              className={`locations__item-link tabs__item ` + activeClass}
              href="#"
              onClick={() => {
                onCityClick(city.name);
              }}
            >
              <span>{city.name}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );

};

CitiesList.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  onCityClick: PropTypes.func.isRequired,
  activeCityName: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  activeCityName: state.activeCityName,
  cities: state.cities
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick(cityName) {
    dispatch(ActionCreator.changeCity(cityName));
    dispatch(ActionCreator.getOffers(cityName));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
