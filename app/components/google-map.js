import Ember from 'ember';
import $ from 'jquery';

/*global google*/
/*eslint no-unused-vars: "listener"*/
export default Ember.Component.extend({
  didReceiveAttrs(){
    this._super(...arguments);
  },

  didInsertElement(){
    const $mapEl = $('#google-map');
    const lat = this.get('lat');
    const lng = this.get('lng');
    const map = new google.maps.Map($mapEl[0], {
      zoom: 14,
      center: {
        lat,
        lng
      },
      disableDefaultUI: true
    });


    const listener = map.addListener('tilesloaded', () => {
      // $mapEl.find('a').attr('tabindex', 999);
      // google.maps.event.removeListener(listener)
      // const test = $('[tabindex]').parent('.gm-style');
      $mapEl.find('div[tabindex="0"]').attr('tabindex', "-1");
      google.maps.event.removeListener(listener);
    });
  }
});
