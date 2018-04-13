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
        (this.get('type') === 'variable' && this.get('length') && this.get('ratio') && (l === 'thisSound' || l ===
          'nextSound') && this.get('ratio').match(/^\d+(\.\d+)?$/));
      this.updater(
        Object.assign({
          type: this.get('type'),
          length: l
        }),
        isComplete
      );
    },
    setValueRatio(r) {
      console.log(r)
      this.set('ratio', r);
      const isComplete = (this.get('type') === 'fixed' && this.get('length').match(/^\d+$/)) ||
        (this.get('type') === 'variable' && this.get('length') && this.get('ratio') && (this.get('length') === 'thisSound' || this.get('length') ===
          'nextSound') && r.match(/^\d+(\.\d+)?$/));
      this.updater(
        Object.assign({
          type: this.get('type'),
          length: this.get('length'),
          ratio: r
        }),
        isComplete
      );
    }
  }
});
