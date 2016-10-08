import Ember from 'ember';

/**
* @name Is Greater Than
* @desc Compare 2 values
* @param { Number } param[0] - true if greater than param[1]
* @param { Number } param[1]
* @return boolean
*/
export function isGreaterThan(params/*, hash*/) {

  if(!params) {
    console.error('[ isGreaterThan ]: requires two values');
    return;
  }
  if(params.length === 2){
    return params[0] > params[1];
  }
  console.error('[ isGreaterThan ]: takes two values');


}

export default Ember.Helper.helper(isGreaterThan);
