import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
  store: Ember.inject.service(),
  actions: {
    showButtons() {
      if (this.get('showButtons') && !this.get('showEdit')) {
        this.set('showButtons', false);
      } else {
        this.set('showButtons', true);
      }
    },
    remove(type, id) {
      this.get('store')
        .findRecord(type, id, { reload: true })
        .then(a => {
          a.destroyRecord();
        });
    },
    showEdit(type, id) {
      if (type === 'cancel') {
        this.set('showEdit', false);
        // TOTO: also need to revert form control values even if edits got cancelled
        return;
      }
      if (this.get('showEdit')) {
        this.get('store')
          .findRecord('action', id, { reload: true })
          .then(a => {
            a.set('value', this.get('value'));
            a.save();
          });
        this.set('showEdit', false);
      } else {
        this.set('showEdit', true);
      }
    }
  }
});
