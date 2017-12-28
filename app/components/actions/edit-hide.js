import Component from '@ember/component';

export default Component.extend({
  actions: {
    setValueTarget(t) {
      this.set('target', t);
      const isComplete = t === 'directions' || t === 'text' || t ===
        'buttons';
      this.updater({
        target: t
      }, isComplete);
    },
  }
});
