export const offers = [
  {
    appliences: [`Wi-Fi`, `Microwave`],
    bedrooms: 3,
    city: {
      name: `Moscow`,
      coords: [3, 4],
      zoom: 1
    },
    coordinates: [52.3809553943508, 4.939309666406198],
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century. An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`,
    guests: 2,
    host: {
      id: 1,
      avatar: `img/avatar-angelina.jpg`,
      name: `Max`,
      super: true
    },
    id: 1,
    isFavorite: true,
    imagesGallery: [
      `img/apartment-01.jpg`,
      `img/apartment-02.jpg`,
      `img/apartment-03.jpg`,
      `img/room.jpg`
    ],
    mainImage: `img/apartment-01.jpg`,
    offerType: `House`,
    premium: true,
    price: 200,
    rate: 5,
    title: `Nice, cozy, warm big bed house`,
    zoom: 1
  },
  {
    appliences: [`Wi-Fi`, `Microwave`],
    bedrooms: 4,
    city: {
      name: `Gomel`,
      coords: [1, 2],
      zoom: 1
    },
    coordinates: [52.3809553943508, 4.939309666406198],
    description: `An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`,
    guests: 3,
    host: {
      id: 2,
      avatar: `img/avatar-max.jpg`,
      name: `Anton`,
      super: false
    },
    id: 2,
    imagesGallery: [
      `img/apartment-01.jpg`,
      `img/apartment-03.jpg`,
      `img/room.jpg`
    ],
    mainImage: `img/apartment-02.jpg`,
    offerType: `Apartment`,
    premium: true,
    price: 300,
    rate: 4,
    title: `Nice, cozy, warm big bed apartment`,
    zoom: 1
  }
];

export const cities = [{coords: [52.38333, 4.9], name: `Gomel`}];

export const reviews = [
  {
    id: 0,
    user: {
      userName: `Max`,
      avatar: `img/avatar-max.jpg`
    },
    content: `A quiet cozy and picturesque that hides behind a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    rate: 4,
    date: `new Date()`
  },
  {
    id: 1,
    user: {
      userName: `Alex`,
      avatar: `img/avatar-max.jpg`
    },
    content: `A quiet cozy and picturesque that hides behind a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    rate: 3,
    date: `new Date()`
  }
];

export const offersFromRequest = [JSON.parse(`{
  "bedrooms": 3,
  "city": {
    "location": {
      "latitude": 52.370216,
      "longitude": 4.895168,
      "zoom": 10
    },
    "name": "Amsterdam"
  },
  "description": "A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.",
  "goods": ["Heating", "Kitchen", "Cable TV", "Washing machine", "Coffee machine", "Dishwasher"],
  "host": {
    "avatar_url": "img/1.png",
    "id": 3,
    "is_pro": true,
    "name": "Angelina"
  },
  "id": 1,
  "images": ["img/1.png", "img/2.png"],
  "is_favorite": false,
  "is_premium": false,
  "location": {
    "latitude": 52.35514938496378,
    "longitude": 4.673877537499948,
    "zoom": 8
  },
  "max_adults": 4,
  "preview_image": "img/1.png",
  "price": 120,
  "rating": 4.8,
  "title": "Beautiful & luxurious studio at great location",
  "type": "apartment"
}`)];

export const reviewsFromRequest = [JSON.parse(`{
  "comment": "A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.",
  "date": "2019-05-08T14:13:56.569Z",
  "id": 1,
  "rating": 4,
  "user": {
    "avatar_url": "img/1.png",
    "id": 4,
    "is_pro": false,
    "name": "Max"
  }
}`)];
