import Component from '@ember/component';
import Ember from 'ember';
import { v4 } from 'ember-uuid';

export default Component.extend({
  store: Ember.inject.service(),
  actions: {
    inputName(name) {
      this.set('name', name);
      if (name.length > 0) {
        this.set('scriptComplete', true);
      }
    },
    addCollection() {
      if (this.get('type') === 'klass') {
        this.get('store').createRecord(
          this.get('type'), {
            uuid: v4(),
            name: this.get('name')
          }).save();
        this.set('scriptComplete', false);
        return;
      }
      this.get('store').findRecord(this.get('parent'), this.get('parent_id'))
        .then((parent) => {
          const newCollection = this.get('store').createRecord(
            this.get('type'), {
              uuid: v4(),
              name: this.get('name')
            });
          newCollection.set(this.get('parent'), parent);
          newCollection.save();
          this.set('scriptComplete', false);
        });
    },
    prefixComplete(prefix) {
      this.set('name', prefix + ' ');
      Ember.$("#edit input").focus();
    }
  }
});
