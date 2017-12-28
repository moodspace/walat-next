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
        this.set('videoLoaded', false);
        setTimeout(()=>{
          this.set('video', reader.result);
          this.set('videoLoaded', true);
          this.updater({ video: this.get('video') }, true);
        }, 2000);
      };
      reader.readAsDataURL(f);
    }
  }
});
