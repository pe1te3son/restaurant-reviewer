import Ember from 'ember';

export default Ember.Controller.extend({

  modelHasChange: function(){

    Ember.run.schedule('afterRender', ()=>{
      /* global componentHandler */
      componentHandler.upgradeAllRegistered();
    });

  }.observes('model'),

  actions: {
    goBack(){
      history.back();
    }
  }
});
