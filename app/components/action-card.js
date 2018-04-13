import Component from '@ember/component';
import Ember from 'ember';
import { v4 } from 'ember-uuid';

export default Component.extend({
  store: Ember.inject.service(),
  willRender() {
    this.set('updater', v => {
      this.set('value', v);
    });
  },
  addActionSimple(actionType) {
    const data = {
      uuid: v4(),
      type: actionType,
      page: this.page,
      value: {}
    };
    this.get('store')
      .createRecord('action', data)
      .save();
  },
  actions: {
    setType(t) {
      if (t === 'pause' || t === 'wait') {
        this.addActionSimple(t);
      } else {
        this.set('newType', t);
      }
    },
    addAction() {
      const data = {
        uuid: v4(),
        type: this.newType,
        page: this.page,
        value: this.get('value') || {}
      };
      this.get('store')
        .createRecord('action', data)
        .save();
      this.set('newType', undefined);
    },
    removeAction(id) {
      this.get('store')
        .findRecord('action', id, { reload: true })
        .then(a => {
          a.destroyRecord();
        });
    },
    showButtons() {
      if (this.get('showButtons') && !this.get('showEdit')) {
        this.set('showButtons', false);
      } else {
        this.set('showButtons', true);
      }
    },
    showEdit(id) {
      if (id === 'cancel') {
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
