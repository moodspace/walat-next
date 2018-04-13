import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    sortStartAction: function() {
      this.set('oldOrder', this.get('model').actions.map((e) => e.id));
    },
    sortEndAction: function() {
      this.set('newOrder', this.get('model').actions.map((e) => e.id));
      console.log(this.get('oldOrder'), this.get('newOrder'));
    },
  }
});
