import {OfferTypes} from '../const.js';
import {shape, string, number, bool, arrayOf, oneOf} from 'prop-types';

export const offerPropType = shape({
  coordinates: arrayOf(number).isRequired,
  title: string.isRequired,
  offerType: oneOf(OfferTypes).isRequired,
  mainImage: string.isRequired,
  premium: bool.isRequired,
  price: number.isRequired,
  rate: number.isRequired
}).isRequired;

export const offerFullPropType = shape({
  appliences: arrayOf(string).isRequired,
  bedrooms: number.isRequired,
  city: shape({
    name: string.isRequired,
    coords: arrayOf(number).isRequired,
    zoom: number.isRequired
  }).isRequired,
  coordinates: arrayOf(number).isRequired,
  description: string.isRequired,
  guests: number.isRequired,
  host: shape({
    avatar: string.isRequired,
    id: number.isRequired,
    name: string.isRequired,
    super: bool.isRequired
  }).isRequired,
  id: number.isRequired,
  imagesGallery: arrayOf(string).isRequired,
  mainImage: string.isRequired,
  offerType: oneOf(OfferTypes).isRequired,
  premium: bool.isRequired,
  price: number.isRequired,
  rate: number.isRequired,
  title: string.isRequired,
  zoom: number.isRequired
});

export const reviewPropTypes = shape({
  id: number.isRequired,
  user: shape({
    userName: string.isRequired,
    avatar: string.isRequired
  }).isRequired,
  content: string.isRequired,
  rate: number.isRequired,
  date: string.isRequired
}).isRequired;
