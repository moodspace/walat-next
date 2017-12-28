import Component from '@ember/component';

export default Component.extend({
  actions: {
    setValueType(t) {
      this.set('type', t);
      this.updater({
        type: t
      });
    },
    setValueDuration(l) {
      this.set('length', l);
      const isComplete = (this.get('type') === 'fixed' && l.match(/^\d+$/)) ||
        (this.get('type') === 'variable' && (l === 'thisSound' || l ===
          'nextSound'))
      this.updater(
        Object.assign({
          type: this.get('type'),
          length: l
        }),
        isComplete
      );
    }
  }
});
