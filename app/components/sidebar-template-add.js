import Component from '@ember/component';
import Ember from 'ember';
import { v4 } from 'ember-uuid';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: Ember.inject.service(),
  selected: service('selected-records'),
  actions: {
    setValueName(name) {
      this.set('name', name);
    },
    addTemplate() {
      let selectedRecords = this.get('selected').get(this.get('type')).slice(0);
      if (this.get('type') === 'klasses') {
        this.get('store').createRecord(
          'template', {
            uuid: v4(),
            name: this.get('name'),
            type: this.get('type'),
            collection: selectedRecords
          }).save();
        this.set('name', '');
      }
    }
  }
});
