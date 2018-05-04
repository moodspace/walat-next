import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import Ember from 'ember';

export default Controller.extend({
  messages: Ember.computed('model', function() {
    const warnings = [];
    let qnaCount = 0;
    let playCount = 0;
    let recordCount = 0;

    this.get('model').actions.forEach((a, i) => {
      if (a.get('type') === 'show qna') {
        if (a.get('value').linkedQna) {
          const linkedText = this.get('model').actions.objectAt(i + 1);
          if (!linkedText || (linkedText.get('type') !==
              'show text' && linkedText.get('type') !==
              'show image' && linkedText.get('type') !==
              'show video')) {
            warnings.push(
              'Only an action from text, image or video can be linked to a Q&A.'
            );
          }
        }
        qnaCount += 1;
      } else if (a.get('type') === 'play') {
        playCount += 1;
      } else if (a.get('type') === 'record') {
        recordCount += 1;
      }
    });

    if (qnaCount > 1) {
      warnings.push('Only one Q&A allowed per page.');
    }
    if (playCount > 1) {
      warnings.push('Only one sound allowed to play per page.');
    }
    if (recordCount > 1) {
      warnings.push('Only one recording allowed per page.');
    }
    return warnings;
  }),
  selected: service('selected-records'),
  actions: {
    sortStartAction() {
      this.set('oldOrder', this.get('model').actions.map((e) => e.id));
    },
    sortEndAction() {
      this.set('newOrder', this.get('model').actions.map(e => e.id));
      const baseUrl = this.get('store')
        .adapterFor('application')
        .get('host');
      Ember.$.ajax({
        type: 'POST',
        url: baseUrl + '/v2/actions/reorder',
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
      let selectedRecords = this.get('selected').get('actions').slice(0);
      if (selectedRecords.includes(id)) {
        selectedRecords = selectedRecords.filter((e) => {
          return e !== id;
        });
        this.get('selected').set('actions', selectedRecords);
      } else {
        selectedRecords.push(id);
        this.get('selected').set('actions', selectedRecords);
      }
    }
  }
});
