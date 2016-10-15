import Ember from 'ember';

/**
* @name Filter menu
* @desc Controls side menu filter widget
* @return Ember action
*/
export default Ember.Component.extend({
  price: "0",
  isChecked: true,
  didInsertElement(){
    this._super();
    /* global componentHandler */
    componentHandler.upgradeAllRegistered();
  },

  actions: {
    priceSelected(value){
      this.set('price', value);
    },

    // Send action to parent
    filterRestaurants(){
      this.sendAction('filterInit', {
        price: this.get('price'),
        isOpen: this.get('isChecked')
      });
    }

  }

});
