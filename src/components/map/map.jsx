import React from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';
import {offerPropType, citiesPropTypes} from '../../types';
import {MAP_ZOOM, MAP_ICON_SIZE, MAP_ICON_URL} from '../../const.js';

class Map extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeCity: 0
    };
    this._divRef = React.createRef();
  }

  componentDidMount() {
    const {offers, cities} = this.props;

    const mapContainer = this._divRef.current;

    const cityCoords = cities[this.state.activeCity].city;
    const zoom = MAP_ZOOM;
    const icon = leaflet.icon({
      iconUrl: MAP_ICON_URL,
      iconSize: MAP_ICON_SIZE
    });

    const map = leaflet.map(mapContainer, {
      center: cityCoords,
      zoom,
      zoomControl: false,
      marker: true,
      layers: [
        leaflet.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
          attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
        })]
    });
    offers.forEach((offer) => {
      leaflet.marker(offer.coordinates, {icon}).addTo(map);
    });
  }

  componentWillUnmount() {
    const mapContainer = this._divRef.current;
    mapContainer.remove();
  }

  render() {
    return (
      <section className="cities__map map"
        ref={this._divRef}
      >
      </section>
    );
  }
}

Map.propTypes = {
  offers: PropTypes.arrayOf(offerPropType).isRequired,
  cities: citiesPropTypes
};

export default Map;
