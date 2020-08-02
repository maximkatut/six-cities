import leaflet, {Map as MapType, Icon, Marker, LatLngExpression} from 'leaflet';
import React from 'react';
import {connect} from 'react-redux';

import {MapData} from '../../const';
import {getOffersBySortType} from '../../reducers/data/selectors';
import {getCardIdOnHover} from '../../reducers/map/selectors';
import {getActiveCity} from '../../reducers/offers/selectors';
import {offerTypes} from '../../types';

interface Props {
  activeOffer?: offerTypes;
  offers: offerTypes[];
  offersClosest?: offerTypes[];
  activeCityName: string;
  cardIdOnHover: number;
}

class Map extends React.PureComponent<Props> {
  _divRef: React.RefObject<HTMLDivElement>;
  _activeCity: {
    name: string;
    coords: LatLngExpression;
    zoom: number;
  };
  _activeIcon: Icon;
  _icon: Icon;
  _map: MapType;
  _markers: Marker[];

  constructor(props) {
    super(props);
    this._divRef = React.createRef();
    this._activeCity = props.offers[0].city;
  }

  componentDidUpdate(prevProps) {
    const {offers, cardIdOnHover, activeCityName, activeOffer, offersClosest} = this.props;

    if (prevProps.offersClosest !== offersClosest) {
      this._removeAllMarkers();
      this._renderMapMarkersOnOffer(activeOffer, offersClosest);
    }

    if (prevProps.cardIdOnHover !== cardIdOnHover) {
      if (cardIdOnHover === -1) {
        this._removeAllMarkers();
        if (activeOffer) {
          this._renderMapMarkersOnOffer(activeOffer, offersClosest);
          this._map.flyTo(activeOffer.coordinates, activeOffer.zoom);
        } else {
          this._renderMapMarkers(offers);
        }
      } else {
        this._removeAllMarkers();
        if (activeOffer) {
          const _activeOffer = offersClosest.find((offer) => offer.id === cardIdOnHover);
          this._renderMapMarkersOnOffer(_activeOffer, offersClosest);
          this._addMarker(activeOffer, this._icon);
          this._map.flyTo(_activeOffer.coordinates, _activeOffer.zoom);
        } else {
          const _activeOffer = offers.find((offer) => offer.id === cardIdOnHover);
          this._renderMapMarkersOnOffer(_activeOffer, offers);
        }
      }
    }

    if (prevProps.activeCityName !== activeCityName) {
      this._activeCity = this.props.offers[0].city;
      this._removeAllMarkers();
      this._map.flyTo(this._activeCity.coords, this._activeCity.zoom);
      this._renderMapMarkers(offers);
    }

    if (prevProps.activeOffer !== activeOffer) {
      this._removeAllMarkers();
      this._renderMapMarkersOnOffer(activeOffer, offersClosest);
    }
  }

  componentDidMount() {
    const {offers, activeOffer, offersClosest} = this.props;

    const mapContainer = this._divRef.current;
    const cityCoords = this._activeCity.coords;

    const zoom = this._activeCity.zoom;

    this._icon = leaflet.icon({
      iconUrl: MapData.MAP_ICON_URL,
      iconSize: MapData.MAP_ICON_SIZE
    });
    this._activeIcon = leaflet.icon({
      iconUrl: MapData.MAP_ACTIVE_ICON_URL,
      iconSize: MapData.MAP_ICON_SIZE
    });

    this._map = leaflet.map(mapContainer, {
      center: cityCoords,
      zoom,
      scrollWheelZoom: false,
      zoomControl: false,
      layers: [
        leaflet.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
          attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
        })]
    });

    this._map.once(`focus`, () => {
      this._map.scrollWheelZoom.enable();
    });

    if (activeOffer) {
      this._renderMapMarkersOnOffer(activeOffer, offersClosest);
      this._map.setView(activeOffer.coordinates, activeOffer.zoom);
    } else {
      this._renderMapMarkers(offers);
    }
  }

  _renderMapMarkersOnOffer(activeOffer, offers) {
    const offersWithoutActive = offers.filter((offer) => offer !== activeOffer);
    this._renderMapMarkers(offersWithoutActive);
    this._addMarker(activeOffer, this._activeIcon);
  }

  _renderMapMarkers(offers, icon = this._icon) {
    this._markers = [];
    offers.forEach((offer) => {
      this._addMarker(offer, icon);
    });
  }

  _addMarker(offer, icon) {
    const marker = leaflet.marker(offer.coordinates, {icon}).addTo(this._map);
    marker.bindPopup(`<b>${offer.offerType}</b> <br/> Rate: <b>${offer.rate}</b> <br /> Price: <b>€${offer.price}</b>`);
    this._markers.push(marker);
  }

  _removeAllMarkers() {
    this._markers.forEach((marker) => this._map.removeLayer(marker));
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

const mapStateToProps = (state) => ({
  activeCityName: getActiveCity(state),
  offers: getOffersBySortType(state),
  cardIdOnHover: getCardIdOnHover(state)
});

export {Map};
export default connect(mapStateToProps, null)(Map);
