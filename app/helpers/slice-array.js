import Ember from 'ember';

/**
* @name Slice array
* @desc Slice array helper. Slices array from 0 index to passing value index
* @param { Array } params[0]
* @param { Number } params[1]
* @return array
*/
export function sliceArray (params/*, hash */) {
  return params[0].slice(0, params[1]);
}

export default Ember.Helper.helper(sliceArray);
