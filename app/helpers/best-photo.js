import Ember from 'ember';

/**
* @name Best Photo
* @desc Set background image
* @requires Foursquare Api
* @return css background: url()
*/
export function bestPhoto (params/*, hash */) {
  return Ember.String.htmlSafe(`background: url('${params[0].prefix}400${params[0].suffix}')`);
}

export default Ember.Helper.helper(bestPhoto);
