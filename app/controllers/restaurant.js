import Ember from 'ember';

export default Ember.Controller.extend({
  init(){

  },

  modelHasChange: function(){

    Ember.run.schedule('afterRender', ()=>{
      /* global componentHandler */
      console.log(this.get('model'));
      componentHandler.upgradeAllRegistered();
    });


  }.observes('model'),
});
