import Ember from 'ember';

export function bestPhoto(params/*, hash*/) {
  return Ember.String.htmlSafe(`background: url('${params[0].prefix}400${params[0].suffix}')`);
}

export default Ember.Helper.helper(bestPhoto);
