import Ember from 'ember';
import $ from 'jquery';

export default Ember.Controller.extend({
  restaurants: [],

  init(){
    Ember.run.schedule('afterRender', ()=>{
      Ember.run.later(()=>{
        //this.requestRestaurants(20, 6);
      }, 1500);

    });
  },

  actions: {
    navInit(){
      $('#main-custom-nav').addClass('is-visible');
      $('#main-custom-nav').attr('aria-hidden', false);
      $('.mdl-layout__obfuscator').addClass('is-visible');
    }
  },
  /**
  * @name Get restaurant by id
  * @param { String } id - restaurant id
  * @return promise
  */
  getRestaurantById(id) {

    let url = `https://api.foursquare.com/v2/venues/${id}?client_id=QII04JY4W2DNZNZPK4NXK4R1N3HUE4SD2OWT1FAPZIOAZJMY&client_secret=CBVRYTV2JXJXQJWFD51RY0UJ51SAMAFEPZLJZWGMRD3LQKF4&v=20160929`;
    return fetch(url).then((response)=>{
      return response.json();
    });
  },
  requestRestaurants(...params){
    const [indexStart, count] = params;
    let restaurantIds = [];

    let countMax = indexStart + count > this.model.response.venues.length ? this.model.response.venues.length : indexStart + count;
    for(var i=indexStart; i<countMax; i++){
      restaurantIds.push(this.model.response.venues[i].id);
    }

    restaurantIds.map(this.get('getRestaurantById'))
      .reduce((sequence, venuePromise)=>{
        return sequence.then(()=>{
          return venuePromise;
        }).then((resp)=>{
          this.restaurants.pushObject(resp);
        });
      }, Promise.resolve());
  }

});
