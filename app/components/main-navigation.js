import Ember from 'ember';

/* global componentHandler */
export default Ember.Component.extend({
  selectedItem: null,
  didInsertElement(){
    this._super();
    componentHandler.upgradeAllRegistered();
  },

  actions: {
    categorySelected(value){
      this.set('selectedItem', value);
    },
    filterRestaurants(){
      if(this.get('selectedItem') === null){ return; }
      this.sendAction('filterInit', this.get('selectedItem'));
    }
  }

});
