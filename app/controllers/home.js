import Ember from 'ember';
import $ from 'jquery';

export default Ember.Controller.extend({
  restaurants: [],

  init(){


    Ember.run.schedule('afterRender', ()=>{


      let list = this.createCategoryList(this.get('model').response.venues);
      this.set('restaurantSelectList', list);

      Ember.run.later(()=>{
        //this.requestRestaurants(20, 6);
      }, 1500);

    });
  },

  actions: {
    navInit(){
      $('#filter-menu').addClass('is-visible');
      $('#filter-menu').attr('aria-hidden', false);
      $('.mdl-layout__obfuscator').addClass('is-visible');
      this.lockBackground();
    },

    filterSelected(e){
      console.log(e);
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
  },

  lockBackground(){
    if(!$('#filter-menu').hasClass('is-visible')){
      return;
    }
    const focusableElementString = 'select:not([disabled]), button:not([disabled]), [tabindex="0"], input:not([disabled]), a[href]';
    const backgroundActiveEl = document.activeElement;
    const sideNav = document.getElementById('category-filter');
    const focusableElements =  sideNav.querySelectorAll(focusableElementString);
    const firstEl = focusableElements[0];
    const lastEl = focusableElements[focusableElements.length - 1];

    firstEl.focus();
    sideNav.addEventListener('keydown', (event)=>{

      if(event.keyCode === 27) {
        return backgroundActiveEl.focus();
      }

      this.trapTabKey(event, firstEl, lastEl );
    });
  },

  trapTabKey(event, ...params){
    const [ firstEl, lastEl ] = params;

    if(event.keyCode === 9){
      if(event.shiftKey){
        if(document.activeElement === firstEl) {
          event.preventDefault();
          return lastEl.focus();
        }
      } else {
        if(document.activeElement === lastEl){
          event.preventDefault();
          return firstEl.focus();
        }
      }
    }
  },

  createCategoryList(object){
    let list = [];
    object.forEach((venue)=>{
      list.pushObject({categoryName: venue.categories[0].shortName, categoryId: venue.categories[0].id });
    });
    return list.uniqBy('categoryName');
  }

});
