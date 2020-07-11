export default (reviews) => {
  const options = {
    month: `long`, year: `numeric`
  };

  return reviews.map((review) => {
    const date = new Date(review.date);
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
      date: new Intl.DateTimeFormat(`en-US`, options).format(date)
    };
  });
};
