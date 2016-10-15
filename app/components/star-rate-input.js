import Ember from 'ember';
import $ from 'jquery';

/**
* @name Star rate input
* @desc Star rating widget
*/
export default Ember.Component.extend({
  didInsertElement(){
      $("input[name=rating]:radio").on('focus', function(){
        $('#star-rating-cont').css({'border-bottom': '2px solid #007dba'});
      });

      $("input[name=rating]:radio").on('blur', function(){
        $('#star-rating-cont').css({'border-bottom': 'none'});
      });

      $("input[name=rating]:radio").bind( "change", function( /*event*/ ) {
      console.log('Lang: '+$(this).val());
      // Call function here
    });
  },

});
