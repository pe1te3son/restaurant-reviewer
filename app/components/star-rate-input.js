import Ember from 'ember';
import $ from 'jquery';

export default Ember.Component.extend({
  didInsertElement(){
      $("input[name=rating]:radio").bind( "change", function(event) {
      console.log('Lang: '+$(this).val());
      console.log(event);
      // Call function here
    });
  },

});
