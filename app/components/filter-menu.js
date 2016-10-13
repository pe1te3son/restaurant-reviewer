import Ember from 'ember';

/**
* @name Filter menu
* @desc Controls side menu filter widget
* @return Ember action
*/
export default Ember.Component.extend({
  selectedItem: null,
  didInsertElement(){
    this._super();
    /* global componentHandler */
    componentHandler.upgradeAllRegistered();
  },

  actions: {
    categorySelected(value){
      this.set('selectedItem', value);
    },

    // Send action to parent
    filterRestaurants(){
      if(this.get('selectedItem') === null){ return; }
      this.sendAction('filterInit', this.get('selectedItem'));
    }
  }

});
