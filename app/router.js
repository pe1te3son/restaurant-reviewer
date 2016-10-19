import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('home', {path: '/'});
  this.route('restaurant', {path: '/:id'});
  this.route('search-results', {path: '/search'});
});

export default Router;
