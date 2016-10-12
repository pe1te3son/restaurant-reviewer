import Ember from 'ember';

export function sliceArray(params/*, hash*/) {
  return params[0].slice(0, params[1]);
}

export default Ember.Helper.helper(sliceArray);
