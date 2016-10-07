import Ember from 'ember';
import $ from 'jquery';

export default Ember.Controller.extend({
  geolocate: Ember.inject.service('geolocate'),
  restaurants: [],
  restaurantSelectList: null,
  queryParams: ['lat', 'lng'],
  categorySelected: null,

  init(){

    Ember.run.schedule('afterRender', ()=>{
      try {
        if(!this.get('model').response.venues.length){
          $('#nav-init').attr('disabled', 'disabled');
        }
      }
      catch(err){
        console.log(err);
      }
    });
  },

  modelHasChange: function(){
    try{
      if(this.get('model').response.venues.length) {

        let list = this.createCategoryList(this.get('model').response.venues);
        this.set('restaurantSelectList', list);
        this.requestRestaurants(0, 6);

      }
    }
    catch(err){
      console.log(err);
    }

  }.observes('model'),

  actions: {
    navInit(){
      $('#filter-menu').addClass('is-visible');
      $('#filter-menu').attr('aria-hidden', false);
      $('.mdl-layout__obfuscator').addClass('is-visible');
      this.lockBackground();
    },

    filterSelected(cateoryId){
      console.log(cateoryId);
      this.set('restaurants', []);
      this.set('categorySelected', cateoryId);
      this.requestRestaurants(0, 6, cateoryId);
    },

    loadMore(){
      //Set focus to last element before clicking to load more
      $('#venues').children().eq(-2).find('.thumb-link').focus();
      /*
        Includes loadMore button. Which is fine because we want to load venues
        from index + 1
      */
      const currentlyOnScreen = $('#venues').children().length;

      //Disable button if all restaurants loaded
      if(this.get('model').response.venues.length === currentlyOnScreen){
        $('.load-more-btn').attr('disabled', 'disabled');
      }
      //Load more
      this.requestRestaurants(currentlyOnScreen, 6, this.get('categorySelected'));
    },
  },//actions

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

  /**
  * @name Request restaurants
  * @desc Fetches restaurants based on option values
  * @param { Array } options
  */
  requestRestaurants(...params){

    this.set('loaderOn', true);
    const [indexStart, count, category] = params;

    // Build array of ids from all nearby restaurants saved in model
    let restaurantIds = [];
    let countMax = indexStart + count > this.model.response.venues.length ? this.model.response.venues.length : indexStart + count;

    if(category){
      let filteredByCategory = [];
      for(var j=0; j<this.model.response.venues.length; j++){
        if(this.model.response.venues[j].categories[0].id === category){
          filteredByCategory.push(this.model.response.venues[j].id);
        }
      }
      restaurantIds = filteredByCategory.slice(indexStart, count);
    } else {
      for(var i=indexStart; i<countMax; i++){
        restaurantIds.push(this.model.response.venues[i].id);
      }
    }

    console.log(restaurantIds);
    //Fetch restaurants sequentially
    restaurantIds.map(this.get('getRestaurantById'))
      .reduce((sequence, venuePromise)=>{
        return sequence.then(()=>{
          return venuePromise;
        }).then((resp)=>{
          this.restaurants.pushObject(resp);
        });
      }, Promise.resolve()).then(()=>{

        Ember.run.later(()=>{
          this.set('loaderOn', false);
        }, 500);

      });

  },

  /**
  * @name Lock Background
  * @desc Disallow use of TAB on page when side nav is open
  * @requires { trapTabKey }  function
  */
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

  /**
  * @name Trap TAB key
  * @desc Sets focus to first or last element based on current active element
  * @param { Object } event - checks for TAB or shift + TAB keyCode
  * @param { Array } first and last element
  */
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

  /**
  * @name Create Category List
  * @param { Object } object - all venues from nearby restaurants query search
  * @return unique list of all restaurant categories
  */
  createCategoryList(object){
    let list = [];
    object.forEach((venue)=>{
      list.pushObject({categoryName: venue.categories[0].shortName, categoryId: venue.categories[0].id });
    });
    return list.uniqBy('categoryName');
  }

});
