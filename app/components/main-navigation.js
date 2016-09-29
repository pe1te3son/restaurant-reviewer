import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'nav',
  classNames: ['mdl-navigation'],

  didInsertElement(){
    this._super();
    componentHandler.upgradeAllRegistered();
  }
});
