import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
  store: Ember.inject.service(),
  actions: {
    delete(id) {
      this.get('store')
        .findRecord('lesson', id)
        .then(post => {
          post.destroyRecord(); // => DELETE to /posts/2
        });
    }
  }
});
