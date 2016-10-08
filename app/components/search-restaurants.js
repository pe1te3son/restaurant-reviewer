import Ember from 'ember';
import $ from 'jquery';

export default Ember.Component.extend({
  geolocateSRV: Ember.inject.service('geolocate'),
  tagName: 'input',
  attributeBindings: ['type', 'tabindex', 'placeholder', 'value'],

  focusIn: function(){
    /* global componentHandler */
    if(componentHandler){
      componentHandler.upgradeAllRegistered();
    }

    this.get('geolocateSRV').initAutocomplete(this.elementId);
    this.get('geolocateSRV').autocomplete.addListener('place_changed', ()=>{
      const place = this.get('geolocateSRV').autocomplete.getPlace();

      try {
        const placeLocation = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };

        this.sendAction('action', placeLocation);
        this.get('geolocateSRV').autocomplete.unbindAll();
      }
      catch(err){
        console.log(err);
      }
    });
  },

});
