import Ember from 'ember';

export default Ember.Service.extend({

  initAutocomplete: function (elemenId) {
      // Create the autocomplete object, restricting the search to geographical
      // location types.
    if (elemenId) {
      let autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById(elemenId)),
            {types: ['geocode']});

      this.geolocate(autocomplete);
      this.set('autocomplete', autocomplete);
    }
  },

  geolocate: function (autocomplete) {
     // Bias the autocomplete object to the user's geographical location,
     // as supplied by the browser's 'navigator.geolocation' object.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        /* global google */
        var circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        autocomplete.setBounds(circle.getBounds());
      });
    }
  } // geolocate
});
