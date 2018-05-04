import Component from '@ember/component';
import Ember from 'ember';
import { v4 } from 'ember-uuid';

export default Component.extend({
  store: Ember.inject.service(),
  willRender() {
    this.set('updater', (v, isComplete) => {
      this.set('value', v);
      this.set('scriptComplete', isComplete);
    });
  },
  actions: {
    inputScript(cmd) {
      const args = cmd.trim().split(' ');

      this.set('scriptComplete', false);
      this.set('typeHasOption', false);

      if (args[0] === 'hide') {
        if (args.length > 1) {
          this.set('scriptComplete', true);
        } else {
          this.set('typeHasOption', true);
        }
        this.set('edit', 'hide');
      } else if (args[0] === 'show') {
        if (args.length > 2 && args[1] === 'text') {
          this.set('scriptComplete', true);
        } else if (args.length > 2 && args[1] === 'directions') {
          this.set('scriptComplete', true);
        } else {
          this.set('typeHasOption', true);
        }
        this.set('edit', 'show ' + args[1]);
      } else if (args[0] === 'play') {
        this.set('edit', 'play');
        this.set('typeHasOption', true);
      } else if (args[0] === 'record') {
        if (args.length > 1) {
          this.set('scriptComplete', true);
        } else {
          this.set('typeHasOption', true);
        }
        this.set('edit', 'record');
      } else if (args[0] === 'wait') {
        if (args.length === 1) {
          this.set('edit', args[0]);
          this.set('scriptComplete', true);
        }
      } else {
        this.set('edit', undefined);
        this.set('scriptComplete', false);
      }
    },
    addAction() {
      const data = {
        uuid: v4(),
        type: this.edit,
        page: this.page,
        value: this.get('value') || {}
      };
      this.get('store')
        .createRecord('action', data)
        .save();
      this.set('edit', undefined);
      this.set('script', '');
      this.set('scriptComplete', false);
    },
    stubComplete(cmd, arg) {
      if (cmd === 'hide') {
        this.set('script', 'hide');
        this.send('inputScript', 'hide');
      } else if (cmd === 'show') {
        this.set('script', 'show ' + arg);
        this.send('inputScript', 'show ' + arg);
      } else if (cmd === 'wait') {
        this.set('script', 'wait');
        this.send('inputScript', 'wait');
      } else if (cmd === 'play') {
        this.set('script', 'play');
        this.send('inputScript', 'play');
      } else if (cmd === 'record') {
        this.set('script', 'record');
        this.send('inputScript', 'record');
      } else if (cmd === 'pause') {
        this.set('script', 'pause');
        this.send('inputScript', 'pause');
      }
    }
  }
});
