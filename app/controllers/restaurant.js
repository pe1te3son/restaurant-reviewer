import Ember from 'ember';

export default Ember.Controller.extend({
  init(){
    Ember.run.schedule('afterRender', ()=>{
      console.log(this.get('model'));
    });
  }
});
