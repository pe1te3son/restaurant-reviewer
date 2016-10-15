import Ember from 'ember';
import $ from 'jquery';

/**
* @name Search Result Controller
* @desc Search Result page Controller
* @param { Query } queryParams - lat and lng from trasition
*/
export default Ember.Controller.extend({
  geolocate: Ember.inject.service('geolocate'),
  requestLink: Ember.inject.service('build-requestlink'),
  restaurants: [],
  restaurantSelectList: null,
  queryParams: ['lat', 'lng'],
  filterActive: false,
  filteredRestaurants: null,

  init(){
    Ember.run.schedule('afterRender', ()=>{
      console.log(this.get('model'));
      try {
        if(!this.get('model').venues.length){
          // Disable filter menu if no restaurants on page
          $('#nav-init').attr('disabled', 'disabled');
        }
      }
      catch(err){
        console.error(err);
      }
    });
  },

  /**
  * @name Model listener
  * @desc Each time model has been changed rerender displayed restaurants
  */
  modelHasChange: function(){
    this.set('restaurants', []);
    try{
      if(this.get('model').venues.length) {

        let list = this.createCategoryList(this.get('model').venues);
        this.set('restaurantSelectList', list);
        // Request first 6 restaurants
        this.requestRestaurants(0, 10);

      }
    }
    catch(err){
      console.log(err);
    }

  }.observes('model'),

  actions: {

    /**
    * @name Place found
    * @desc If triggered it reloads current view with new values. Recevies
    * params from input with with Google autocomplete Api
    * @param { Object } latLng - object with lattitude and longtitude
    */
    placeFound(latLng){
      $('#fixed-header-drawer-exp').val('');
      $('#fixed-header-drawer-exp').blur();
      this.transitionToRoute('search-results', {
          queryParams: {
            lat: latLng.lat,
            lng:  latLng.lng
          }
      });

      const link = this.get('requestLink').build(latLng.lat, latLng.lng);
      // Fetch restaurants nearby
      return fetch(link).then((response)=>{
        return response.json();
      })
      .then((respJson)=>{
        this.disableLoadMoreButton(false);
        // Reset model with new restaurants
        this.set('model', respJson);

        return;
      })
      .fail(()=>{
        this.disableLoadMoreButton(true);
      });

    },

    navInit(){
      $('#filter-menu').addClass('is-visible');
      $('#filter-menu').attr('aria-hidden', false);
      $('.mdl-layout__obfuscator').addClass('is-visible');
      this.lockBackground();
    },

    /**
    * @name Filter Selected
    * @desc Filters restaurants by category each time new category selected
    * @param { String } categoryId - category id
    */
    filterSelected(categoryId){
      if(this.get('categoryId') === categoryId) { return; }

      this.disableLoadMoreButton(false);
      this.set('categoryId', categoryId);
      if(!categoryId.length){
        this.set('restaurants', []);
        this.set('filterActive', false);
        this.requestRestaurants(0, 10);
        return;
      }
      let filteredByCategory = [];
      // Create category list with restaurant ids
      for(var j=0; j<this.model.response.venues.length; j++){
        if(this.model.response.venues[j].categories[0].id === categoryId){
          filteredByCategory.push(this.model.response.venues[j].id);
        }
      }

      this.set('filteredRestaurants', filteredByCategory);
      // Clear view
      this.set('restaurants', []);
      // Set filter active
      this.set('filterActive', true);
      // Unlock load more button
      this.disableLoadMoreButton(false);
      // Fetch first 6 from category list
      this.requestRestaurants(0, 10, filteredByCategory);
    },

    loadMore(){
      // Set focus to last element before clicking to load more
      $('#venues').children().eq(-2).find('.thumb-link').focus();

      // Don`t include load more button
      const currentlyOnScreen = $('#venues').children().length - 1;
      this.disableLoadMoreButton(this.get('model').venues.length === currentlyOnScreen);

      // Load more
      this.requestRestaurants(currentlyOnScreen, 10);
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

    if(!this.get('loaderOn')){
      this.set('loaderOn', true);
    }
    const [indexStart, count, optionalRestaurantsArray] = params;

    // Build array of ids from all nearby restaurants saved in model
    let restaurantIds = [];

    let countMax = indexStart + count >= this.model.venues.length ? this.model.venues.length : indexStart + count;

    if(optionalRestaurantsArray){
      // If optional Array with ids passed slice it based on first 2 options
      restaurantIds = optionalRestaurantsArray.slice(indexStart, countMax);
    } else {
      for(var i=indexStart; i<countMax; i++){
        restaurantIds.push(this.model.venues[i].id);
      }
    }

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

    // Focus first element in menu
    firstEl.focus();
    sideNav.addEventListener('keydown', (event)=>{

      // If Esc pressed
      if(event.keyCode === 27) {
        return backgroundActiveEl.focus();
      }

      // Trap Tab key while menu open
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
  },

  /**
  * @name Disable load more button
  * @desc Based on the boolean passed it will disable or enable load more button
  * @param { boolean } condition
  */
  disableLoadMoreButton(condition){
    if(condition){
      // True
      return $('.load-more-btn').attr('disabled', 'disabled');
    }
    // False
    return $('.load-more-btn').removeAttr('disabled');
  }

});
