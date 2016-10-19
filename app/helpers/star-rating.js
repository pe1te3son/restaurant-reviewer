import Ember from 'ember';

/**
* @name Star rating
* @desc Converts Foursquare Api rating system into star rating system
* @return html safe string
*/
export function starRating (params/*, hash */) {
  const [rating] = params;

  let ratingEl = '';
  let currentRating = Math.round(rating / 2);
  for (var i = 0; i < 5; i++) {
    if (i >= currentRating) {
      ratingEl += '<i class="material-icons star-rate">star_rate</i>';
      continue;
    }
    ratingEl += '<i class="material-icons star-rate highlight">star_rate</i>';
  }
  return Ember.String.htmlSafe(ratingEl);
}

export default Ember.Helper.helper(starRating);
