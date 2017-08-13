import Ember from 'ember';
import $ from 'jquery';

/**
* @name Restaurant Controller
* @desc Restaurant page Controller
*/
export default Ember.Controller.extend({
  loaderOn: false,

  modelHasChange: function () {
    Ember.run.schedule('afterRender', () => {
      /* global componentHandler */
      // Upgrade mdl lite register
      componentHandler.upgradeAllRegistered();
    });
  }.observes('model'),

  actions: {
    goBack () {
      // Back button in header
      history.back();
    },

    initLoader (isLoaderOn) {
      // Turn Loader on or off
      this.set('loaderOn', isLoaderOn);
    }
  }
});
