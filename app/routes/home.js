import Ember from 'ember';
import $ from 'jquery';

export default Ember.Route.extend({
  model(){
    const clientId = 'client_id=QII04JY4W2DNZNZPK4NXK4R1N3HUE4SD2OWT1FAPZIOAZJMY';
    const clientSecret = 'client_secret=CBVRYTV2JXJXQJWFD51RY0UJ51SAMAFEPZLJZWGMRD3LQKF4';
    const link = `https://api.foursquare.com/v2/venues/search?categoryId=4bf58dd8d48988d121941735&ll=51.5074,0.1278&radius=10000&${clientId}&${clientSecret}&v=20160929`;
    return $.get(link)
      .then((resp)=>{
        console.log(resp);
        return resp;
      }).catch(()=>{ return '';});
  }
});
