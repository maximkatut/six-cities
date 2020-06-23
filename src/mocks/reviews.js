import nanoid from "nanoid";
import {getRandomNumber} from "../utils/random";

export const reviews = [
  {
    id: nanoid(),
    user: {
      userName: `Alex`,
      avatar: `img/avatar-max.jpg`
    },
    content: `A quiet cozy and picturesque that hides behind a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    rate: getRandomNumber(1, 5),
    date: new Date()
  },
  {
    id: nanoid(),
    user: {
      userName: `Angelina`,
      avatar: `img/avatar-angelina.jpg`
    },
    content: `An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`,
    rate: getRandomNumber(1, 5),
    date: new Date()
  }
];
