import Component from '@ember/component';

export default Component.extend({
  didRender() {
    $('#edit-show-text-summernote').summernote({
      callbacks: {
        onChange: (contents) => {
          this.updater({ html: Object.assign(contents) }, true);
        }
      }
    });
  }
});
