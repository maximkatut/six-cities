import {OfferTypes} from '../const';
import {LatLngExpression} from 'leaflet';

export interface offerTypes {
  appliences: string[];
  bedrooms: number;
  city: {
    name: string;
    coords: LatLngExpression;
    zoom: number
  };
  coordinates: LatLngExpression;
  description: string;
  guests: number;
  host: {
    avatar: string;
    id: number;
    name: string;
    super: boolean
  };
  id: number;
  imagesGallery: string[];
  isFavorite: boolean;
  mainImage: string;
  offerType: typeof OfferTypes;
  premium: boolean;
  price: number;
  rate: number;
  title: string;
  zoom: number;
}

export interface reviewTypes {
  id: number;
  user: {
    userName: string;
    avatar: string;
  };
  content: string;
  rate: number;
  date: string;
}
