import Ember from 'ember';
import $ from 'jquery';

export default Ember.Controller.extend({
  autocompleteSrv: Ember.inject.service('geolocate'),
  showWarning: false,
  searchInput: null,

  init(){
    Ember.run.schedule('afterRender', ()=>{
      $('#current-location').focus();
    });
  },

  actions: {
    autocompleteFn(){
      this.get('autocompleteSrv').initAutocomplete('current-location');
    },

    submitSearch(event){
      event.preventDefault();
      const place = this.get('autocompleteSrv').getCurrentPlace();

      if(place && this.get('searchInput').length > 0){
        this.set('showWarning', false);
        this.transitionToRoute('search-results', {
          queryParams: {
            lat: place.geometry.location.lat(),
            lng:  place.geometry.location.lng()
          }
        });
      } else {
        this.set('showWarning', true);
        $('#current-location').focus();
      }
    },

    preventFormFromSubmiting(event){
      event.preventDefault();
    }
  },//actions

});
