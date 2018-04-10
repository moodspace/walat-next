import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home', { path: '/' });
  this.route('klass', { path: '/editor/:klass_id' });
  this.route('lesson', { path: '/editor/:klass_id/:lesson_id' });
  this.route('exercise', {
    path: '/editor/:klass_id/:lesson_id/:exercise_id'
  });
  this.route('page', {
    path: '/editor/:klass_id/:lesson_id/:exercise_id/:page_id'
  });
  this.route('assets');
  this.route('settings');
});

export default Router;
