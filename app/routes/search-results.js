import Ember from 'ember';

export default Ember.Route.extend({
  requestLink: Ember.inject.service('build-requestlink'),
  model (params) {
    const link = this.get('requestLink').build(params.lat, params.lng);
    return fetch(link).then((response) => {
      return response.json();
    }).then((resp) => {
      resp.response.lat = params.lat;
      resp.response.lng = params.lng;
      return resp.response;
    });
  }
});
