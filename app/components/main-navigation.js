import Ember from 'ember';

/* global componentHandler */
export default Ember.Component.extend({
  didInsertElement(){
    this._super();
    componentHandler.upgradeAllRegistered();
  },



});
