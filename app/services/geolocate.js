import Ember from 'ember';

export default Ember.Service.extend({

  getCurrentLocation(){
    return navigator.geolocation.getCurrentPosition(this.successGeo, this.errorGeo, this.options);
  },

  successGeo(){
    console.log('got it');
  },

  errorGeo(){
    console.log('geo error');
  },

  options: {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0
  }
});
