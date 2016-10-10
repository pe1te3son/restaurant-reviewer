import Ember from 'ember';

export default Ember.Route.extend({
  requestLink: Ember.inject.service('build-requestlink'),

  model(params){
    const link = this.get('requestLink').idLink(params.id);
    return fetch(link).then((response)=>{
      return response.json();
    }).then((responseJson)=>{
      return responseJson.response.venue;
    });
  }

});
