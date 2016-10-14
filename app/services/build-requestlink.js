import Ember from 'ember';

export default Ember.Service.extend({
  //https://api.foursquare.com/v2/venues/search?categoryId=4d4b7105d754a06374d81259&ll=51.5074,0.1278&radius=10000&
  clientId: 'client_id=QII04JY4W2DNZNZPK4NXK4R1N3HUE4SD2OWT1FAPZIOAZJMY',
  clientSecret: 'client_secret=CBVRYTV2JXJXQJWFD51RY0UJ51SAMAFEPZLJZWGMRD3LQKF4',

  // Default ( by location only )
  build(lat, lng){
    return `https://api.foursquare.com/v2/venues/search?categoryId=4d4b7105d754a06374d81259&ll=${lat},${lng}&radius=10000&${this.get('clientId')}&${this.get('clientSecret')}&v=20160929`;
  },

  idLink(restaurantId){
    return `https://api.foursquare.com/v2/venues/${restaurantId}?${this.get('clientId')}&${this.get('clientSecret')}&v=20160929`;
  },

  category(...params){
    const [lat, lng, categoryId] = params;

    if(lat && lng && categoryId){
      return  `https://api.foursquare.com/v2/venues/search?categoryId=${categoryId}&ll=${lat},${lng}&radius=10000&${this.get('clientId')}&${this.get('clientSecret')}&v=20160929`;
    }

  }
});
