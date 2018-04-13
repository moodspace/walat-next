import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
  didRender() {
    let editorInitd = false;
    Ember.$('#edit-show-text-summernote').summernote({
      callbacks: {
        onInit: () => {
          editorInitd = true;
        },
        onChange: (contents) => {
          this.updater({ html: Object.assign(contents) }, true);
        }
      }
    });

    const initText = setInterval(() => {
      if (this.get('html') && editorInitd) {
        Ember.$('#edit-show-text-summernote').summernote('code', this.get(
          'html'));
        this.set('html', undefined);
        clearInterval(initText);
      }
    }, 100);

  }
});
