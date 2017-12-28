import Component from '@ember/component';

export default Component.extend({
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
      const reader = new FileReader();
      reader.onload = () => {
        this.set('image', reader.result);
        this.set('imageLoaded', true);
        this.updater({ image: this.get('image') }, true);
      };
      reader.readAsDataURL(f);
    }
  }
});
