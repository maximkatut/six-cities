export const offers = [
  {
    appliences: [`Wi-Fi`, `Microwave`],
    bedrooms: 3,
    city: {
      name: `Moscow`,
      coords: [3, 4]
    },
    coordinates: [52.3809553943508, 4.939309666406198],
    description: [`A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`, `An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`],
    guests: 2,
    host: {
      avatar: `img/avatar-angelina.jpg`,
      name: `Max`,
      super: true
    },
    id: 1,
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
    reviews: [
      {
        id: `0`,
        user: {
          userName: `Max`,
          avatar: `img/avatar-max.jpg`
        },
        content: `A quiet cozy and picturesque that hides behind a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
        rate: 4,
        date: `new Date()`
      }
    ],
    title: `Nice, cozy, warm big bed house`
  },
  {
    appliences: [`Wi-Fi`, `Microwave`],
    bedrooms: 4,
    city: {
      name: `Gomel`,
      coords: [1, 2]
    },
    coordinates: [52.3809553943508, 4.939309666406198],
    description: [`An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`],
    guests: 3,
    host: {
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
    reviews: [
      {
        id: `1`,
        user: {
          userName: `Alex`,
          avatar: `img/avatar-max.jpg`
        },
        content: `A quiet cozy and picturesque that hides behind a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
        rate: 3,
        date: `new Date()`
      }
    ],
    title: `Nice, cozy, warm big bed apartment`
  }
];

export const cities = [{coords: [52.38333, 4.9], name: `Gomel`}];
