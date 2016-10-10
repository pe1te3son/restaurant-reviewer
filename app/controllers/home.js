import Ember from 'ember';
import $ from 'jquery';

export default Ember.Controller.extend({
  autocompleteSrv: Ember.inject.service('geolocate'),
  showWarning: false,

  init(){
    Ember.run.schedule('afterRender', ()=>{
      $('#current-location').focus();
    });
  },

  actions: {
    placeFound(latLng){
      this.set('place', latLng);
      this.transitionToRoute('search-results', {
          queryParams: {
            lat: latLng.lat,
            lng:  latLng.lng
          }
        });
    },

    submitSearch(){
      if(typeof this.get('place') === 'undefined') { return; }

      const place = this.get('place');
      this.transitionToRoute('search-results', {
          queryParams: {
            lat: place.lat,
            lng:  place.lng
          }
        });
    },
  },//actions

});
