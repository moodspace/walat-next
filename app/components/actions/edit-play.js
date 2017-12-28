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
        this.set('soundLoaded', false);
        setTimeout(()=>{
          this.set('sound', reader.result);
          this.set('soundLoaded', true);
          this.updater({ sound: this.get('sound') }, true);
        }, 2000);
      };
      reader.readAsDataURL(f);
    }
  }
});
