import Component from '@ember/component';

const timeouts = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10'
];

export default Component.extend({
  actions: {
    setValueTimeout(t) {
      this.set('timeout', t);
      this.updater({ timeout: this.get('timeout') }, timeouts.includes(t));
    }
  }
});
