import moment from 'moment';

export default (reviews) => {
  return reviews.map((review) => {
    return {
      id: review.id,
      user: {
        userName: review.user.name,
        avatar: review.user.avatar_url,
        id: review.user.id,
        isPro: review.user.is_pro
      },
      content: review.comment,
      rate: review.rating,
      date: moment(review.date).format(`MMMM YYYY`)
    };
  });
};
