import Component from '@ember/component';

const ratios = [
  '',
  '0.3',
  '0.4',
  '0.5',
  '0.6',
  '0.7',
  '0.8',
  '0.9',
  '1.1',
  '1.2',
  '1.3',
  '1.4',
  '1.5',
  '1.6',
  '1.7',
  '1.8',
  '1.9',
  '2',
  '3',
  '4',
  '5',
  '6'
]

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
        (this.get('type') === 'variable' && this.get('length') && this.get(
          'ratio') && (l === 'thisQuestion' || l ===
          'nextQuestion') && ratios.includes(this.get('ratio')));
      this.updater(
        Object.assign({
          type: this.get('type'),
          length: l
        }),
        isComplete
      );
    },
    setValueRatio(r) {
      this.set('ratio', r);
      const isComplete = (this.get('type') === 'fixed' && this.get('length')
          .match(/^\d+$/)) ||
        (this.get('type') === 'variable' && this.get('length') && this.get(
          'ratio') && (this.get('length') === 'thisQuestion' || this.get(
            'length') ===
          'nextQuestion') && ratios.includes(r));
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
