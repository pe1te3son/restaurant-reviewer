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
      /* global componentHandler*/
      componentHandler.upgradeAllRegistered();
      this.get('autocompleteSrv').initAutocomplete('current-location');
    },

    submitSearch(){
      const place = this.get('autocompleteSrv').place;
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      if(lat && lng){
        this.set('searchInput', null);
        this.transitionToRoute('search-results', {
            queryParams: {
              lat: place.geometry.location.lat(),
              lng:  place.geometry.location.lng()
            }
          });
      }
    },

    preventFormFromSubmiting(event){
      // Only submit button will submit a form
      event.preventDefault();
    }
  },//actions

});
