import React from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';
import {offerFullPropType} from '../../types';
import {MapData} from '../../const.js';
import {connect} from 'react-redux';

class Map extends React.PureComponent {
  constructor(props) {
    super(props);
    this._divRef = React.createRef();
    this._activeCity = this._getActiveCity();
  }

  _getActiveCity() {
    const {cities, activeCityName} = this.props;
    return cities.find((city) => city.name === activeCityName);
  }

  componentDidUpdate(prevProps) {
    const {offers, cardIdOnHover, activeCityName, activeOffer, offersClosest} = this.props;

    if (prevProps.cardIdOnHover !== cardIdOnHover) {
      if (cardIdOnHover === -1) {
        this._markers.forEach((marker) => this._map.removeLayer(marker));
        if (activeOffer) {
          this._renderMapMarkersOnOffer(activeOffer, offersClosest, this._icon, this._map);
        } else {
          this._renderMapMarkers(offers, this._icon, this._map);
        }
      } else {
        const _activeOffer = offers.find((offer) => offer.id === cardIdOnHover);
        this._markers.forEach((marker) => this._map.removeLayer(marker));
        this._renderMapMarkersOnOffer(_activeOffer, offers, this._icon, this._map);
      }
    }

    if (prevProps.activeCityName !== activeCityName) {
      this._activeCity = this._getActiveCity();
      this._markers.forEach((marker) => this._map.removeLayer(marker));
      this._map.flyTo(this._activeCity.coords, MapData.MAP_ZOOM);
      this._renderMapMarkers(offers, this._icon, this._map);
    }

    if (prevProps.activeOffer !== activeOffer) {
      this._renderMapMarkersOnOffer(activeOffer, offers, this._icon, this._map);
    }
  }

  componentDidMount() {
    const {offers, activeOffer, offersClosest} = this.props;

    const mapContainer = this._divRef.current;
    const cityCoords = this._activeCity.coords;

    const zoom = MapData.MAP_ZOOM;
    const icon = this._icon = leaflet.icon({
      iconUrl: MapData.MAP_ICON_URL,
      iconSize: MapData.MAP_ICON_SIZE
    });
    this._activeIcon = leaflet.icon({
      iconUrl: MapData.MAP_ACTIVE_ICON_URL,
      iconSize: MapData.MAP_ICON_SIZE
    });

    const map = this._map = leaflet.map(mapContainer, {
      center: cityCoords,
      zoom,
      scrollWheelZoom: false,
      zoomControl: false,
      marker: true,
      layers: [
        leaflet.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
          attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
        })]
    });

    map.once(`focus`, () => {
      map.scrollWheelZoom.enable();
    });

    if (activeOffer) {
      this._renderMapMarkersOnOffer(activeOffer, offersClosest, this._icon, this._map);
    } else {
      this._renderMapMarkers(offers, icon, map);
    }
  }

  _renderMapMarkersOnOffer(activeOffer, offers, icon, map) {
    const offersWithoutActive = offers.filter((offer) => offer !== activeOffer);
    const marker = leaflet.marker(activeOffer.coordinates, {icon: this._activeIcon}).addTo(map);
    this._renderMapMarkers(offersWithoutActive, icon, map);
    this._markers.push(marker);
  }

  _renderMapMarkers(offers, icon, map) {
    const markers = [];
    offers.forEach((offer) => {
      const marker = leaflet.marker(offer.coordinates, {icon}).addTo(map);
      markers.push(marker);
    });
    this._markers = markers;
  }

  componentWillUnmount() {
    const mapContainer = this._divRef.current;
    mapContainer.remove();
  }

  render() {
    return (
      <div
        ref={this._divRef}
        style={{height: `100%`}}
      >
      </div>
    );
  }
}

Map.propTypes = {
  activeOffer: offerFullPropType,
  offers: PropTypes.arrayOf(offerFullPropType.isRequired).isRequired,
  offersClosest: PropTypes.arrayOf(offerFullPropType.isRequired),
  cities: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  activeCityName: PropTypes.string.isRequired,
  cardIdOnHover: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
  cities: state.offers.cities,
  activeCityName: state.offers.activeCityName,
  offers: state.offers.offers,
  cardIdOnHover: state.map.cardIdOnHover
});

export default connect(mapStateToProps, null)(Map);
