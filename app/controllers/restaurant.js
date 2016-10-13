import Ember from 'ember';

/**
* @name Restaurant Controller
* @desc Restaurant page Controller
*/
export default Ember.Controller.extend({

  modelHasChange: function(){

    Ember.run.schedule('afterRender', ()=>{
      /* global componentHandler */
      // Upgrade mdl lite register
      componentHandler.upgradeAllRegistered();
    });

  }.observes('model'),

  actions: {
    goBack(){
      // Back button in header
      history.back();
    }
  }
});
