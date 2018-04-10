import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
  didRender() {
    Ember.$('#edit-show-text-summernote').summernote({
      callbacks: {
        onChange: (contents) => {
          this.updater({ html: Object.assign(contents) }, true);
        }
      }
    });
  }
});
