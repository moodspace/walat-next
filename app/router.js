import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('editor', { path: '/editor' });
  this.route('lesson', { path: '/editor/:lesson_id' });
  this.route('exercise', {
    path: '/editor/:lesson_id/:exercise_id'
  });
  this.route('page', {
    path: '/editor/:lesson_id/:exercise_id/:page_id'
  });
  this.route('lessons');
  this.route('assets');
  this.route('settings');
});

export default Router;
