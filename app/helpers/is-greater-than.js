import Ember from 'ember';

/**
* @name Is Greater Than
* @desc Compare array length to choosen value
* @param { Array } param[0]
* @param { Number } param[1]
* @return boolean
*/
export function isGreaterThan(params/*, hash*/) {
  if(params[0]){
    return params[0].length > params[1];
  }
  return false;

}

export default Ember.Helper.helper(isGreaterThan);
