export const MAX_COUNT_OFFER_IMAGES = 6;

export const MESSAGE_LENGTH = 49;

export const MAX_COUNT_REVIEWS = 10;

export const OfferTypes = [
  `Apartment`, `Room`, `House`, `Hotel`
];

export const Cities = [
  `Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`
];

// MAP CONSTS
export const MapData = {
  MAP_ICON_SIZE: [27, 39],
  MAP_ICON_URL: `/img/pin.svg`,
  MAP_ACTIVE_ICON_URL: `/img/pin-active.svg`
};

// SORTING
export const SortType = {
  POPULAR: `Popular`,
  LOW_HIGHT: `Price: low to high`,
  HIGHT_LOW: `Price: high to low`,
  TOP: `Top rated first`
};

export const AppRoute = {
  LOGIN: `/login`,
  FAVORITES: `/favorites`,
  OFFER: `/offer`,
  ROOT: `/`,
};

// PAGES
export const Pages = {
  MAIN: `MAIN_PAGE`,
  OFFER: `OFFER_PAGE`,
  FAVORITES: `FAVORITES_PAGE`
};

export const PlaceCardClasses = {
  MAIN_PAGE: `cities__place-`,
  OFFER_PAGE: `near-places__`,
  FAVORITES_PAGE: `favorites__`
};

export const ImageWrapperClasses = {
  MAIN_PAGE: `cities`,
  OFFER_PAGE: `near-places`,
  FAVORITES_PAGE: `favorites`
};

export const PlaceCardInfoClasses = {
  MAIN_PAGE: ``,
  OFFER_PAGE: ``,
  FAVORITES_PAGE: `favorites__card-info`
};

export const ImageSizes = {
  MAIN_PAGE: [260, 200],
  OFFER_PAGE: [260, 200],
  FAVORITES_PAGE: [150, 110]
};
