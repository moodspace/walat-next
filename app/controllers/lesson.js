import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import Ember from 'ember';

export default Controller.extend({
  selected: service('selected-records'),
  actions: {
    sortStartAction: function() {
      this.set('oldOrder', this.get('model').exercises.map(e => e.id));
    },
    sortEndAction: function() {
      this.set('newOrder', this.get('model').exercises.map(e => e.id));
      const baseUrl = this.get('store')
        .adapterFor('application')
        .get('host');
      Ember.$.ajax({
        type: 'POST',
        url: baseUrl + '/v2/exercises/reorder',
        contentType: 'application/vnd.api+json',
        dataType: 'json',
        data: JSON.stringify({
          order: this.get('newOrder'),
        }),
      }).done(d => {
        // reorder success
      });
    },
    toggleSelect(id) {
      let selectedRecords = this.get('selected')
        .get('exercises')
        .slice(0);
      if (selectedRecords.includes(id)) {
        selectedRecords = selectedRecords.filter(e => {
          return e !== id;
        });
        this.get('selected').set('exercises', selectedRecords);
      } else {
        selectedRecords.push(id);
        this.get('selected').set('exercises', selectedRecords);
      }
    },
  },
});
