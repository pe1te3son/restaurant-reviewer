import Ember from 'ember';

export default Ember.Controller.extend({
  autocompleteSrv: Ember.inject.service('geolocate'),

  actions: {
    autocompleteFn(){
      this.get('autocompleteSrv').initAutocomplete('current-location');
    },

    submitSearch(event){
      event.preventDefault();
      const place = this.get('autocompleteSrv').getPlace();
      if(place){
        // this.transitionToRoute('search-results', {
        //   queryParams: {
        //     lat: `${place.geometry.location.lat()}_${ place.geometry.location.lng()}`
        //   }
        // });

        this.transitionToRoute('search-results', {
          queryParams: {
            lat: place.geometry.location.lat(),
            lng:  place.geometry.location.lng()
          }
        });
      } else {
        console.log('wrong');
      }
    }
  },//actions

});
