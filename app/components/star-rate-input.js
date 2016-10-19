import Ember from 'ember';
import $ from 'jquery';

/**
* @name Star rate input
* @desc Star rating widget
*/
export default Ember.Component.extend({
  didInsertElement () {
    const $radionButtons = $('input[name=rating]:radio');
    const $fieldset = $('#star-rating-cont');

    $radionButtons.on('focus', function () {
      $fieldset.css({'border-bottom': '2px solid #007dba'});
    });

    $radionButtons.on('blur', function () {
      $fieldset.css({'border-bottom': 'none'});
    });

    $radionButtons.bind('change', function (/* event */) {
      console.log('Star: ' + $(this).val());
    // Call function here
    });
  }

});
