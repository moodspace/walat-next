import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
  store: Ember.inject.service(),
  actions: {
    handleDragOver(e) {
      e.stopPropagation();
      e.preventDefault();
      this.set('draggedOver', true);
    },
    handleDragLeave(e) {
      e.stopPropagation();
      e.preventDefault();
      this.set('draggedOver', false);
    },
    setValueUpload(e) {
      e.stopPropagation();
      e.preventDefault();
      this.set('draggedOver', false);

      const f = e.dataTransfer.files[0];
      const fd = new FormData();
      fd.append('data', f);
      const baseUrl = this.get('store').adapterFor('application').get(
        'host');
      Ember.$.ajax({
        type: 'POST',
        url: baseUrl + '/uploader',
        data: fd,
        processData: false,
        contentType: false
      }).done((d) => {
        this.set('videoLoaded', false);
        setTimeout(() => {
          const attribute = JSON.parse(d.attribute);
          this.set('video',
            `${baseUrl}/uploads/${d.path}?Content-Type=${attribute.mimetype}`
          );
          this.set('videoLoaded', true);
          this.updater({
            name: d.name,
            path: d.path,
            type: d.type,
            video: this.get('video'),
            attribute
          }, true);
        }, 2000);
      });
    }
  }
});
