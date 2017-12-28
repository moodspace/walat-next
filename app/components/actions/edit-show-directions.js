import Component from '@ember/component';

export default Component.extend({
  actions: {
    setValueText(e) {
      this.set('text', e.target.value);
      this.updater({ text: this.get('text') }, true);
    }
  }
});
