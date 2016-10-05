import Ember from 'ember';
//import $ from 'jquery';

export default Ember.Route.extend({
  clientId: 'client_id=QII04JY4W2DNZNZPK4NXK4R1N3HUE4SD2OWT1FAPZIOAZJMY',
  clientSecret: 'client_secret=CBVRYTV2JXJXQJWFD51RY0UJ51SAMAFEPZLJZWGMRD3LQKF4',
  model(){
    //https://api.foursquare.com/v2/venues/search?categoryId=4d4b7105d754a06374d81259&ll=51.5074,0.1278&radius=10000&
    const link = `https://api.foursquare.com/v2/venues/search?categoryId=4d4b7105d754a06374d81259&ll=51.5074,0.1278&radius=10000&${this.get('clientId')}&${this.get('clientSecret')}&v=20160929`;

    return fetch(link).then((response)=>{
      return response.json();
    })
    .then((respJson)=>{
      console.log(respJson);
      return respJson;
    });

    // return new Promise((resolve)=>{
    //   return $.get(link)
    //     .then((resp)=>{
    //       console.log(resp);
    //       return resolve(resp);
    //     }).catch(()=>{ return '';});
    // });
  }

});
