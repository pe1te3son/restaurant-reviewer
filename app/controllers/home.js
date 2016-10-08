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
    },

    submitSearch(){
      const place = this.get('place');
      this.transitionToRoute('search-results', {
          queryParams: {
            lat: place.lat,
            lng:  place.lng
          }
        });
    },

    preventFormFromSubmiting(event){
      // Only submit button will submit a form
      event.preventDefault();
    }
  },//actions

});
