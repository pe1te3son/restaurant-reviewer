import Ember from 'ember';
import $ from 'jquery';
import { sliceArray } from 'restaurant-reviewer/helpers/slice-array';

/**
* @name Restaurant Comments / Reviews
* @desc Restaurant Comments Component
*/
export default Ember.Component.extend({
  currentComments: null,

  didReceiveAttrs(){
    // Show first five only
    this.set('currentComments', sliceArray([
      this.get('comments'),
      5
    ]));
  },

  actions: {
    /**
    * @name Load More Comments
    * @desc Loads Comments on click
    */
    loadMoreComments(){
      const currentlyOnScreen = $('#all-comments').children().length - 1;
      // Show loader
      this.sendAction('initLoader', true);

      this.set('currentComments', sliceArray([
        this.get('comments'),
        currentlyOnScreen + 15
      ]));

      Ember.run.later(()=>{
        // Hide loader
        this.sendAction('initLoader', false);
      }, 500);
    }
  }
});
